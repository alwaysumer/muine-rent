#!/usr/bin/env node
/**
 * Сообщает поисковикам (Bing, Яндекс, Seznam, Naver и др.) обо всех страницах сайта через IndexNow.
 * Запускать ПОСЛЕ публикации сайта и после каждого заметного обновления:
 *
 *   node scripts/indexnow.mjs https://www.ваш-домен.com
 *
 * Ключ лежит в public/<ключ>.txt и должен открываться по адресу https://домен/<ключ>.txt.
 * Google IndexNow не поддерживает: для него карта сайта отправляется в Search Console.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
if (!/^https:\/\//.test(site)) { console.error("Usage: node scripts/indexnow.mjs https://muinerent.com"); process.exit(1); }

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const keyFile = (await fs.readdir(pub)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error("No IndexNow key file in public/"); process.exit(1); }
const key = keyFile.replace(".txt", "");

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
if (!urlList.length) { console.error("Sitemap is empty or unreachable"); process.exit(1); }

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs submitted, HTTP ${res.status} ${res.statusText}`);
