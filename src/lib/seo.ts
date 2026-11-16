import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { SITE, abs } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ru: "ru_RU", vi: "vi_VN" };

/** Canonical + hreflang (incl. x-default) + OpenGraph/Twitter for any localized route. */
export function buildMetadata(opts: {
  locale: Locale; href: Href; title: string; description: string; image?: string;
}): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, abs(getPathname({ locale: l, href: opts.href }))]),
  );
  const canonical = languages[opts.locale]!;
  const image = abs(opts.image ?? "/og-default.jpg");
  return {
    metadataBase: new URL(SITE.url),
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": languages[routing.defaultLocale]! },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title: opts.title,
      description: opts.description,
      locale: OG_LOCALE[opts.locale],
      alternateLocale: routing.locales.filter((l) => l !== opts.locale).map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image] },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    // Ownership codes from Google Search Console, Yandex Webmaster and Bing Webmaster Tools (set in .env, see .env.example).
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
  };
}
