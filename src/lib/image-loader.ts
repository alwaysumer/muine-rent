/**
 * Image loader for the static build (GitHub Pages has no image optimizer).
 * scripts/build-static.mjs pre-generates two smaller copies next to every photo in public/images:
 *   /images/x/01.jpg → /images/x/01.w640.jpg and /images/x/01.w1280.jpg
 * next/image asks for a width; we answer with the smallest copy that covers it.
 */
export default function staticImageLoader({ src, width }: { src: string; width: number }): string {
  if (!src.startsWith("/images/") || !src.endsWith(".jpg")) return src; // statically imported media etc.
  if (width <= 640) return src.replace(/\.jpg$/, ".w640.jpg");
  if (width <= 1280) return src.replace(/\.jpg$/, ".w1280.jpg");
  return src;
}
