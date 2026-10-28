import type { Metadata } from "next";
import { business } from "./business";

const ogImage = {
  url: "/assets/original/6d4007_8798622589aa43a1862229d8f051180f.jpg",
  width: 763,
  height: 700,
  alt: "Roofing Reformation logo, a red Luther rose with a blue heart and the letter R, above the company name",
};

/** Per-page title, description, canonical and Open Graph. Every page sets its own canonical. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${business.siteUrl}${path === "/" ? "" : path}`,
      siteName: business.name,
      images: [ogImage],
    },
  };
}

/** Trims to a meta-description length on a word boundary. */
export function metaDescription(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}.`;
}
