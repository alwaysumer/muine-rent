// Single source of truth for NAP (name/address/phone) — must match Google Business Profile exactly.
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muinerent.com",
  name: "Mui Ne Rent",                       // TODO: final brand name
  legalName: "Mui Ne Rent",        // TODO
  logo: "/logo.png",
  phone: "+84919995009",                         // one number for calls, WhatsApp, Telegram and Zalo
  email: "hungluong.imc@gmail.com",
  address: {
    streetAddress: "Sea Links City, Km 9 Nguyen Thong",
    addressLocality: "Phan Thiet",
    addressRegion: "Lam Dong",                   // Binh Thuan merged into Lam Dong (07/2025) — verify before launch
    postalCode: "",                              // TODO
    addressCountry: "VN",
  },
  // Approximate centre of Sea Links City — verify against Google Maps pin before launch.
  geo: { lat: 10.9447, lng: 108.2187 },
  contact: {
    whatsapp: "https://wa.me/84919995009",
    telegram: "https://t.me/+84919995009",
    zalo: "https://zalo.me/84919995009",
  },
  sameAs: [
    // Google Business Profile, Facebook, Instagram, TripAdvisor, Booking/Airbnb listing URLs — strong entity signals for AI.
  ] as string[],
  currency: "USD",
} as const;

export const abs = (path: string) => new URL(path, SITE.url).toString();
