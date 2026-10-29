import { business } from "./business";
import { cities, type City } from "./cities";
import { pageAt, SITE_UPDATED } from "./pages";
import { ogImage } from "./meta";
import { categoryHref, serviceGroups, serviceHref, services, servicesIn, type Service, type ServiceGroup } from "./services";

/**
 * schema.org structured data. The business and website are emitted once per page from the root
 * layout; each page adds its own nodes and points at them by @id, so every page reads as one graph.
 * Only confirmed facts go in: no address (service-area business), no hours, no ratings.
 */

const site = business.siteUrl;
export const abs = (path: string) => (path === "/" ? `${site}/` : `${site}${path}`);

export const ids = {
  business: `${site}/#business`,
  website: `${site}/#website`,
  logo: `${site}/#logo`,
  person: (name: string) => `${site}/about#${name.toLowerCase().replace(/\s+/g, "-")}`,
  service: (s: Service) => `${abs(serviceHref(s.slug))}#service`,
};

const ref = (id: string) => ({ "@id": id });
const county = (name: string) => ({ "@type": "AdministrativeArea", name: `${name}, Texas` });
const town = (c: City) => ({ "@type": "City", name: `${c.name}, TX` });
// Short form for every page; the full City node with coordinates is only on that town's own page.
const areaServed = () => [...business.counties.map(county), ...cities.map(town)];

export function cityNode(c: City) {
  return {
    "@type": "City",
    name: `${c.name}, TX`,
    geo: { "@type": "GeoCoordinates", latitude: Number(c.lat.toFixed(5)), longitude: Number(c.lng.toFixed(5)) },
    containedInPlace: c.counties.map((n) => county(`${n} County`)),
  };
}

export function businessNode() {
  const sameAs = [business.googleBusinessUrl, business.social.instagram, business.social.facebook].filter(Boolean);
  return {
    "@type": "RoofingContractor",
    "@id": ids.business,
    name: business.name,
    url: abs("/"),
    description: pageAt("/").description,
    slogan: business.tagline,
    telephone: business.phoneSchema,
    ...(business.email ? { email: business.email } : {}),
    foundingDate: String(business.foundedYear),
    founder: business.founders.map((name) => ({ "@type": "Person", "@id": ids.person(name), name })),
    logo: { "@type": "ImageObject", "@id": ids.logo, url: `${site}/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png`, width: 412, height: 389, caption: business.name },
    image: { "@type": "ImageObject", url: `${site}${ogImage.url}`, width: ogImage.width, height: ogImage.height },
    areaServed: areaServed(),
    ...(business.googleBusinessUrl ? { hasMap: business.googleBusinessUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: services.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: serviceGroups.map((g) => ({
        "@type": "OfferCatalog",
        name: `${g.noun} services`,
        url: abs(categoryHref(g.id)),
        itemListElement: servicesIn(g.id).map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": ids.service(s), name: s.name, url: abs(serviceHref(s.slug)) },
        })),
      })),
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: abs("/"),
    name: business.name,
    description: pageAt("/").description,
    publisher: ref(ids.business),
    inLanguage: "en-US",
  };
}

export function serviceNode(s: Service) {
  const group = serviceGroups.find((g) => g.id === s.group)!;
  return {
    "@type": "Service",
    "@id": ids.service(s),
    name: s.name,
    serviceType: s.name,
    category: `${group.noun} services`,
    description: s.summary,
    url: abs(serviceHref(s.slug)),
    provider: ref(ids.business),
    areaServed: areaServed(),
    isRelatedTo: s.related.map((slug) => {
      const r = services.find((x) => x.slug === slug)!;
      return { "@type": "Service", "@id": ids.service(r), name: r.name };
    }),
  };
}

/** A list of links, used as the main content of hub pages. */
export function itemList(path: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    "@id": `${abs(path)}#list`,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
  };
}

export const serviceItems = (list: Service[]) => list.map((s) => ({ name: s.name, path: serviceHref(s.slug) }));
export const categoryServiceItems = (id: ServiceGroup) => serviceItems(servicesIn(id));

/**
 * The nodes for one page: the WebPage itself, breadcrumbs (`trail` lists the pages after Home,
 * ending with this one), FAQs, and anything else the page is about.
 */
export function pageGraph({
  path,
  type = "WebPage",
  trail,
  faqs,
  mainEntity,
  about,
  extra = [],
}: {
  path: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
  trail?: string[];
  faqs?: readonly (readonly [string, string])[];
  mainEntity?: object;
  about?: object[];
  extra?: object[];
}) {
  const page = pageAt(path);
  const url = abs(path);
  const nodes: object[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: ref(ids.website),
      about: [ref(ids.business), ...(about ?? [])],
      ...(mainEntity ? { mainEntity } : {}),
      primaryImageOfPage: { "@type": "ImageObject", url: `${site}${ogImage.url}` },
      ...(trail ? { breadcrumb: ref(`${url}#breadcrumb`) } : {}),
      inLanguage: "en-US",
      dateModified: SITE_UPDATED,
    },
  ];
  if (trail) {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: ["/", ...trail].map((p, i) => ({ "@type": "ListItem", position: i + 1, name: pageAt(p).name, item: abs(p) })),
    });
  }
  if (faqs?.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      isPartOf: ref(`${url}#webpage`),
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }
  return [...nodes, ...extra];
}
