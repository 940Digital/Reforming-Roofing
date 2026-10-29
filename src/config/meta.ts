import type { Metadata } from "next";
import { business } from "./business";
import { pageAt } from "./pages";

/** Share image: a finished roof, landscape, so it fills Facebook, iMessage and X previews. */
export const ogImage = {
  url: "/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png",
  width: 1223,
  height: 815,
  alt: "Finished home with a gray shingle roof and a standing seam metal roof over the front entry, in Texas open country",
};

/**
 * Metadata for a registered page (see pages.ts). A page's openGraph and twitter objects replace the
 * layout's instead of merging, so every page sets them in full.
 */
export function metaFor(path: string): Metadata {
  const { title, description } = pageAt(path);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: `${business.siteUrl}${path === "/" ? "" : path}`,
      siteName: business.name,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
