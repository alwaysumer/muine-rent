"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface GalleryImage { src: string; width: number; height: number; alt: string }
interface Labels { open: string; close: string; prev: string; next: string; showAll: string }

/**
 * Small client island: photo grid + full-screen viewer (native <dialog>: focus trap and Esc for free).
 * Thumbnails are next/image (AVIF/WebP, lazy); only the first one is preloaded for LCP.
 */
export function Gallery({ images, labels }: { images: GalleryImage[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const count = images.length;

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];
  const touchX = useRef<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((im, i) => (
          <li key={im.src} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${im.alt}`}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl bg-sand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon-600"
            >
              <Image
                src={im.src}
                alt={im.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, (min-width: 640px) 33vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ocean-950/95 p-0 text-sand-50 backdrop:bg-ocean-950"
      >
        {current && index !== null && (
          <div
            className="flex h-full flex-col"
            onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
            onTouchEnd={(e) => {
              const dx = (e.changedTouches[0]?.clientX ?? 0) - (touchX.current ?? 0);
              if (touchX.current !== null && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-sm">
              <span aria-live="polite">{index + 1} / {count}</span>
              <button type="button" onClick={close} className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold ring-1 ring-white/30 hover:bg-white/10">
                {labels.close} ✕
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ocean-950/60 text-2xl ring-1 ring-white/30 hover:bg-ocean-950/90">‹</button>
              <button type="button" onClick={() => step(1)} aria-label={labels.next} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ocean-950/60 text-2xl ring-1 ring-white/30 hover:bg-ocean-950/90">›</button>
            </div>
            <p className="px-4 py-4 text-center text-sm text-sand-200">{current.alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
