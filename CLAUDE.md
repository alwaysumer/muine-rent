# Project context for Claude

Rental website for Ocean Vista apartments and Sea Links villas in Sea Links City, Mui Ne (Phan Thiet), Vietnam.
The owner speaks Russian; reply in Russian unless asked otherwise.

## Stack and principles
- Next.js 15 App Router, TypeScript strict, Tailwind v4 (tokens in `src/app/globals.css`), next-intl.
- Locales `en` (default), `ru`, `vi`, always prefixed. Localized slugs live in `src/i18n/routing.ts`
  (`/en/rentals`, `/ru/arenda`, `/vi/cho-thue`; guide: `/en/mui-ne-guide`, `/ru/gid-muine`, `/vi/cam-nang-mui-ne`).
- Goals: PageSpeed 95+, SSG everywhere, server components by default, client JS only for small islands.
- SEO/GEO: one connected JSON-LD `@graph` per page via `src/lib/schema.ts`; canonical + hreflang via `src/lib/seo.ts`;
  `public/llms.txt` must stay consistent with page content and schema.
- Never publish fabricated reviews or ratings; sample reviews in `src/content/home.ts` are placeholders.

## Photos
- The owner's photos are in the parent folder "Appartment rent site" (large; do not commit originals).
- Originals live in `Photo/<unit folder>/` next to the project (e.g. `Photo/A1-05_1Br`, `Photo/S-66_Villa`).
- Naming: `1br`/`2br` = bedrooms, `villa` = villa, unit codes `A1-05`, `B4-15`, `C2-37`, `F2-07` = block letter + floor + unit number.
  `Photo/Land Scape Ocean Vista` = shared territory shots → `public/images/sea-links-city/`.
- Aerial panoramas supplied by the owner (`Photo/Panorama-Ocean-Vista-Mui-Ne.png`, `Ocean-Vista-Mui-Ne.png`, `Review-Sea-Links-City-…jpg`)
  → `public/images/panorama-*.jpg`; used on the catalog hero and the Ocean Vista / Villas section banners. They carry third-party watermarks.
  Also from the owner: `Pool up.jpg`, `pool2.jpeg`, `tennis.jpg`, `Castle 2.jpg` → second images in the guide sections; `Pool up` is the homepage pools tile.
- Manual photo corrections (e.g. brightness of a cover) go in `scripts/photo-adjust.json`; the import applies them.
- Import: `node scripts/import-photos.mjs .` writes `public/images/<slug>/NN.jpg` and `src/data/photos.generated.json`.
- Listings reference photos as `photo("<set>", n, alt)` in `src/data/properties.ts`; the first image is the card cover.
- Views follow the owner's price list: sea — B4-15, C2-37, villa S-66, Ethereal; garden — A1-05, A1-06, F2-07; golf — villa R-66.

## Status
- Step 1 done: stack, schema generator, llms.txt, PropertyCard, Hero, full homepage, robots, sitemap.
- Step 1b done (2026-11-15): photos imported, 8 real listings in `src/data/properties.ts` with chosen covers and en/ru/vi alt text.
  Homepage golf/beach/pool tiles and stay-type tiles use real photos. Wine castle tile uses the owner's photo (`Photo/Castle.jpg` → `public/images/sea-links-castle.jpg`).
  Still an illustrated placeholder: `hero-sea-links.jpg`.
- Property detail page has a photo gallery with full-screen viewer (`src/components/property/Gallery.tsx`, client island);
  it shows the curated images first, then every other photo of the unit (`allPhotos` in `properties.ts`).
- Contacts: +84919995009 is the single number for calls, WhatsApp, Telegram and Zalo (`src/lib/site.ts`).
  Contact email: hungluong.imc@gmail.com.
- Prices, area, guests and view come from the owner's price list `Price List New Sealinks.docx` (project root):
  USD per month for four seasons (Dec–Feb, Mar–Apr, May–Sep, Oct–Nov) + per-month price on a 12-month lease
  (`seasonal([...], yearly)` in `properties.ts`). Guest pays electricity and water. There are no nightly rates.
- The price list also has units with no photos yet, so they are not on the site: A4-10, A4-14, B1-07, villas S-69 and PE-7.
- Ethereal villa has no price/area in the list (and 20 bedrooms / 40 guests there); the site keeps $1500, 3 bedrooms, 400 m² from chat — unconfirmed.
- Still NOT confirmed (marked `TODO owner`): bathrooms, map pins,
  and whether Ethereal villa is inside Sea Links City (it is published as a Sea Links villa).
- Nightly/seasonal booking rules and "private pool" villa copy in `public/llms.txt` and `src/content/home.ts` are still sample text.

## SEO / GEO setup (2026-11-15)
- `robots.ts` allows all search engines and AI crawlers; `sitemap.xml` has hreflang for every page; canonical + hreflang via `buildMetadata`.
- Google Search Console: verified 2026-11-17 via file `public/google28eeb824dd35c4ed.html` (do not delete). Yandex and Bing: not yet.
- Webmaster verification codes come from env (`.env.example`): `GOOGLE_SITE_VERIFICATION`, `YANDEX_VERIFICATION`, `BING_SITE_VERIFICATION`.
- IndexNow: key file `public/<32-hex>.txt`; after each deploy run `node scripts/indexnow.mjs https://<domain>` (Bing, Yandex).
- `public/llms.txt` is hand-written (keep in sync); `/llms-full.txt` is generated from listings + guide (`src/app/llms-full.txt/route.ts`).
- Hero search form: with dates filled it opens WhatsApp (+84919995009) with a prefilled inquiry (dates, guests, type); without dates it goes to the catalog.
- Sample reviews are NOT rendered on the homepage; show the Reviews section only with real, verifiable reviews.
- Homepage/llms copy now states only facts from the price list and photos (no private pools, gym, deposit or housekeeping claims).
- Still placeholders before launch: `SITE.sameAs` (Google Business Profile etc.), postal code.

## Hosting (2026-11-16)
- Domain: muinerent.com (bought at Namecheap, 2026-11-16); canonical address https://muinerent.com, brand name "Mui Ne Rent".
- Code: GitHub `alwaysumer/muine-rent` (branch `main`, public — required for free GitHub Pages). Owner chose GitHub Pages, not Vercel.
- Static build: `npm run build:static` (`scripts/build-static.mjs`) → `out/`: pre-resizes photos (`*.w640.jpg`, `*.w1280.jpg`, git-ignored),
  builds with `STATIC_EXPORT=1` (`output: "export"`, custom image loader `src/lib/image-loader.ts`, middleware switched off for the build),
  renames pages to the localized URLs from `src/i18n/routing.ts` (keep the `RENAME` table in the script in sync), writes the root language-picker `index.html`.
- Local check of the static build: `node scripts/serve-static.mjs` → http://localhost:3222.
- `.github/workflows/pages.yml` deploys `out/` to GitHub Pages on every push to `main`; site address comes from repo variable `SITE_URL`.
- The normal server build (`npm run build` / `npm start`) still works and is unchanged.

## Next steps
1. Get the remaining `TODO owner` facts, then update `properties.ts` and `public/llms.txt`.
2. Step 2 (partly done): catalog `/rentals` exists with an apartment/villa filter (`?type=`, client island `CatalogGrid`),
   guide page `/guide` exists (`src/content/guide.ts`). Still to do: more catalog filters (bedrooms, view, price, capacity), property detail page
   (amenities, seasonal price table, map facade, availability calendar, sticky booking widget), guide page.
3. Open questions for the owner: booking engine/channel manager, CMS, payments/currency, brand name/domain, hosting.
