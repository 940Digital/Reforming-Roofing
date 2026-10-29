import { cities } from "./cities";

/**
 * Single source of truth for business facts.
 * Anything marked TODO is unconfirmed. Do not hard-code these values anywhere else.
 */
export const business = {
  name: "Roofing Reformation",
  tagline: "Reforming roofs. Reflecting Christ.",
  siteUrl: "https://www.roofingreformation.com",
  foundedYear: 2019, // old site: "Since 2019"

  // Confirmed as the business line. The old site also listed 469-972-4501 and 469-236-2255; do not use those.
  phoneDisplay: "(469) 321-5201",
  phoneHref: "tel:+14693215201",
  phoneSchema: "+1-469-321-5201",

  // TODO(Rob): no email was found on the old site.
  email: null as string | null,

  // Deliberately null: the business is listed as a service-area business with no street address.
  // The old site's Cross Roads address is a mailbox, which Google does not allow as a business address.
  address: null as null | { street: string; city: string; region: string; postalCode: string },

  // TODO(Rob): hours were not found. Emergency service is stated on the old site ("Emergency service
  // available") but 24/7 is not, so no hours claim is made.
  hours: null as string | null,

  social: {
    instagram: "https://www.instagram.com/roofingreformation/" as string | null,
    facebook: "https://www.facebook.com/roofingreformation/" as string | null,
  },

  // Google Business Profile, as a stable Maps link built from the profile's CID (ludocid).
  googleBusinessUrl: "https://www.google.com/maps?cid=2917192926522942732",
  // Used for the "Read more reviews" button. The GBP link opens the profile, reviews included.
  reviewsUrl: "https://www.google.com/maps?cid=2917192926522942732" as string | null,

  founders: ["Rob Vaughan", "Jeremy Morphis"],

  // Matches the Google Business Profile service area. Edit the list in cities.ts.
  serviceAreas: cities.map((c) => c.name),
  counties: ["Denton County", "Collin County"],
} as const;
