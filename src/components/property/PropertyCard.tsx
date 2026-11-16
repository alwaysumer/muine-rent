import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Property } from "@/types/property";
import { priceFrom } from "@/data/properties";

interface Props {
  property: Property;
  locale: Locale;
  /** Only the first 1–2 above-the-fold cards: preloads the image to protect LCP. */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

/**
 * Server component — zero client JS.
 * - Semantic <article> + real heading + <dl> facts: crawlers and LLMs read structured facts, not divs.
 * - Stretched-link pattern: whole card is clickable, but there's ONE link (no duplicate anchors for crawlers / screen readers).
 * - Fixed aspect-ratio box → CLS 0.
 */
export async function PropertyCard({ property: p, locale, priority = false, headingLevel: H = "h3" }: Props) {
  const t = await getTranslations({ locale, namespace: "card" });
  const cover = p.images[0];
  const price = priceFrom(p);
  const hasPrivatePool = p.amenities.includes("privatePool");

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_1px_2px_rgb(8_28_39/0.06),0_8px_24px_-12px_rgb(8_28_39/0.18)] ring-1 ring-ocean-900/5 transition-shadow duration-300 hover:shadow-[0_2px_4px_rgb(8_28_39/0.06),0_20px_40px_-16px_rgb(8_28_39/0.28)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt[locale]}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5" aria-label="Highlights">
          <li className="rounded-full bg-ocean-900/85 px-2.5 py-1 text-xs font-medium tracking-wide text-sand-50 backdrop-blur">
            {t(p.type)}
          </li>
          {hasPrivatePool && (
            <li className="rounded-full bg-brass-500/95 px-2.5 py-1 text-xs font-medium text-white">{t("privatePool")}</li>
          )}
        </ul>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-lagoon-600">
          {p.complex === "ocean-vista" ? "Ocean Vista" : "Sea Links Villas"} · {p.view.map((v) => t(`view.${v}`)).join(" · ")}
        </p>

        <H className="font-display text-2xl font-semibold leading-tight text-ocean-950">
          <Link
            href={{ pathname: "/rentals/[slug]", params: { slug: p.slug } }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline"
          >
            {p.title[locale]}
          </Link>
        </H>

        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ocean-700">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Bedrooms</dt>
            <BedIcon /> <dd>{t("bedrooms", { count: p.bedrooms })}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Capacity</dt>
            <GuestsIcon /> <dd>{t("guests", { count: p.maxGuests })}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Area</dt>
            <AreaIcon /> <dd>{t("area", { count: p.areaSqm })}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between border-t border-sand-200 pt-4">
          <p className="text-ocean-900">
            {price && (
              <>
                {price.from && <span className="text-sm text-ocean-700">{t("from")} </span>}
                <data value={price.amount} className="font-display text-3xl font-semibold">
                  ${price.amount}
                </data>
                <span className="text-sm text-ocean-700"> {t(price.unit === "night" ? "perNight" : "perMonth")}</span>
              </>
            )}
          </p>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 text-sm font-medium text-lagoon-600 transition-transform group-hover:translate-x-0.5"
          >
            {t("details")} →
          </span>
        </div>
      </div>
    </article>
  );
}

// Inline SVG icons: no icon-font request, no layout shift.
const iconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, "aria-hidden": true } as const;
const BedIcon = () => (
  <svg {...iconProps}><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 14h18M7 10V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" /></svg>
);
const GuestsIcon = () => (
  <svg {...iconProps}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></svg>
);
const AreaIcon = () => (
  <svg {...iconProps}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
