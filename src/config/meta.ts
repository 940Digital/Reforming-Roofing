import type { Metadata } from "next";
import { business } from "./business";

export const ogImage = {
  url: "/assets/original/6d4007_8798622589aa43a1862229d8f051180f.jpg",
  width: 763,
  height: 700,
  alt: "Roofing Reformation logo, a red Luther rose with a blue heart and the letter R, above the company name",
};

/** Metadata for a page other than the homepage. A page's openGraph replaces the layout's, so the image is repeated here. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: "website", url: `${business.siteUrl}${path}`, siteName: business.name, images: [ogImage] },
  };
}
