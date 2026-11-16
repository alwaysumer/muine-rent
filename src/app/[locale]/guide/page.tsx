import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link, getPathname } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer, MobileContactBar } from "@/components/layout/Footer";
import { Location, Cta } from "@/components/home/Sections";
import { guide } from "@/content/guide";
import { home } from "@/content/home";
import { graph, organizationNode, websiteNode, complexNodes, webPageNode, breadcrumbNode, faqNode, ids } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { abs } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const g = guide[locale];
  return buildMetadata({ locale, href: "/guide", title: g.metaTitle, description: g.metaDescription, image: g.sections[1]?.image });
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const g = guide[locale];
  const h = home[locale];
  const path = getPathname({ locale, href: "/guide" });
  const url = abs(path);

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          websiteNode(locale),
          complexNodes(),
          webPageNode(url, g.metaTitle, locale, ids.seaLinks),
          faqNode(url, g.faq.items),
          breadcrumbNode(url, [
            { name: g.home, path: `/${locale}` },
            { name: h.nav.guide, path },
          ]),
        )}
      />
      <Header locale={locale} />
      <main>
        <div className="bg-ocean-950 px-4 pb-14 pt-32 text-sand-50 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-400">{g.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">{g.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-200">{g.intro}</p>
            <nav aria-label={g.contents} className="mt-8 flex flex-wrap gap-2">
              {g.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium ring-1 ring-white/25 transition hover:bg-white/10">{s.title}</a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-24 lg:px-8 lg:py-24">
          {g.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="grid scroll-mt-8 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`grid gap-3 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand-200">
                  <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                </div>
                {s.image2 && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-sand-200">
                    <Image src={s.image2} alt={s.image2Alt ?? ""} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                  </div>
                )}
              </div>
              <div>
                <h2 id={`${s.id}-h`} className="font-display text-3xl font-semibold leading-tight text-ocean-950 text-balance sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ocean-900">{s.text}</p>
                <ul className="mt-5 space-y-2 text-ocean-700">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lagoon-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <Location l={h.location} />

        <section aria-labelledby="guide-faq" className="bg-sand-100 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lagoon-600">{g.faq.eyebrow}</p>
              <h2 id="guide-faq" className="mt-3 font-display text-3xl font-semibold leading-tight text-ocean-950 text-balance sm:text-4xl lg:text-5xl">{g.faq.title}</h2>
              <Link href="/rentals" className="mt-6 inline-flex min-h-11 items-center gap-1 font-semibold text-lagoon-600 hover:underline">{g.browse} →</Link>
            </div>
            <div className="divide-y divide-sand-200 rounded-[var(--radius-card)] bg-white px-6 ring-1 ring-ocean-900/5">
              {g.faq.items.map((it, i) => (
                <details key={it.q} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-ocean-950 [&::-webkit-details-marker]:hidden">
                    <h3>{it.q}</h3>
                    <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-sand-100 text-ocean-700 transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 pr-10 leading-relaxed text-ocean-700">{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Cta c={h.cta} locale={locale} />
      </main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  );
}
