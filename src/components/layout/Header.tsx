import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { home } from "@/content/home";

const LANG_LABEL: Record<Locale, string> = { en: "EN", ru: "RU", vi: "VI" };

/** Transparent header over the hero. Pure HTML/CSS: the mobile menu is a <details>, no JS. */
export function Header({ locale }: { locale: Locale }) {
  const t = home[locale].nav;
  const links = [
    { href: "/rentals" as const, label: t.rentals },
    { href: { pathname: "/rentals" as const, query: { type: "apartment" } }, label: t.apartments },
    { href: { pathname: "/rentals" as const, query: { type: "villa" } }, label: t.villas },
    { href: "/guide" as const, label: t.guide },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2 text-sand-50" aria-label={`${SITE.name}, home`}>
          <span className="font-display text-2xl font-semibold tracking-tight">Sea Links</span>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-brass-400">Stays</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium text-sand-100/90 lg:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition hover:text-white">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center rounded-full bg-white/10 p-1 text-xs font-semibold text-sand-100 ring-1 ring-white/15 backdrop-blur sm:flex" aria-label="Language">
            {routing.locales.map((l) => (
              <li key={l}>
                <Link
                  href="/"
                  locale={l}
                  hrefLang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={`block rounded-full px-2.5 py-1 transition ${l === locale ? "bg-white text-ocean-950" : "hover:text-white"}`}
                >
                  {LANG_LABEL[l]}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={locale === "vi" ? SITE.contact.zalo : SITE.contact.whatsapp}
            target="_blank"
            rel="noopener nofollow"
            className="hidden min-h-10 items-center rounded-full bg-brass-500 px-4 text-sm font-semibold text-white transition hover:bg-brass-400 md:inline-flex"
          >
            {t.book}
          </a>

          <details className="group relative lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full bg-white/10 text-sand-50 ring-1 ring-white/20 backdrop-blur [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-black/5">
              {links.map((l) => (
                <Link key={l.label} href={l.href} className="block rounded-xl px-3 py-3 text-ocean-900 hover:bg-sand-100">{l.label}</Link>
              ))}
              <div className="mt-2 flex gap-1 border-t border-sand-200 pt-3">
                {routing.locales.map((l) => (
                  <Link key={l} href="/" locale={l} hrefLang={l} className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold ${l === locale ? "bg-ocean-900 text-white" : "bg-sand-100 text-ocean-900"}`}>
                    {LANG_LABEL[l]}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
