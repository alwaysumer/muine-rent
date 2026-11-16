/**
 * JSON-LD Schema generator.
 *
 * Emits ONE connected @graph per page. Nodes reference each other by stable `@id`
 * (e.g. `${SITE.url}/#organization`), so Google, Bing and LLM crawlers resolve a single
 * entity graph: Organization → Sea Links City (Place) → VacationRental → Accommodation.
 *
 * Follows Google's VacationRental guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/vacation-rental
 *  - required: containsPlace.occupancy, identifier, image (8+ recommended), latitude, longitude, name
 *  - recommended: address, aggregateRating, checkinTime/checkoutTime, description, knowsLanguage,
 *    containsPlace.{amenityFeature,bed,floorSize,numberOfBedrooms,numberOfBathroomsTotal}
 */
import type {
  Accommodation,
  AggregateRating,
  BreadcrumbList,
  FAQPage,
  LocationFeatureSpecification,
  Offer,
  Organization,
  Place,
  PostalAddress,
  Thing,
  VacationRental,
  WebPage,
  WebSite,
} from "schema-dts";
import { SITE, abs } from "@/lib/site";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Property } from "@/types/property";

// ───────────────────────────── IDs ─────────────────────────────
export const ids = {
  org: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  seaLinks: `${SITE.url}/#sea-links-city`,
  oceanVista: `${SITE.url}/#ocean-vista`,
  rental: (p: Property) => `${SITE.url}/rentals/${p.slug}#rental`,
  unit: (p: Property) => `${SITE.url}/rentals/${p.slug}#unit`,
  page: (url: string) => `${url}#webpage`,
};

const ref = (id: string) => ({ "@id": id });

const LANG: Record<Locale, string> = { en: "en-US", ru: "ru-RU", vi: "vi-VN" };

const address: PostalAddress = { "@type": "PostalAddress", ...SITE.address };

// Map internal amenity keys → Google's recognised VacationRental amenity names.
const AMENITY_MAP: Record<string, string> = {
  wifi: "wifi",
  airConditioning: "ac",
  kitchen: "kitchen",
  washer: "washerDryer",
  balcony: "balcony",
  sharedPool: "pool",
  privatePool: "pool",
  gym: "gymFitnessEquipment",
  beachAccess: "beachAccess",
  smartTv: "tv",
  bbq: "outdoorGrill",
  garden: "patio",
  parking: "freeParking",
  golfAccess: "golfCourse",
  housekeeping: "housekeeping",
};

const amenities = (p: Property): LocationFeatureSpecification[] => {
  const list: LocationFeatureSpecification[] = p.amenities.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: AMENITY_MAP[a] ?? a,
    value: true,
  }));
  if (p.amenities.includes("privatePool")) {
    list.push({ "@type": "LocationFeatureSpecification", name: "privatePool", value: true });
  }
  list.push(
    { "@type": "LocationFeatureSpecification", name: "petsAllowed", value: p.petsAllowed },
    { "@type": "LocationFeatureSpecification", name: "smokingAllowed", value: p.smokingAllowed },
  );
  return list;
};

// ─────────────────────── Site-wide nodes ───────────────────────
export function organizationNode(): Organization {
  return {
    "@type": ["Organization", "TravelAgency"] as unknown as "Organization",
    "@id": ids.org,
    name: SITE.name,
    url: SITE.url,
    logo: abs(SITE.logo),
    email: SITE.email,
    telephone: SITE.phone,
    address,
    areaServed: [ref(ids.seaLinks), { "@type": "Place", name: "Mui Ne, Phan Thiet, Vietnam" }],
    knowsLanguage: ["en", "ru", "vi"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: SITE.phone,
        email: SITE.email,
        availableLanguage: ["English", "Russian", "Vietnamese"],
        url: SITE.contact.whatsapp,
      },
    ],
    sameAs: [...SITE.sameAs],
  };
}

export function websiteNode(locale: Locale): WebSite {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: SITE.url,
    name: SITE.name,
    inLanguage: LANG[locale],
    publisher: ref(ids.org),
  };
}

/** Sea Links City + Ocean Vista as entities — anchors "what is Sea Links?" answers in AI engines. */
export function complexNodes(): Place[] {
  return [
    {
      "@type": ["Place", "TouristDestination"] as unknown as "Place",
      "@id": ids.seaLinks,
      name: "Sea Links City",
      alternateName: ["Sea Links Mui Ne", "Sea Links Beach Hotel & Golf"],
      description:
        "Integrated resort complex in Mui Ne, Phan Thiet, Vietnam, with an 18-hole championship golf course, the Sea Links wine castle, a sandy beach, swimming pools, tennis courts, apartments (Ocean Vista) and villas.",
      address,
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      hasMap: `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}`,
      amenityFeature: [
        "18-hole golf course",
        "Sea Links Castle (wine castle & museum)",
        "Beach",
        "Swimming pools",
        "Tennis courts",
        "Restaurants and cafés",
        "24/7 security",
      ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      containedInPlace: { "@type": "City", name: "Phan Thiet", containedInPlace: { "@type": "Country", name: "Vietnam" } },
    },
    {
      "@type": ["Place", "ApartmentComplex"] as unknown as "Place",
      "@id": ids.oceanVista,
      name: "Ocean Vista",
      alternateName: "Ocean Vista Sea Links",
      description: "Apartment complex of blocks A–F in a palm park next to the beach, inside Sea Links City, Mui Ne.",
      address,
      containedInPlace: ref(ids.seaLinks),
    },
  ];
}

// ─────────────────────── Property nodes ───────────────────────
function unitNode(p: Property, locale: Locale): Accommodation {
  return {
    "@type": p.type === "villa" ? "House" : "Apartment",
    "@id": ids.unit(p),
    name: p.title[locale],
    additionalType: p.type === "villa" ? "Villa" : "Apartment",
    occupancy: { "@type": "QuantitativeValue", value: p.maxGuests, maxValue: p.maxGuests },
    numberOfBedrooms: p.bedrooms,
    numberOfBathroomsTotal: p.bathrooms,
    numberOfRooms: p.bedrooms + 1,
    floorSize: { "@type": "QuantitativeValue", value: p.areaSqm, unitCode: "MTK" },
    ...(p.floor !== undefined && { floorLevel: String(p.floor) }),
    bed: p.beds.map((b) => ({ "@type": "BedDetails", numberOfBeds: b.count, typeOfBed: b.type })),
    amenityFeature: amenities(p),
    petsAllowed: p.petsAllowed,
  } as Accommodation;
}

function offersFor(p: Property, url: string): Offer[] {
  const year = new Date().getFullYear();
  const toDate = (mmdd: string) => (mmdd.length === 5 ? `${year}-${mmdd}` : mmdd);
  const monthOffer = (name: string, price: number): Offer => ({
    "@type": "Offer",
    name,
    url,
    priceCurrency: SITE.currency,
    price,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: SITE.currency,
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
    availability: "https://schema.org/InStock",
    seller: ref(ids.org),
  });
  // Seasonal price list per month (+ 12-month lease price).
  if (!p.rates.length && p.monthlyRates?.length) {
    return [
      ...p.monthlyRates.map((r) => monthOffer(`Monthly rental, ${r.label.en}`, r.usd)),
      ...(p.yearlyUsd ? [monthOffer("12-month lease, price per month", p.yearlyUsd)] : []),
    ];
  }
  // Units priced per month only (no nightly seasonal rates yet): one long-stay offer.
  if (!p.rates.length && p.monthlyUsd) {
    return [{
      "@type": "Offer",
      name: "Monthly rental",
      url,
      priceCurrency: SITE.currency,
      price: p.monthlyUsd,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.monthlyUsd,
        priceCurrency: SITE.currency,
        unitCode: "MON",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
      availability: "https://schema.org/InStock",
      seller: ref(ids.org),
    }];
  }
  return p.rates.map((r) => ({
    "@type": "Offer",
    name: r.label.en,
    url,
    priceCurrency: SITE.currency,
    price: r.nightlyUsd,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: r.nightlyUsd,
      priceCurrency: SITE.currency,
      unitCode: "DAY",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      eligibleQuantity: { "@type": "QuantitativeValue", minValue: r.minNights, unitCode: "DAY" },
    },
    validFrom: toDate(r.from),
    validThrough: toDate(r.to),
    availability: "https://schema.org/InStock",
    seller: ref(ids.org),
  }));
}

/**
 * VacationRental node.
 * ⚠️ aggregateRating: only pass REAL reviews collected on this site or imported with attribution.
 * Fabricated/self-serving ratings violate Google's policy and can trigger a manual action.
 */
export function vacationRentalNode(p: Property, locale: Locale, pageUrl: string): VacationRental {
  const prices = p.rates.map((r) => r.nightlyUsd);
  const monthPrices = p.monthlyRates?.map((r) => r.usd) ?? (p.monthlyUsd ? [p.monthlyUsd] : []);
  const range = (v: number[]) => (Math.min(...v) === Math.max(...v) ? `$${v[0]}` : `$${Math.min(...v)}–$${Math.max(...v)}`);
  const rating: AggregateRating | undefined = p.rating && {
    "@type": "AggregateRating",
    ratingValue: p.rating.value,
    reviewCount: p.rating.count,
    bestRating: 5,
    worstRating: 1,
  };

  return {
    "@type": "VacationRental",
    "@id": ids.rental(p),
    identifier: p.id,
    name: p.title[locale],
    description: p.summary[locale],
    url: pageUrl,
    image: p.images.map((i) => abs(i.src)),
    latitude: p.geo.lat,
    longitude: p.geo.lng,
    geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng },
    address,
    brand: ref(ids.org),
    containedInPlace: ref(p.complex === "ocean-vista" ? ids.oceanVista : ids.seaLinks),
    containsPlace: unitNode(p, locale),
    checkinTime: `${p.checkInTime}:00`,
    checkoutTime: `${p.checkOutTime}:00`,
    knowsLanguage: ["en", "ru", "vi"],
    priceRange: prices.length ? `${range(prices)} per night` : monthPrices.length ? `${range(monthPrices)} per month` : undefined,
    currenciesAccepted: "USD, VND, RUB",
    paymentAccepted: "Bank transfer, Credit card, Cash",
    telephone: SITE.phone,
    makesOffer: offersFor(p, pageUrl),
    ...(rating && { aggregateRating: rating }),
    dateModified: p.updatedAt,
  } as VacationRental;
}

// ─────────────────────── Page-level helpers ───────────────────────
export function webPageNode(url: string, name: string, locale: Locale, about?: string): WebPage {
  return {
    "@type": "WebPage",
    "@id": ids.page(url),
    url,
    name,
    inLanguage: LANG[locale],
    isPartOf: ref(ids.website),
    ...(about && { about: ref(about), mainEntity: ref(about) }),
    breadcrumb: ref(`${url}#breadcrumb`),
  };
}

export function breadcrumbNode(url: string, items: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/**
 * FAQPage. Google now shows FAQ rich results only for gov/health sites, but Bing, Yandex and
 * AI engines (Perplexity, ChatGPT search, AI Overviews) still parse Q&A pairs heavily — keep it.
 * Answers MUST be visible on the page, word-for-word.
 */
export function faqNode(url: string, faqs: { q: string; a: string }[]): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Wrap nodes into a single graph document. */
export function graph(...nodes: (Thing | Thing[] | undefined | false)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter(Boolean) as Thing[],
  };
}

// ─────────────────────── Ready-made page graphs ───────────────────────
/** Localized path, e.g. /ru/arenda/ocean-vista-2br-sea-view-1208 */
export const rentalPath = (p: Property, locale: Locale) =>
  getPathname({ locale, href: { pathname: "/rentals/[slug]", params: { slug: p.slug } } });

export function propertyPageSchema(p: Property, locale: Locale, labels: { home: string; rentals: string }) {
  const path = rentalPath(p, locale);
  const url = abs(path);
  return graph(
    organizationNode(),
    websiteNode(locale),
    complexNodes(),
    webPageNode(url, p.title[locale], locale, ids.rental(p)),
    vacationRentalNode(p, locale, url),
    breadcrumbNode(url, [
      { name: labels.home, path: `/${locale}` },
      { name: labels.rentals, path: getPathname({ locale, href: "/rentals" }) },
      { name: p.title[locale], path },
    ]),
  );
}
