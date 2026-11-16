import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { home } from "@/content/home";

const NAMES: Record<Locale, string> = { en: "English", ru: "Русский", vi: "Tiếng Việt" };

export function Footer({ locale }: { locale: Locale }) {
  const t = home[locale];
  return (
    <footer className="bg-ocean-950 pb-28 pt-16 text-sand-200 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <p className="flex items-baseline gap-2 text-sand-50">
            <span className="font-display text-2xl font-semibold">Mui Ne</span>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-brass-400">Rent</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed">{t.footer.about}</p>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-50">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/rentals" className="hover:text-white">{t.nav.rentals}</Link></li>
            <li><Link href={{ pathname: "/rentals", query: { type: "apartment" } }} className="hover:text-white">{t.nav.apartments}</Link></li>
            <li><Link href={{ pathname: "/rentals", query: { type: "villa" } }} className="hover:text-white">{t.nav.villas}</Link></li>
            <li><Link href="/guide" className="hover:text-white">{t.nav.guide}</Link></li>
          </ul>
        </nav>
        {/* NAP block — identical to Google Business Profile and JSON-LD */}
        <address className="not-italic">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-50">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{SITE.address.streetAddress}, {SITE.address.addressLocality}, Vietnam</li>
            <li><a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex gap-3 pt-1">
              <a href={SITE.contact.whatsapp} className="hover:text-white">WhatsApp</a>
              <a href={SITE.contact.telegram} className="hover:text-white">Telegram</a>
              <a href={SITE.contact.zalo} className="hover:text-white">Zalo</a>
            </li>
          </ul>
        </address>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-50">{t.footer.languages}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {routing.locales.map((l) => (
              <li key={l}><Link href="/" locale={l} hrefLang={l} className={l === locale ? "text-white" : "hover:text-white"}>{NAMES[l]}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-sand-200/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
      </p>
    </footer>
  );
}

/** Mobile sticky contact bar — the highest-converting element on rental sites in VN/RU markets. */
export function MobileContactBar({ locale }: { locale: Locale }) {
  const main = locale === "vi" ? { label: "Zalo", href: SITE.contact.zalo, cls: "bg-[#0068FF] text-white" }
    : locale === "ru" ? { label: "Telegram", href: SITE.contact.telegram, cls: "bg-[#2AABEE] text-white" }
    : { label: "WhatsApp", href: SITE.contact.whatsapp, cls: "bg-[#25D366] text-ocean-950" };
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a href={main.href} target="_blank" rel="noopener nofollow" className={`flex min-h-12 flex-1 items-center justify-center rounded-xl font-semibold ${main.cls}`}>{main.label}</a>
        <a href={`tel:${SITE.phone}`} className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-ocean-900 font-semibold text-sand-50">
          {locale === "ru" ? "Позвонить" : locale === "vi" ? "Gọi ngay" : "Call"}
        </a>
      </div>
    </div>
  );
}
