import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer, MobileContactBar } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/property/PropertyCard";
import { CatalogGrid, Grid } from "@/components/property/CatalogGrid";
import { properties } from "@/data/properties";
import { home } from "@/content/home";
import { graph, organizationNode, websiteNode, complexNodes, vacationRentalNode, rentalPath, webPageNode, breadcrumbNode, ids } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { abs } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const T: Record<Locale, {
  metaTitle: string; metaDescription: string; eyebrow: string; title: string; intro: string;
  all: string; apartment: string; villa: string; empty: string; home: string; note: string;
  heroAlt: string; apartmentAlt: string; apartmentCaption: string; villaAlt: string; villaCaption: string;
}> = {
  en: {
    metaTitle: "All Rentals: Ocean Vista Apartments & Sea Links Villas, Mui Ne",
    metaDescription: "Every apartment and villa we rent in Sea Links City, Mui Ne: real photos, area, view and monthly prices by season, direct from the owner.",
    eyebrow: "Sea Links City · Mui Ne", title: "All apartments and villas",
    intro: "Every home below is photographed as it is today. Prices are per month and depend on the season; open a home to see all its photos and the full price table.",
    all: "All", apartment: "Ocean Vista apartments", villa: "Villas", empty: "Nothing here yet.", home: "Home",
    note: "Prices are in US dollars per month. Electricity and water are paid by the guest; all other costs are covered by the owner.",
    heroAlt: "Aerial panorama of Sea Links City: the beach, Ocean Vista apartment blocks, villas and the golf course",
    apartmentAlt: "Aerial view of the Ocean Vista apartment blocks with the pool, palm park and Mui Ne bay",
    apartmentCaption: "Ocean Vista: apartment blocks by the beach",
    villaAlt: "Aerial view of the Sea Links villas among the golf course fairways above the sea",
    villaCaption: "Sea Links villas: streets of houses around the golf course",
  },
  ru: {
    metaTitle: "Все объекты: апартаменты Ocean Vista и виллы Sea Links, Муйне",
    metaDescription: "Все апартаменты и виллы в аренду в Sea Links City, Муйне: реальные фото, площадь, вид и цены за месяц по сезонам, напрямую от владельца.",
    eyebrow: "Sea Links City · Муйне", title: "Все апартаменты и виллы",
    intro: "Каждый объект сфотографирован в актуальном виде. Цены указаны за месяц и зависят от сезона; откройте объект, чтобы увидеть все его фото и полную таблицу цен.",
    all: "Все", apartment: "Апартаменты Ocean Vista", villa: "Виллы", empty: "Здесь пока ничего нет.", home: "Главная",
    note: "Цены указаны в долларах США за месяц. Электроэнергию и воду гость оплачивает отдельно; все прочие расходы несёт собственник.",
    heroAlt: "Панорама Sea Links City с высоты: пляж, корпуса Ocean Vista, виллы и гольф-поле",
    apartmentAlt: "Корпуса Ocean Vista с высоты: бассейн, пальмовый парк и бухта Муйне",
    apartmentCaption: "Ocean Vista: корпуса апартаментов у пляжа",
    villaAlt: "Виллы Sea Links с высоты среди полей для гольфа над морем",
    villaCaption: "Виллы Sea Links: улицы домов вокруг гольф-поля",
  },
  vi: {
    metaTitle: "Tất cả chỗ ở: căn hộ Ocean Vista & biệt thự Sea Links, Mũi Né",
    metaDescription: "Toàn bộ căn hộ và biệt thự cho thuê tại Sea Links City, Mũi Né: ảnh thật, diện tích, hướng nhìn và giá thuê theo tháng từng mùa, trực tiếp từ chủ nhà.",
    eyebrow: "Sea Links City · Mũi Né", title: "Tất cả căn hộ và biệt thự",
    intro: "Mỗi căn đều được chụp ảnh thực tế. Giá tính theo tháng và thay đổi theo mùa; mở từng căn để xem toàn bộ ảnh và bảng giá đầy đủ.",
    all: "Tất cả", apartment: "Căn hộ Ocean Vista", villa: "Biệt thự", empty: "Chưa có căn nào.", home: "Trang chủ",
    note: "Giá tính bằng đô la Mỹ mỗi tháng. Khách tự trả tiền điện và nước; các chi phí khác do chủ nhà chịu.",
    heroAlt: "Toàn cảnh Sea Links City từ trên cao: bãi biển, các block Ocean Vista, biệt thự và sân golf",
    apartmentAlt: "Các block Ocean Vista nhìn từ trên cao với hồ bơi, công viên dừa và vịnh Mũi Né",
    apartmentCaption: "Ocean Vista: các block căn hộ sát biển",
    villaAlt: "Biệt thự Sea Links nhìn từ trên cao giữa sân golf bên bờ biển",
    villaCaption: "Biệt thự Sea Links: những dãy nhà quanh sân golf",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale, href: "/rentals", title: T[locale].metaTitle, description: T[locale].metaDescription,
    image: properties[0]?.images[0]?.src,
  });
}

export default async function RentalsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = T[locale];
  const path = getPathname({ locale, href: "/rentals" });
  const url = abs(path);

  const items = properties.map((p) => ({
    id: p.id,
    type: p.type,
    card: <PropertyCard property={p} locale={locale} headingLevel="h2" />,
  }));
  const labels = { all: t.all, apartment: t.apartment, villa: t.villa, empty: t.empty };
  const banners = {
    apartment: { src: "/images/panorama-ocean-vista.jpg", width: 1536, height: 1024, alt: t.apartmentAlt, caption: t.apartmentCaption },
    villa: { src: "/images/panorama-sea-links-villas.jpg", width: 600, height: 336, alt: t.villaAlt, caption: t.villaCaption },
  };

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          websiteNode(locale),
          complexNodes(),
          webPageNode(url, t.metaTitle, locale, ids.seaLinks),
          properties.map((p) => vacationRentalNode(p, locale, abs(rentalPath(p, locale)))),
          breadcrumbNode(url, [
            { name: t.home, path: `/${locale}` },
            { name: home[locale].nav.rentals, path },
          ]),
        )}
      />
      <Header locale={locale} />
      <main>
        <div className="relative isolate overflow-hidden bg-ocean-950 px-4 pb-14 pt-32 text-sand-50 sm:px-6 lg:px-8 lg:pb-24 lg:pt-48">
          <Image src="/images/panorama-sea-links-city.jpg" alt={t.heroAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/90 via-ocean-950/55 to-ocean-950/70" aria-hidden />
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-400">{t.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-200">{t.intro}</p>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* useSearchParams needs a Suspense boundary on a static page; the fallback shows every unit. */}
          <Suspense fallback={<Grid items={items} labels={labels} banners={banners} type={null} />}>
            <CatalogGrid items={items} labels={labels} banners={banners} />
          </Suspense>
          <p className="mt-10 max-w-3xl text-sm text-ocean-700">{t.note}</p>
        </section>
      </main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  );
}
