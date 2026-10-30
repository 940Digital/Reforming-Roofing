import type { MetadataRoute } from "next";
import { business } from "@/config/business";

// AI crawlers are already covered by "*". They are also named so the intent to allow them is explicit.
const aiCrawlers = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT fetching a page for a user
  "ClaudeBot", // Anthropic training
  "Claude-SearchBot", // Claude search
  "Claude-User", // Claude fetching a page for a user
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini and Google AI
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl, used by many AI models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/ only holds the contact form endpoints, which have nothing to index.
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
