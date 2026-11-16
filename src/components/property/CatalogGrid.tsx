"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";

type Type = "apartment" | "villa";
interface Props {
  /** Cards are rendered on the server and passed in; this island only decides which ones to show. */
  items: { id: string; type: Type; card: ReactNode }[];
  labels: { all: string; apartment: string; villa: string; empty: string };
  /** Panoramic photo shown above the cards of a section. */
  banners: Record<Type, { src: string; width: number; height: number; alt: string; caption: string }>;
}

/** Catalog grid filtered by ?type=apartment|villa. The page itself stays fully static (SSG). */
export function CatalogGrid({ items, labels, banners }: Props) {
  const param = useSearchParams().get("type");
  const type: Type | null = param === "apartment" || param === "villa" ? param : null;
  return <Grid items={items} labels={labels} banners={banners} type={type} />;
}

/** Same grid without reading the URL: the static fallback (all units visible to crawlers). */
export function Grid({ items, labels, banners, type }: Props & { type: Type | null }) {
  const banner = type ? banners[type] : null;
  const shown = type ? items.filter((i) => i.type === type) : items;
  const tabs: { key: Type | null; label: string }[] = [
    { key: null, label: labels.all },
    { key: "apartment", label: labels.apartment },
    { key: "villa", label: labels.villa },
  ];
  return (
    <>
      <nav aria-label="Filter" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={t.key ? { pathname: "/rentals", query: { type: t.key } } : "/rentals"}
            scroll={false}
            aria-current={t.key === type ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition ${
              t.key === type ? "bg-ocean-900 text-sand-50" : "text-ocean-900 ring-1 ring-ocean-900/20 hover:bg-sand-100"
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs ${t.key === type ? "text-sand-200" : "text-ocean-700"}`}>
              {t.key ? items.filter((i) => i.type === t.key).length : items.length}
            </span>
          </Link>
        ))}
      </nav>
      {banner && (
        <figure key={banner.src} className="relative mt-8 overflow-hidden rounded-[var(--radius-card)] bg-sand-200">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-950/80 to-transparent px-5 pb-4 pt-12 font-display text-xl font-semibold text-sand-50 sm:text-2xl">
            {banner.caption}
          </figcaption>
        </figure>
      )}
      {shown.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((i) => <li key={i.id} className="flex [&>article]:w-full">{i.card}</li>)}
        </ul>
      ) : (
        <p className="mt-8 text-ocean-700">{labels.empty}</p>
      )}
    </>
  );
}
