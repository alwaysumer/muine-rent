import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import type { HomeContent } from "@/content/home";

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-brass-400" : "text-lagoon-600"}`}>{children}</p>
);
const H2 = ({ id, children, light }: { id: string; children: React.ReactNode; light?: boolean }) => (
  <h2 id={id} className={`mt-3 font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl ${light ? "text-sand-50" : "text-ocean-950"}`}>{children}</h2>
);
const Check = ({ className = "text-lagoon-600" }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mt-0.5 shrink-0 ${className}`} aria-hidden><path d="m5 12 5 5L20 7" /></svg>
);

/* ───────────── Apartment vs Villa comparison ───────────── */
export function Compare({ c }: { c: HomeContent["compare"] }) {
  const cards = [
    { ...c.apartment, image: "/images/ocean-vista-2br-b4-15/11.jpg", type: "apartment", dark: false },
    { ...c.villa, image: "/images/sea-links-villa-s-66/01.jpg", type: "villa", dark: true },
  ] as const;
  return (
    <section aria-labelledby="compare" className="bg-sand-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl"><Eyebrow>{c.eyebrow}</Eyebrow><H2 id="compare">{c.title}</H2></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((k) => (
            <article key={k.type} className={`overflow-hidden rounded-[var(--radius-card)] ${k.dark ? "bg-ocean-900 text-sand-50" : "bg-white text-ocean-900"} ring-1 ring-ocean-900/5`}>
              <div className="relative aspect-[16/9]">
                <Image src={k.image} alt="" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-3xl font-semibold">{k.name}</h3>
                <p className={`mt-1 ${k.dark ? "text-sand-200" : "text-ocean-700"}`}>{k.tagline}</p>
                <ul className="mt-6 space-y-3">
                  {k.points.map((p) => (
                    <li key={p} className="flex gap-3"><Check className={k.dark ? "text-brass-400" : "text-lagoon-600"} />{p}</li>
                  ))}
                </ul>
                <div className={`mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${k.dark ? "border-white/10" : "border-sand-200"}`}>
                  <p className="font-display text-2xl font-semibold">{k.from}</p>
                  <Link
                    href={{ pathname: "/rentals", query: { type: k.type } }}
                    className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition ${k.dark ? "bg-brass-500 text-white hover:bg-brass-400" : "bg-ocean-900 text-sand-50 hover:bg-ocean-700"}`}
                  >
                    {k.cta} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Complex amenities ───────────── */
export function Amenities({ a }: { a: HomeContent["amenities"] }) {
  return (
    <section aria-labelledby="amenities" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div><Eyebrow>{a.eyebrow}</Eyebrow><H2 id="amenities">{a.title}</H2></div>
          <p className="max-w-xl text-lg leading-relaxed text-ocean-700 lg:justify-self-end">{a.intro}</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.items.map((it, i) => (
            <li key={it.key} className={`group relative overflow-hidden rounded-[var(--radius-card)] bg-ocean-950 ${i % 2 ? "lg:translate-y-10" : ""}`}>
              <div className="relative aspect-[3/4]">
                <Image src={it.image} alt="" fill sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw" className="object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-sand-50">
                <h3 className="font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-100/85">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Location & distances (GEO fact table) ───────────── */
export function Location({ l }: { l: HomeContent["location"] }) {
  return (
    <section aria-labelledby="location" className="bg-ocean-950 py-20 text-sand-50 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Eyebrow light>{l.eyebrow}</Eyebrow>
          <H2 id="location" light>{l.title}</H2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-sand-200">{l.intro}</p>
          <table className="mt-10 w-full text-left">
            <tbody className="divide-y divide-white/10">
              {l.rows.map((r) => (
                <tr key={r.place}>
                  <th scope="row" className="py-4 pr-4 font-medium">{r.place}</th>
                  <td className="py-4 pr-4 text-right font-display text-xl text-brass-400">{r.distance}</td>
                  <td className="py-4 text-right text-sm text-sand-200">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Static map stand-in: a real map loads only on click (facade) to protect LCP/INP. */}
        <a
          href={`https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}`}
          target="_blank" rel="noopener"
          className="group relative block min-h-80 overflow-hidden rounded-[var(--radius-card)] bg-[#cfe3e0] ring-1 ring-white/10"
        >
          <svg viewBox="0 0 600 600" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="600" height="600" fill="#e9e2d0" />
            <path d="M0 360 C 120 330 220 400 330 360 S 520 300 600 330 L 600 600 L 0 600 Z" fill="#7fc0c8" />
            <path d="M0 380 C 120 350 220 420 330 380 S 520 320 600 350" stroke="#fff" strokeWidth="3" fill="none" opacity=".7" />
            <path d="M-10 250 C 150 230 300 300 610 220" stroke="#fff" strokeWidth="10" fill="none" />
            <path d="M-10 250 C 150 230 300 300 610 220" stroke="#d9c79f" strokeWidth="4" fill="none" />
            <ellipse cx="250" cy="300" rx="110" ry="45" fill="#a9cf96" opacity=".8" />
            <text x="40" y="215" fontSize="16" fill="#6b5a44" fontFamily="system-ui">Nguyen Thong</text>
            <text x="20" y="560" fontSize="15" fill="#1d4a63" fontFamily="system-ui">← Phan Thiet 9 km</text>
            <text x="440" y="560" fontSize="15" fill="#1d4a63" fontFamily="system-ui">Mui Ne 12 km →</text>
            <text x="200" y="305" fontSize="14" fill="#2f4f3a" fontFamily="system-ui">Golf</text>
          </svg>
          <span className="absolute left-[54%] top-[48%] -translate-x-1/2 -translate-y-full">
            <span className="block rounded-full bg-ocean-900 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">Sea Links City</span>
            <span className="mx-auto block h-3 w-0.5 bg-ocean-900" />
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ocean-900 shadow transition group-hover:bg-sand-100">{l.mapLabel} ↗</span>
        </a>
      </div>
    </section>
  );
}

/* ───────────── Reviews ───────────── */
export function Reviews({ r }: { r: HomeContent["reviews"] }) {
  return (
    <section aria-labelledby="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <H2 id="reviews">{r.title}</H2>
        <p className="mt-3 inline-block rounded-md bg-brass-500/15 px-2.5 py-1 text-xs font-medium text-ocean-700">{r.sampleNote}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {r.items.map((it, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-ocean-900/5">
                <div className="flex gap-0.5 text-brass-500" aria-hidden>{"★★★★★"}</div>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-ocean-950">“{it.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-sand-200 pt-4 text-sm">
                  <span className="font-semibold text-ocean-900">{it.name}</span>
                  <span className="text-ocean-700"> · {it.from}</span>
                  <span className="mt-0.5 block text-lagoon-600">{it.stay}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── FAQ (native <details>, zero JS, answers visible to crawlers) ───────────── */
export function Faq({ f }: { f: HomeContent["faq"] }) {
  return (
    <section aria-labelledby="faq" className="bg-sand-100 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <H2 id="faq">{f.title}</H2>
          <Link href="/guide" className="mt-6 inline-flex items-center gap-1 font-semibold text-lagoon-600 hover:underline">{f.more} →</Link>
        </div>
        <div className="divide-y divide-sand-200 rounded-[var(--radius-card)] bg-white px-6 ring-1 ring-ocean-900/5">
          {f.items.map((it, i) => (
            <details key={i} className="group py-5" open={i === 0}>
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
  );
}

/* ───────────── Final CTA ───────────── */
export function Cta({ c, locale }: { c: HomeContent["cta"]; locale: Locale }) {
  const channels = [
    { label: "WhatsApp", href: SITE.contact.whatsapp, cls: "bg-[#25D366] text-ocean-950" },
    { label: "Telegram", href: SITE.contact.telegram, cls: "bg-[#2AABEE] text-white" },
    { label: "Zalo", href: SITE.contact.zalo, cls: "bg-[#0068FF] text-white" },
  ];
  if (locale === "vi") channels.unshift(channels.splice(2, 1)[0]!);       // Zalo first for Vietnamese
  if (locale === "ru") channels.unshift(channels.splice(1, 1)[0]!);       // Telegram first for Russian
  return (
    <section aria-labelledby="cta" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ocean-900 px-6 py-14 text-center text-sand-50 sm:px-12 lg:py-20">
        <Image src="/images/panorama-sea-links-city.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="relative">
          <h2 id="cta" className="mx-auto max-w-3xl font-display text-3xl font-semibold text-balance sm:text-5xl">{c.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-sand-200">{c.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {channels.map((ch) => (
              <a key={ch.label} href={ch.href} target="_blank" rel="noopener nofollow" className={`inline-flex min-h-12 items-center rounded-full px-7 text-base font-semibold transition hover:brightness-110 ${ch.cls}`}>{ch.label}</a>
            ))}
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-12 items-center rounded-full px-7 text-base font-semibold text-sand-50 ring-1 ring-white/40 transition hover:bg-white/10">{c.form}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
