import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { HeroSearch } from "./HeroSearch";
import heroImg from "../../../public/images/panorama-sea-links-city.jpg";

/**
 * Homepage hero — Server Component.
 * LCP: the hero <Image> is `priority` (preload + fetchpriority=high), statically imported so
 * width/height/blurDataURL are known at build time → zero CLS, instant blurred placeholder.
 * The only client JS is the tiny date-validation island inside <HeroSearch>.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const action = getPathname({ locale, href: "/rentals" });

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ocean-950">
      <Image
        src={heroImg}
        alt={t("imageAlt")}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        quality={70}
        className="-z-10 object-cover object-center"
      />
      {/* Legibility gradient: dark at bottom on mobile (where the form sits), left-side on desktop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/90 via-ocean-950/65 to-ocean-950/45 lg:bg-gradient-to-r lg:from-ocean-950/90 lg:via-ocean-950/55 lg:to-ocean-950/10" />

      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 lg:min-h-[78vh] lg:justify-center lg:px-8 lg:pb-16">
        <div className="max-w-2xl text-sand-50">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-brass-400 sm:text-sm">{t("eyebrow")}</p>
          <h1 id="hero-title" className="font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          {/* Phones get a short subtitle so the search form stays close to the top. */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-100/90 text-pretty sm:hidden">{t("subtitleMobile")}</p>
          <p className="mt-5 hidden max-w-xl leading-relaxed text-sand-100/90 text-pretty sm:block sm:text-lg">{t("subtitle")}</p>
        </div>

        <HeroSearch
          action={action}
          whatsapp={SITE.contact.whatsapp}
          labels={{
            checkIn: t("checkIn"),
            checkOut: t("checkOut"),
            guests: t("guests"),
            type: t("type"),
            any: t("any"),
            apartment: t("apartment"),
            villa: t("villa"),
            search: t("search"),
            waHello: t("waHello"),
          }}
        />

        <div className="mt-6 flex flex-col gap-4 text-sm text-sand-100/90 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(["trust1", "trust2", "trust3"] as const).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brass-400" aria-hidden>
                  <path d="m5 12 5 5L20 7" />
                </svg>
                {t(k)}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="mr-1">{t("orAsk")}</span>
            <ChannelLink href={SITE.contact.whatsapp} label="WhatsApp" className="bg-[#25D366] text-ocean-950" />
            <ChannelLink href={SITE.contact.telegram} label="Telegram" className="bg-[#2AABEE] text-white" />
            <ChannelLink href={SITE.contact.zalo} label="Zalo" className="bg-[#0068FF] text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelLink({ href, label, className }: { href: string; label: string; className: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow"
      data-track="contact"
      data-channel={label.toLowerCase()}
      className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition hover:brightness-110 ${className}`}
    >
      {label}
    </a>
  );
}
