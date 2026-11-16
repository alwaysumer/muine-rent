import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// STATIC_EXPORT=1 (set by scripts/build-static.mjs) builds a server-less copy of the site for GitHub Pages.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic && { output: "export" as const }),
  images: {
    // Static hosting has no image optimizer: serve pre-resized copies instead (src/lib/image-loader.ts).
    ...(isStatic && { loader: "custom" as const, loaderFile: "./src/lib/image-loader.ts" }),
    // AVIF first (≈20–30% smaller than WebP), WebP fallback. next/image negotiates via Accept header.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // remotePatterns: [{ protocol: "https", hostname: "cdn.your-cms.com" }],
  },
  poweredByHeader: false,
  compress: true,
  experimental: { optimizePackageImports: ["next-intl"] },
};

export default withNextIntl(nextConfig);
