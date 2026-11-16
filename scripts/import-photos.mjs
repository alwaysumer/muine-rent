#!/usr/bin/env node
/**
 * Импорт фотографий из папки «Appartment rent site».
 *
 *   node scripts/import-photos.mjs .          ← проект лежит прямо в папке с фото
 *   node scripts/import-photos.mjs "../"      ← проект во вложенной папке
 *   node scripts/import-photos.mjs "/path/to/Appartment rent site"
 *
 * Распознаёт подпапки (или имена файлов) по названию:
 *   1br / 1 br / 1-bedroom  → апартаменты с 1 спальней
 *   2br / 2 br              → апартаменты с 2 спальнями
 *   3br …                   → 3 спальни
 *   villa / вилла           → вилла (можно несколько: "villa 1", "villa B27"…)
 *   A1, b4, C2, F2          → блок + этаж квартиры (A1 = блок A, 1 этаж), в папке или имени файла
 *   A1-05, F2-07            → то же + номер квартиры (разные квартиры одного этажа не сливаются)
 *   Land Scape / Territory  → общие фото территории (бассейны, пляж, гольф) → public/images/sea-links-city
 *
 * Примеры структуры, которые понимает скрипт:
 *   2br/A1/IMG_001.jpg   ·   1br/b4.jpg   ·   A1 2br/…   ·   Villa/…   ·   2br/C2 (3).jpg
 *
 * Для каждого объекта:
 *   - исправляет ориентацию (EXIF) и удаляет метаданные (GPS с телефона и т.п.)
 *   - уменьшает до 2400px по длинной стороне, сохраняет JPEG mozjpeg q82
 *     (AVIF/WebP потом на лету делает next/image)
 *   - кладёт в public/images/<slug>/01.jpg, 02.jpg …
 *   - пишет src/data/photos.generated.json (размеры, пути) для каталога
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SRC = process.argv[2];
if (!SRC) { console.error('Usage: node scripts/import-photos.mjs "<folder>"'); process.exit(1); }

// fileURLToPath decodes %20 etc. — the project folder name contains spaces.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_IMG = path.join(ROOT, "public/images");
const OUT_JSON = path.join(ROOT, "src/data/photos.generated.json");
const EXT = /\.(jpe?g|png|webp|heic|heif|avif|tiff?)$/i;
/** Optional manual corrections, keyed by the original's path relative to the source folder: { "Photo/…/IMG.JPG": { "brightness": 1.15 } } */
const ADJUST = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/photo-adjust.json"), "utf8").catch(() => "{}"));

/** "2 BR sea view" → { type: "apartment", bedrooms: 2 }, "Villa B27" → { type: "villa" } */
const VILLA = /villa|вилл|biệt thự|biet thu/i;
const BEDS = /(\d)\s*-?\s*(br|bed|bd|спал)/i;
const STUDIO = /studio|студи/i;
/** Unit code: block letter + floor, e.g. "A1" = block A, 1st floor; "b4" = block B, 4th floor. */
const UNIT = /(?:^|[^a-z0-9])([a-z])\s*-?\s*(\d{1,2})(?:-(\d{1,3}))?(?!\d|\s*-?\s*(?:br|bed|bd))/i;
/** Shared territory shots (pools, beach, golf…): "Land Scape Ocean Vista", "Territory", "Территория". */
const COMPLEX = /land\s*scape|territory|территор/i;

/** Merge hints from every folder name on the path (and the file name as a fallback). */
function classifyPath(parts) {
  const dirs = parts.slice(0, -1), file = parts.at(-1).replace(EXT, "");
  const info = { type: null, bedrooms: null, block: null, floor: null, unit: null, villaName: null };
  if (dirs.some((d) => COMPLEX.test(d))) return { ...info, type: "complex" };
  for (const d of dirs) {
    if (VILLA.test(d)) { info.type = "villa"; info.villaName = d; }
    const b = d.match(BEDS); if (b && info.bedrooms === null) info.bedrooms = Number(b[1]);
    if (STUDIO.test(d) && info.bedrooms === null) info.bedrooms = 0;
  }
  if (info.type !== "villa") {
    for (const d of [...dirs].reverse()) { const u = d.match(UNIT); if (u) { info.block = u[1].toUpperCase(); info.floor = Number(u[2]); info.unit = u[3] ?? null; break; } }
    if (!info.block) { const u = file.match(UNIT); if (u && !/^img|^dsc|^photo/i.test(file)) { info.block = u[1].toUpperCase(); info.floor = Number(u[2]); } }
    if (info.bedrooms === null) { const b = file.match(BEDS); if (b) info.bedrooms = Number(b[1]); }
    if (info.bedrooms !== null || info.block) info.type = "apartment";
  } else if (info.bedrooms === null) {
    const b = file.match(BEDS); if (b) info.bedrooms = Number(b[1]);
  }
  return info.type ? info : null;
}

const ordinalEn = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
const unitLabel = (i) => i.block && {
  en: `Block ${i.block}, ${ordinalEn(i.floor)} floor`,
  ru: `Блок ${i.block}, ${i.floor} этаж`,
  vi: `Block ${i.block}, tầng ${i.floor}`,
};
const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Project folders are never photo folders (the project may live in the same folder as the photos).
const SKIP_DIRS = new Set(["node_modules", ".next", "public", "src", "scripts", "docs", "out", ".git", "seaside-mui-ne"]);

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name) && !e.name.startsWith(".")) out.push(...(await walk(p))); }
    else if (EXT.test(e.name) && !e.name.startsWith(".")) out.push(p);
  }
  return out;
}

const files = (await walk(SRC)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const groups = new Map(); // key → { info, files[] }
const skipped = [];

for (const f of files) {
  const parts = path.relative(SRC, f).split(path.sep);
  const info = classifyPath(parts);
  if (!info) { skipped.push(path.relative(SRC, f)); continue; }
  const key = info.type === "complex" ? "complex"
    : info.type === "villa" ? `villa:${info.villaName}`
    : `apt:${info.bedrooms ?? "?"}br:${info.block ?? "?"}${info.floor ?? ""}${info.unit ? `-${info.unit}` : ""}`;
  if (!groups.has(key)) groups.set(key, { info, files: [] });
  groups.get(key).files.push(f);
}

const result = [];
for (const [key, g] of groups) {
  const i = g.info;
  const slug = (i.type === "complex" ? "sea-links-city"
    : i.type === "villa"
    ? `sea-links-villa-${slugify(i.villaName.replace(VILLA, "").replace(BEDS, "")) || "1"}${i.bedrooms ? `-${i.bedrooms}br` : ""}`
    : `ocean-vista-${i.bedrooms !== null ? (i.bedrooms === 0 ? "studio" : `${i.bedrooms}br`) : "apartment"}${i.block ? (i.unit ? `-${i.block.toLowerCase()}${i.floor}-${i.unit}` : `-block-${i.block.toLowerCase()}-floor-${i.floor}`) : ""}`
  ).replace(/-+/g, "-").replace(/-$/, "");
  const dir = path.join(OUT_IMG, slug);
  await fs.mkdir(dir, { recursive: true });
  const images = [];
  for (const [n, f] of g.files.entries()) {
    const file = `${String(n + 1).padStart(2, "0")}.jpg`;
    try {
      const adj = ADJUST[path.relative(SRC, f)];
      let img = sharp(f).rotate();
      if (adj?.brightness) img = img.modulate({ brightness: adj.brightness });
      const { width, height } = await img
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(dir, file));
      images.push({ src: `/images/${slug}/${file}`, width, height, original: path.relative(SRC, f) });
    } catch (e) {
      skipped.push(`${path.relative(SRC, f)} (${e.message})`);
    }
  }
  result.push({ slug, type: i.type, bedrooms: i.bedrooms, block: i.block, floor: i.floor, unit: i.unit, unitLabel: unitLabel(i) || null, images });
  console.log(`✓ ${key.padEnd(18)} → ${slug} (${images.length} photos)`);
}

await fs.writeFile(OUT_JSON, JSON.stringify(result, null, 2));
if (skipped.length) console.warn(`\nSkipped ${skipped.length} file(s) not matched to a property:\n  ` + skipped.join("\n  "));
console.log(`\nWrote ${path.relative(ROOT, OUT_JSON)}`);
