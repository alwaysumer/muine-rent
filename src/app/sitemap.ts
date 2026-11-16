import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { properties } from "@/data/properties";
import { abs } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

// Each URL lists all language alternates → hreflang in the sitemap (preferred by Google & Yandex at scale).
const entry = (href: Href, lastModified: string | Date, priority: number): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: abs(getPathname({ locale, href })),
    lastModified,
    priority,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, abs(getPathname({ locale: l, href }))])),
    },
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entry("/", now, 1),
    ...entry("/rentals", now, 0.9),
    ...entry("/guide", now, 0.8),
    ...properties.flatMap((p) => entry({ pathname: "/rentals/[slug]", params: { slug: p.slug } }, p.updatedAt, 0.8)),
  ];
}
