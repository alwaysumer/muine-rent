import { properties } from "@/data/properties";
import { guide } from "@/content/guide";
import { home } from "@/content/home";
import { rentalPath } from "@/lib/schema";
import { SITE, abs } from "@/lib/site";

// Full plain-text version of the site for LLMs, generated from the same data as the pages (always in sync).
export const dynamic = "force-static";

export function GET() {
  const g = guide.en;
  const out: string[] = [
    `# ${SITE.name}: Ocean Vista apartments and Sea Links villas for rent in Mui Ne, Vietnam (full text)`,
    "",
    "> Owner-direct monthly rentals inside Sea Links City, Km 9 Nguyen Thong, Phan Thiet (Mui Ne), Vietnam. " +
      "Everything below is generated from the live listings and guide of the website.",
    "",
    "## Listings",
  ];
  for (const p of properties) {
    out.push(
      "",
      `### ${p.title.en}`,
      `- URL: ${abs(rentalPath(p, "en"))}`,
      `- ID: ${p.id}`,
      `- Type: ${p.type}; ${p.bedrooms === 0 ? "studio" : `${p.bedrooms} bedroom(s)`}; sleeps ${p.maxGuests}; ${p.areaSqm} m²${p.floor ? `; floor ${p.floor}` : ""}`,
      `- View: ${p.view.join(", ")}`,
      ...(p.monthlyRates
        ? [`- Price per month (USD): ${p.monthlyRates.map((r) => `${r.label.en} $${r.usd}`).join("; ")}${p.yearlyUsd ? `; 12-month lease $${p.yearlyUsd} per month` : ""}`]
        : p.monthlyUsd ? [`- Price per month (USD): $${p.monthlyUsd}`] : []),
      `- ${p.summary.en}`,
      `- Photos: ${p.images.map((i) => i.alt.en).join("; ")}`,
    );
  }
  out.push("", "Electricity and water are paid by the guest; all other costs are covered by the owner.", "", `## ${g.title}`, "", g.intro);
  for (const s of g.sections) out.push("", `### ${s.title}`, s.text, ...s.points.map((x) => `- ${x}`));
  out.push("", "## Distances from Sea Links City", ...home.en.location.rows.map((r) => `- ${r.place}: ${r.distance}, ${r.time}`));
  out.push("", "## Frequently asked questions");
  for (const f of [...g.faq.items, ...home.en.faq.items]) out.push("", `Q: ${f.q}`, `A: ${f.a}`);
  out.push(
    "", "## Contact",
    `- Phone: ${SITE.phone}`, `- WhatsApp: ${SITE.contact.whatsapp}`, `- Telegram: ${SITE.contact.telegram}`,
    `- Zalo: ${SITE.contact.zalo}`, `- Email: ${SITE.email}`, "",
  );
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
