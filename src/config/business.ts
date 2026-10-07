/**
 * Single source of truth for business facts.
 * Anything marked TODO is unconfirmed. Do not hard-code these values anywhere else.
 */
export const business = {
  name: "Roofing Reformation",
  tagline: "Reforming roofs. Reflecting Christ.",
  siteUrl: "https://www.roofingreformation.com",
  foundedYear: 2019, // old site: "Since 2019"

  // TODO(Rob): the old site lists three numbers: 469-321-5201 (header, footer, body copy on every page),
  // 469-972-4501 and 469-236-2255. 469-321-5201 is used here only because it is the one the old site
  // shows everywhere. Confirm which line is real, then set phoneConfirmed to true.
  phoneDisplay: "(469) 321-5201",
  phoneHref: "tel:+14693215201",
  phoneConfirmed: false,

  // TODO(Rob): no email was found on the old site.
  email: null as string | null,

  // TODO(Rob): old site shows a likely mailbox (11450 US Hwy 380, Ste 130 #279, Cross Roads TX 76227)
  // and a likely home address in Denton. No street address is shown on the site until confirmed.
  address: null as null | { street: string; city: string; region: string; postalCode: string },

  // TODO(Rob): hours were not found. Emergency service is stated on the old site ("Emergency service
  // available") but 24/7 is not, so no hours claim is made.
  hours: null as string | null,

  // TODO(Rob): old site social icons point at wix placeholder profiles. Real profile URLs needed.
  social: { instagram: null as string | null, facebook: null as string | null },

  // TODO(Rob): public Google review URL, used for a "Read more reviews" link when present.
  reviewsUrl: null as string | null,

  serviceAreas: [
    "Denton",
    "McKinney",
    "Frisco",
    "Prosper",
    "Aubrey",
    "Flower Mound",
    "Lewisville",
    "Cross Roads",
    "Corinth",
    "Little Elm",
    "The Colony",
    "Southlake",
    "Grapevine",
    "Fort Worth",
  ],
  counties: ["Denton County", "Collin County"],
} as const;
