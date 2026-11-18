"use client";

import { useState } from "react";

interface Labels {
  checkIn: string; checkOut: string; guests: string; type: string;
  any: string; apartment: string; villa: string; search: string;
  /** First line of the WhatsApp inquiry, e.g. "Hello! I'm looking for a stay in Sea Links City." */
  waHello: string;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
/** 2026-12-24 → 24.12.2026 */
const human = (s: string) => s.split("-").reverse().join(".");
const addDays = (s: string, n: number) => { const d = new Date(s); d.setDate(d.getDate() + n); return iso(d); };

/**
 * With dates filled in, "Search" opens WhatsApp with a ready inquiry (dates, guests, stay type) to the owner.
 * Without dates (or with JS disabled) it is a plain GET <form> to the catalog (/en/rentals?type=villa).
 * JS also keeps check-out ≥ check-in + 1.
 * Native inputs = best INP on low-end Android and native date pickers on mobile.
 */
export function HeroSearch({ action, whatsapp, labels: l }: { action: string; whatsapp: string; labels: Labels }) {
  const today = iso(new Date());
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const field = "block w-full rounded-xl border-0 bg-sand-50 px-3.5 py-3 text-base text-ocean-950 ring-1 ring-inset ring-sand-200 focus:ring-2 focus:ring-lagoon-500";
  // iOS Safari: an empty date input has an intrinsic min width (overflows the grid) and no height.
  const dateField = "h-12 min-w-0 appearance-none text-left [&::-webkit-date-and-time-value]:text-left";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ocean-700";

  return (
    <form
      action={action}
      method="get"
      role="search"
      onSubmit={(e) => {
        if (!checkIn && !checkOut) return; // no dates → browse the catalog
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const type = String(data.get("type") ?? "");
        const text = [
          l.waHello,
          checkIn && `${l.checkIn}: ${human(checkIn)}`,
          checkOut && `${l.checkOut}: ${human(checkOut)}`,
          `${l.guests}: ${String(data.get("guests") ?? "")}`,
          `${l.type}: ${type === "apartment" ? l.apartment : type === "villa" ? l.villa : l.any}`,
        ].filter(Boolean).join("\n");
        const url = `${whatsapp}?text=${encodeURIComponent(text)}`;
        if (!window.open(url, "_blank", "noopener")) window.location.href = url; // popup blocked → same tab
      }}
      className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur sm:p-5 lg:grid-cols-[1fr_1fr_0.8fr_1.4fr_auto] lg:items-end"
    >
      <div className="min-w-0">
        <label htmlFor="checkIn" className={label}>{l.checkIn}</label>
        <input
          id="checkIn" name="checkIn" type="date" min={today} value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (checkOut && checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1));
          }}
          className={`${field} ${dateField}`}
        />
      </div>
      <div className="min-w-0">
        <label htmlFor="checkOut" className={label}>{l.checkOut}</label>
        <input
          id="checkOut" name="checkOut" type="date"
          min={checkIn ? addDays(checkIn, 1) : today} value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={`${field} ${dateField}`}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="guests" className={label}>{l.guests}</label>
        <select id="guests" name="guests" defaultValue="2" className={field}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}{n === 12 ? "+" : ""}</option>
          ))}
        </select>
      </div>

      <fieldset className="col-span-2 sm:col-span-1 lg:col-span-1">
        <legend className={label}>{l.type}</legend>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-sand-100 p-1 ring-1 ring-inset ring-sand-200">
          {([["", l.any], ["apartment", l.apartment], ["villa", l.villa]] as const).map(([v, text]) => (
            <label key={v || "any"} className="cursor-pointer">
              <input type="radio" name="type" value={v} defaultChecked={v === ""} className="peer sr-only" />
              <span className="block truncate rounded-lg px-2 py-2.5 text-center text-sm font-medium text-ocean-700 transition peer-checked:bg-white peer-checked:text-ocean-950 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-lagoon-500">
                {text}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="col-span-2 min-h-12 rounded-xl bg-ocean-900 px-6 text-base font-semibold text-sand-50 transition hover:bg-ocean-700 active:scale-[0.99] lg:col-span-1"
      >
        {l.search}
      </button>
    </form>
  );
}
