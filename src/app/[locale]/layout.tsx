import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Both fonts cover Latin, Cyrillic AND Vietnamese diacritics; self-hosted by next/font (no layout shift).
const inter = Inter({ subsets: ["latin", "cyrillic", "vietnamese"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "vietnamese"], weight: ["500", "600"], variable: "--font-cormorant", display: "swap",
});

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale); // enables full static rendering (SSG)

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {/* Client components only receive messages they need; current ones need none. */}
        <NextIntlClientProvider messages={{}}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
