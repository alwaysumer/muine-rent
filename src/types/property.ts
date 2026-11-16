import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type PropertyType = "apartment" | "villa";
export type Complex = "ocean-vista" | "sea-links-villas";
export type ViewType = "sea" | "golf" | "garden" | "pool" | "city";

export interface PropertyImage {
  src: string;            // /images/... or CMS URL
  width: number;
  height: number;
  alt: Localized;         // descriptive, keyword-natural alt text per language
}

export interface SeasonRate {
  season: "low" | "high" | "peak" | "tet";
  label: Localized;
  from: string;           // ISO date "2026-12-20" (or MM-DD for recurring)
  to: string;
  nightlyUsd: number;
  minNights: number;
}

/** Long-stay price for a group of calendar months (owner's price list), USD per month. */
export interface MonthlyRate {
  months: number[];       // calendar months, 1–12, in season order (e.g. [12, 1, 2])
  label: Localized;
  usd: number;
}

export interface Property {
  id: string;             // stable ID, also used as schema `identifier`
  slug: string;           // same slug across locales keeps URLs predictable
  type: PropertyType;
  complex: Complex;
  title: Localized;
  summary: Localized;     // 1–2 sentence factual summary (great for AI citation)
  bedrooms: number;
  bathrooms: number;
  beds: { type: "KingBed" | "QueenBed" | "DoubleBed" | "SingleBed" | "SofaBed"; count: number }[];
  maxGuests: number;
  areaSqm: number;
  floor?: number;
  view: ViewType[];
  amenities: string[];    // keys, e.g. "privatePool" → translated in UI + mapped to schema
  images: PropertyImage[];
  geo: { lat: number; lng: number };
  rates: SeasonRate[];      // nightly seasonal rates; empty when the unit is priced per month only
  monthlyUsd?: number;      // flat price per month, when there is no seasonal list
  monthlyRates?: MonthlyRate[]; // seasonal prices per month (owner's price list)
  yearlyUsd?: number;       // price per month on a 12-month lease
  checkInTime: string;    // "14:00"
  checkOutTime: string;   // "12:00"
  petsAllowed: boolean;
  smokingAllowed: boolean;
  rating?: { value: number; count: number; source: string }; // ONLY real, verifiable reviews
  featured?: boolean;
  updatedAt: string;      // ISO — feeds sitemap lastmod + schema dateModified
}
