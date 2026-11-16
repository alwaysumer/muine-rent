#!/usr/bin/env node
/**
 * Статическая сборка сайта для GitHub Pages (или любого хостинга без сервера) → папка out/.
 *
 *   NEXT_PUBLIC_SITE_URL=https://домен node scripts/build-static.mjs
 *
 * Что делает:
 *  1. Готовит уменьшенные копии фото (640 и 1280 px): на статическом хостинге нет оптимизатора картинок.
 *  2. Собирает сайт в режиме `output: "export"` (middleware на время сборки отключается: в статике он не работает).
 *  3. Переименовывает страницы под локализованные адреса (/ru/arenda, /vi/cho-thue, …) — их раньше подставлял middleware.
 *  4. Кладёт в корень страницу выбора языка (/ → /en, /ru или /vi) и файл .nojekyll.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const exists = (p) => fs.access(p).then(() => true, () => false);

// ── 1. Smaller copies of every photo ────────────────────────────────────────────────────────────
async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.jpg$/.test(e.name) && !/\.w\d+\.jpg$/.test(e.name)) out.push(p);
  }
  return out;
}
const photos = await walk(path.join(ROOT, "public/images"));
let made = 0;
for (const f of photos) {
  for (const w of [640, 1280]) {
    const target = f.replace(/\.jpg$/, `.w${w}.jpg`);
    if (await exists(target)) continue;
    await sharp(f).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(target);
    made++;
  }
}
console.log(`Photos: ${photos.length}, new resized copies: ${made}`);

// ── 2. Static export (middleware is not supported there) ───────────────────────────────────────
const mw = path.join(ROOT, "src/middleware.ts");
const mwOff = path.join(ROOT, "src/middleware.ts.off");
if (await exists(mw)) await fs.rename(mw, mwOff);
let status = 1;
try {
  status = spawnSync("npx", ["next", "build"], { cwd: ROOT, stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } }).status ?? 1;
} finally {
  if (await exists(mwOff)) await fs.rename(mwOff, mw);
}
if (status !== 0) process.exit(status);

// ── 3. Localized URLs (same table as src/i18n/routing.ts) ──────────────────────────────────────
const RENAME = {
  en: { guide: "mui-ne-guide" },
  ru: { rentals: "arenda", guide: "gid-muine" },
  vi: { rentals: "cho-thue", guide: "cam-nang-mui-ne" },
};
for (const [locale, map] of Object.entries(RENAME)) {
  for (const [from, to] of Object.entries(map)) {
    for (const suffix of ["", ".html", ".txt"]) {
      const a = path.join(OUT, locale, from + suffix);
      if (await exists(a)) await fs.rename(a, path.join(OUT, locale, to + suffix));
    }
  }
}

// ── 4. Root page: pick the visitor's language ──────────────────────────────────────────────────
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
await fs.writeFile(path.join(OUT, "index.html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Ocean Vista apartments &amp; Sea Links villas for rent in Mui Ne</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="${site}/en">
<link rel="alternate" hreflang="en" href="${site}/en">
<link rel="alternate" hreflang="ru" href="${site}/ru">
<link rel="alternate" hreflang="vi" href="${site}/vi">
<link rel="alternate" hreflang="x-default" href="${site}/en">
<script>
(function () {
  var langs = (navigator.languages || [navigator.language || "en"]).join(",").toLowerCase();
  var l = /(^|,)ru/.test(langs) ? "ru" : /(^|,)vi/.test(langs) ? "vi" : "en";
  location.replace("/" + l);
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=/en"></noscript>
</head>
<body>
<p><a href="/en">English</a> · <a href="/ru">Русский</a> · <a href="/vi">Tiếng Việt</a></p>
</body>
</html>
`);
await fs.writeFile(path.join(OUT, ".nojekyll"), "");
console.log("Static site is ready in out/");
