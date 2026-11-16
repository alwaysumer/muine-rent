#!/usr/bin/env node
/**
 * Локальный просмотр статической сборки (папка out/) так же, как её отдаёт GitHub Pages:
 *   /ru/arenda → out/ru/arenda.html, неизвестный адрес → out/404.html.
 *
 *   node scripts/build-static.mjs && node scripts/serve-static.mjs   → http://localhost:3222
 */
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const PORT = Number(process.argv[2] ?? 3222);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon",
};

const read = async (file) => {
  const full = path.join(OUT, file);
  if (!full.startsWith(OUT)) return null;
  try { return (await fs.stat(full)).isFile() ? { full, body: await fs.readFile(full) } : null; } catch { return null; }
};

http.createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/\/$/, "");
  const hit = (await read(p || "index.html")) ?? (await read(`${p}.html`)) ?? (await read(`${p}/index.html`));
  const found = hit ?? (await read("404.html"));
  res.writeHead(hit ? 200 : 404, { "Content-Type": TYPES[path.extname(found?.full ?? ".html")] ?? "application/octet-stream" });
  res.end(found?.body ?? "Not found");
}).listen(PORT, () => console.log(`Static site: http://localhost:${PORT}`));
