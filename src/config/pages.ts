import { business } from "./business";
import { categoryHref, serviceGroups, serviceHref, services, type Service } from "./services";
import { cities, cityHref, type City } from "./cities";

/**
 * Every public page, with its search title and description.
 * Page metadata, the sitemap and llms.txt all read from here, so a page added here shows up in all three.
 */
export type SitePage = {
  path: string;
  /** Short name, for breadcrumbs and llms.txt. */
  name: string;
  title: string;
  description: string;
  /** Kept out of search results and the sitemap; visitors can still browse to it. */
  noindex?: boolean;
};

/** Bump when page content changes. Used as the sitemap's lastmod. */
export const SITE_UPDATED = "2026-10-29";

const brand = business.name;

// Google shows roughly 60 characters of a title, so long service names drop the brand suffix.
const fit = (base: string) => (`${base} | ${brand}`.length <= 62 ? `${base} | ${brand}` : base);
const titleCase = (t: string) => t.replace(/\b\w/g, (c) => c.toUpperCase());

export const staticPages: SitePage[] = [
  {
    path: "/",
    name: "Home",
    title: `Roofing Contractor in Denton, TX | ${brand}`,
    description:
      "Veteran-owned residential roofing in Denton and Collin Counties. Repair, replacement and free inspections. The owners oversee every job.",
  },
  {
    path: "/about",
    name: "About",
    title: `About Us | Veteran-Owned Roofer | ${brand}`,
    description:
      "Roofing Reformation is a local, veteran-owned roofing company serving Denton and Collin Counties since 2019. The owners oversee every project.",
  },
  {
    path: "/services",
    name: "Services",
    title: `Roofing, Gutters, Skylights & Remodeling | ${brand}`,
    description:
      "Roof inspection, repair and replacement, shingle and tile roofing, plus gutters, skylights, remodeling and painting in Denton and Collin Counties.",
  },
  {
    path: "/reviews",
    name: "Reviews",
    title: `Reviews | ${brand}, Denton, TX`,
    description:
      "What homeowners say about working with Roofing Reformation: plain-English explanations, owners who stay involved, and a clean site.",
  },
  {
    path: "/service-area",
    name: "Service area",
    title: `Service Area: ${cities.length} Towns Near Denton, TX | ${brand}`,
    description: `Roofing Reformation serves ${cities.length} towns in Denton and Collin Counties and nearby, including Denton, Prosper, Celina, Flower Mound, Lewisville and Little Elm.`,
  },
  {
    path: "/contact",
    name: "Contact",
    title: `Contact Us | Free Roof Inspection | ${brand}`,
    description:
      "Text or call Roofing Reformation at (469) 321-5201 to schedule a free roof inspection and estimate in Denton and Collin Counties. Emergency roofing service available.",
  },
];

export const categoryPages: SitePage[] = serviceGroups.map((g) => ({
  path: categoryHref(g.id),
  name: g.name,
  title: fit(`${titleCase(g.noun)} Services in Denton, TX`),
  description: g.meta,
}));

export const servicePage = (s: Service): SitePage => ({
  path: serviceHref(s.slug),
  name: s.name,
  title: fit(`${s.name} in Denton, TX`),
  description: `${s.card} Serving Denton and Collin Counties. Free inspection and estimate.`,
});

// Denton alone has ten ZIP codes, so long lists are cut to keep the description under ~160 characters.
const zipList = (c: City) => (c.zips.length > 3 ? `${c.zips.slice(0, 3).join(", ")} and more` : c.zips.join(", "));

export const cityPage = (c: City): SitePage => ({
  path: cityHref(c.slug),
  name: c.name,
  title: fit(`Roofing in ${c.name}, TX`),
  description: `Roof inspection, repair and replacement in ${c.name}, TX (${zipList(c)}), plus gutters, skylights and remodeling. Text or call for a free inspection.`,
  noindex: c.indexed === false,
});

export const allPages: SitePage[] = [...staticPages, ...categoryPages, ...services.map(servicePage), ...cities.map(cityPage)];

/** The pages meant to show in search, for the sitemap. */
export const indexedPages = allPages.filter((p) => !p.noindex);

export const pageAt = (path: string) => {
  const page = allPages.find((p) => p.path === path);
  if (!page) throw new Error(`No page registered at ${path}`);
  return page;
};
