import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer, MobileContactBar } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Compare, Amenities, Location, Faq, Cta } from "@/components/home/Sections";
import { PropertyCard } from "@/components/property/PropertyCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { properties } from "@/data/properties";
import { home } from "@/content/home";
import { graph, organizationNode, websiteNode, complexNodes, vacationRentalNode, rentalPath, faqNode, webPageNode, ids } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { abs } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const META: Record<Locale, { title: string; description: string }> = {
  en: { title: "Ocean Vista & Sea Links Villas Rentals in Mui Ne | Direct from Owner", description: "Monthly rentals in Sea Links City, Mui Ne, Vietnam: sea-view Ocean Vista apartments from $500 and Sea Links villas from $900 per month. Real photos, owner-direct prices, reply on WhatsApp, Telegram and Zalo." },
  ru: { title: "Аренда Ocean Vista и вилл Sea Links в Муйне | Напрямую от владельца", description: "Аренда помесячно в Sea Links City, Муйне, Вьетнам: апартаменты Ocean Vista с видом на море от $500 и виллы Sea Links от $900 в месяц. Реальные фото, цены владельца, ответ в WhatsApp, Telegram и Zalo." },
  vi: { title: "Cho thuê căn hộ Ocean Vista & biệt thự Sea Links Mũi Né | Chính chủ", description: "Cho thuê theo tháng tại Sea Links City, Mũi Né: căn hộ Ocean Vista view biển từ $500 và biệt thự Sea Links từ $900 mỗi tháng. Ảnh thật, giá chủ nhà, phản hồi qua Zalo, WhatsApp, Telegram." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, href: "/", ...META[locale], image: "/og-default.jpg" });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = home[locale];
  const featured = properties.filter((p) => p.featured);
  const url = abs(`/${locale}`);

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          websiteNode(locale),
          complexNodes(),
          webPageNode(url, META[locale].title, locale, ids.seaLinks),
          featured.map((p) => vacationRentalNode(p, locale, abs(rentalPath(p, locale)))),
          faqNode(url, t.faq.items),
        )}
      />
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />

        <section aria-labelledby="featured" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lagoon-600">{t.featured.eyebrow}</p>
              <h2 id="featured" className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t.featured.title}</h2>
              <p className="mt-4 text-lg text-ocean-700">{t.featured.intro}</p>
            </div>
            <Link href="/rentals" className="inline-flex min-h-11 items-center self-start rounded-full px-5 text-sm font-semibold text-ocean-900 ring-1 ring-ocean-900/20 transition hover:bg-ocean-900 hover:text-sand-50 lg:self-auto">
              {t.featured.all} →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
          </div>
        </section>

        <Compare c={t.compare} />
        <Amenities a={t.amenities} />
        <Location l={t.location} />
        {/* Reviews section stays hidden until there are real, verifiable guest reviews (see CLAUDE.md). */}
        <Faq f={t.faq} />
        <Cta c={t.cta} locale={locale} />
      </main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  );
}
