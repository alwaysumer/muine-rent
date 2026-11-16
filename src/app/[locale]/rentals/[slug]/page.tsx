import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer, MobileContactBar } from "@/components/layout/Footer";
import { Gallery } from "@/components/property/Gallery";
import { allPhotos, getProperty, priceFrom, properties } from "@/data/properties";
import { propertyPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => properties.map((p) => ({ locale, slug: p.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  const d = await getTranslations({ locale, namespace: "detail" });
  const price = priceFrom(p);
  return buildMetadata({
    locale, href: { pathname: "/rentals/[slug]", params: { slug } },
    title: `${p.title[locale]} | ${d("metaSuffix")}`,
    description: `${p.summary[locale]}${price ? ` ${d("metaPrice", { amount: price.amount })}` : ""}`,
    image: p.images[0]?.src,
  });
}

// Step 2 will add the amenities list, calendar and booking widget. Gallery and schema are live.
export default async function PropertyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProperty(slug);
  if (!p) notFound();

  const t = await getTranslations({ locale, namespace: "card" });
  const d = await getTranslations({ locale, namespace: "detail" });
  const price = priceFrom(p);
  const photos = allPhotos(p, locale, (n) => d("photoN", { title: p.title[locale], n }));

  const channels = [
    { label: "WhatsApp", href: SITE.contact.whatsapp, cls: "bg-[#25D366] text-ocean-950" },
    { label: "Telegram", href: SITE.contact.telegram, cls: "bg-[#2AABEE] text-white" },
    { label: "Zalo", href: SITE.contact.zalo, cls: "bg-[#0068FF] text-white" },
  ];
  if (locale === "vi") channels.unshift(channels.splice(2, 1)[0]!);
  if (locale === "ru") channels.unshift(channels.splice(1, 1)[0]!);

  return (
    <>
      <JsonLd data={propertyPageSchema(p, locale, { home: d("home"), rentals: d("rentals") })} />
      <Header locale={locale} />
      <div className="h-20 bg-ocean-950" aria-hidden />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <Link href="/rentals" className="inline-flex min-h-11 items-center text-sm font-medium text-lagoon-600 hover:underline">
          ← {d("back")}
        </Link>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon-600">
              {t(p.type)} · {p.view.map((v) => t(`view.${v}`)).join(" · ")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ocean-950 text-balance sm:text-5xl">{p.title[locale]}</h1>
            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base text-ocean-700">
              <div><dt className="sr-only">Bedrooms</dt><dd>{t("bedrooms", { count: p.bedrooms })}</dd></div>
              <div><dt className="sr-only">Capacity</dt><dd>{t("guests", { count: p.maxGuests })}</dd></div>
              <div><dt className="sr-only">Area</dt><dd>{t("area", { count: p.areaSqm })}</dd></div>
            </dl>
          </div>

          <div className="shrink-0 rounded-[var(--radius-card)] bg-white p-5 shadow-[0_8px_24px_-12px_rgb(8_28_39/0.18)] ring-1 ring-ocean-900/5">
            {price && (
              <p className="text-ocean-900">
                {price.from && <span className="text-sm text-ocean-700">{t("from")} </span>}
                <data value={price.amount} className="font-display text-4xl font-semibold">${price.amount}</data>
                <span className="text-sm text-ocean-700"> {t(price.unit === "night" ? "perNight" : "perMonth")}</span>
              </p>
            )}
            <p className="mt-3 text-sm text-ocean-700">{d("ask")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {channels.map((ch) => (
                <a key={ch.label} href={ch.href} target="_blank" rel="noopener nofollow" className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition hover:brightness-110 ${ch.cls}`}>{ch.label}</a>
              ))}
            </div>
          </div>
        </div>

        <section aria-labelledby="photos" className="mt-10">
          <h2 id="photos" className="sr-only">{d("photos", { count: photos.length })}</h2>
          <Gallery
            images={photos}
            labels={{ open: d("open"), close: d("close"), prev: d("prev"), next: d("next"), showAll: d("photos", { count: photos.length }) }}
          />
          <p className="mt-3 text-sm text-ocean-700">{d("photos", { count: photos.length })} · {d("hint")}</p>
        </section>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ocean-900">{p.summary[locale]}</p>

        {p.monthlyRates && (
          <section aria-labelledby="prices" className="mt-12 max-w-3xl">
            <h2 id="prices" className="font-display text-3xl font-semibold text-ocean-950">{d("pricesTitle")}</h2>
            <table className="mt-5 w-full border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-sand-200 text-sm text-ocean-700">
                  <th scope="col" className="py-3 pr-4 font-medium">{d("period")}</th>
                  <th scope="col" className="py-3 text-right font-medium">{d("pricePerMonth")}</th>
                </tr>
              </thead>
              <tbody>
                {p.monthlyRates.map((r) => (
                  <tr key={r.label.en} className="border-b border-sand-200">
                    <th scope="row" className="py-3 pr-4 font-normal text-ocean-900">{r.label[locale]}</th>
                    <td className="py-3 text-right font-semibold tabular-nums text-ocean-950">${r.usd}</td>
                  </tr>
                ))}
                {p.yearlyUsd && (
                  <tr className="border-b border-sand-200">
                    <th scope="row" className="py-3 pr-4 font-normal text-ocean-900">{d("yearly")}</th>
                    <td className="py-3 text-right font-semibold tabular-nums text-ocean-950">${p.yearlyUsd}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-ocean-700">{d("priceNote")}</p>
          </section>
        )}
      </main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  );
}
