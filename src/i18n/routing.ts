import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "vi"],
  defaultLocale: "en",
  // Every locale gets its own prefix: /en/..., /ru/..., /vi/... → clean hreflang clusters.
  localePrefix: "always",
  // Localized slugs: /en/rentals, /ru/arenda, /vi/cho-thue
  pathnames: {
    "/": "/",
    "/rentals": { en: "/rentals", ru: "/arenda", vi: "/cho-thue" },
    "/rentals/[slug]": { en: "/rentals/[slug]", ru: "/arenda/[slug]", vi: "/cho-thue/[slug]" },
    "/guide": { en: "/mui-ne-guide", ru: "/gid-muine", vi: "/cam-nang-mui-ne" },
  },
});

export type Locale = (typeof routing.locales)[number];
