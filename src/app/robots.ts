import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Explicitly welcome AI/answer-engine crawlers — GEO depends on being crawlable by them.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "CCBot",
  "meta-externalagent", "Amazonbot", "DuckAssistBot", "MistralAI-User", "cohere-ai", "YandexAdditional", "YandexAdditionalBot", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/*?*checkIn=", "/*?*sort="] }, // no crawl traps from filter params
      { userAgent: ["Googlebot", "Bingbot", "Yandex", "DuckDuckBot", "Baiduspider", "Slurp"], allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
