import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { allPages, SITE_UPDATED } from "@/config/pages";

// changefreq and priority are left out: Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  return allPages.map((p) => ({
    url: `${business.siteUrl}${p.path === "/" ? "" : p.path}`,
    lastModified: SITE_UPDATED,
  }));
}
