/**
 * Towns on the Google Business Profile service area, one page each at /service-area/<slug>.
 * Facts (county, ZIP codes, 2020 census population, coordinates) come from each town's Wikipedia
 * infobox, checked 2026-10-28. Each page must stay specific to its town: no copy that only swaps
 * the name, and no claims about jobs done there unless the client confirms them.
 */

export type City = {
  name: string;
  slug: string;
  /** First county is where most of the town sits. */
  counties: string[];
  zips: string[];
  population2020: number;
  lat: number;
  lng: number;
  intro: string;
};

const dms = (d: number, m: number, s: number) => d + m / 60 + s / 3600;

export const cities: City[] = [
  {
    name: "Denton",
    slug: "denton",
    counties: ["Denton"],
    zips: ["76201", "76202", "76203", "76204", "76205", "76206", "76207", "76208", "76209", "76210"],
    population2020: 139869,
    lat: dms(33, 12, 59),
    lng: -dms(97, 7, 45),
    intro: "Denton is the county seat of Denton County and the center of our service area.",
  },
  {
    name: "Aubrey",
    slug: "aubrey",
    counties: ["Denton"],
    zips: ["76227"],
    population2020: 5006,
    lat: dms(33, 18, 26),
    lng: -dms(96, 59, 2),
    intro: "Aubrey is a small city in northern Denton County, between Denton and Pilot Point.",
  },
  {
    name: "Celina",
    slug: "celina",
    counties: ["Collin", "Denton"],
    zips: ["75009"],
    population2020: 16739,
    lat: dms(33, 19, 9),
    lng: -dms(96, 47, 44),
    intro: "Celina sits in both Collin and Denton Counties and has been ranked the fastest-growing city in the Dallas-Fort Worth area.",
  },
  {
    name: "Gunter",
    slug: "gunter",
    counties: ["Grayson"],
    zips: ["75058"],
    population2020: 2060,
    lat: dms(33, 27, 5),
    lng: -dms(96, 46, 40),
    intro: "Gunter is in the southwest corner of Grayson County, just north of Celina.",
  },
  {
    name: "Ponder",
    slug: "ponder",
    counties: ["Denton"],
    zips: ["76259"],
    population2020: 2442,
    lat: dms(33, 10, 42),
    lng: -dms(97, 17, 28),
    intro: "Ponder is a small town in western Denton County, west of Denton and north of Justin.",
  },
  {
    name: "Corinth",
    slug: "corinth",
    counties: ["Denton"],
    zips: ["76208", "76210"],
    population2020: 22634,
    lat: dms(33, 8, 38),
    lng: -dms(97, 4, 20),
    intro: "Corinth is one of the four Lake Cities, just south of Denton along I-35E.",
  },
  {
    name: "Melissa",
    slug: "melissa",
    counties: ["Collin"],
    zips: ["75071", "75454"],
    population2020: 13901,
    lat: dms(33, 17, 5),
    lng: -dms(96, 33, 9),
    intro: "Melissa is in Collin County along US 75, north of McKinney and south of Anna.",
  },
  {
    name: "Prosper",
    slug: "prosper",
    counties: ["Collin", "Denton"],
    zips: ["75078"],
    population2020: 30174,
    lat: dms(33, 14, 45),
    lng: -dms(96, 50, 27),
    intro: "Prosper straddles Collin and Denton Counties, north of Frisco and south of Celina.",
  },
  {
    name: "Anna",
    slug: "anna",
    counties: ["Collin"],
    zips: ["75409"],
    population2020: 16896,
    lat: dms(33, 21, 20),
    lng: -dms(96, 33, 43),
    intro: "Anna is in northern Collin County along US 75, just north of Melissa.",
  },
  {
    name: "Krum",
    slug: "krum",
    counties: ["Denton"],
    zips: ["76249"],
    population2020: 5483,
    lat: dms(33, 15, 26),
    lng: -dms(97, 13, 50),
    intro: "Krum is a small city just northwest of Denton, between Denton and Sanger.",
  },
  {
    name: "Lewisville",
    slug: "lewisville",
    counties: ["Denton", "Dallas"],
    zips: ["75029", "75057", "75067", "75077"],
    population2020: 111822,
    lat: dms(33, 2, 18),
    lng: -dms(97, 0, 22),
    intro: "Lewisville is in southern Denton County, with a portion in Dallas County, at the south end of Lewisville Lake.",
  },
  {
    name: "Little Elm",
    slug: "little-elm",
    counties: ["Denton"],
    zips: ["75068"],
    population2020: 46453,
    lat: dms(33, 9, 50),
    lng: -dms(96, 55, 49),
    intro: "Little Elm sits on the east side of Lewisville Lake in Denton County.",
  },
  {
    name: "Pilot Point",
    slug: "pilot-point",
    counties: ["Denton"],
    zips: ["76258"],
    population2020: 4381,
    lat: dms(33, 23, 47),
    lng: -dms(96, 57, 31),
    intro: "Pilot Point is in northeast Denton County, near Ray Roberts Lake.",
  },
  {
    name: "Argyle",
    slug: "argyle",
    counties: ["Denton"],
    zips: ["76226"],
    population2020: 4403,
    lat: dms(33, 6, 59),
    lng: -dms(97, 11, 8),
    intro: "Argyle is in southwest Denton County, on the road between Denton and Fort Worth.",
  },
  {
    name: "Flower Mound",
    slug: "flower-mound",
    counties: ["Denton", "Tarrant"],
    zips: ["75022", "75027", "75028"],
    population2020: 75956,
    lat: dms(33, 2, 3),
    lng: -dms(97, 6, 50),
    intro: "Flower Mound is a town in southern Denton County, with a small part in Tarrant County, next to Grapevine Lake.",
  },
  {
    name: "Justin",
    slug: "justin",
    counties: ["Denton"],
    zips: ["76247"],
    population2020: 4409,
    lat: dms(33, 5, 18),
    lng: -dms(97, 18, 16),
    intro: "Justin is in southwest Denton County, south of Ponder and north of Fort Worth.",
  },
  {
    name: "Sanger",
    slug: "sanger",
    counties: ["Denton"],
    zips: ["76266"],
    population2020: 8839,
    lat: dms(33, 21, 47),
    lng: -dms(97, 10, 34),
    intro: "Sanger is in northern Denton County along I-35, north of Krum and Denton.",
  },
  {
    name: "Hickory Creek",
    slug: "hickory-creek",
    counties: ["Denton"],
    zips: ["75065"],
    population2020: 4718,
    lat: dms(33, 6, 40),
    lng: -dms(97, 1, 50),
    intro: "Hickory Creek is one of the four Lake Cities, on Lewisville Lake in southern Denton County.",
  },
  {
    name: "Lake Dallas",
    slug: "lake-dallas",
    counties: ["Denton"],
    zips: ["75065"],
    population2020: 7708,
    lat: dms(33, 7, 28),
    lng: -dms(97, 1, 18),
    intro: "Lake Dallas is one of the four Lake Cities, on the shore of Lewisville Lake. The town is named for the lake's original name.",
  },
];

export const cityHref = (slug: string) => `/service-area/${slug}`;
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

const toRad = (d: number) => (d * Math.PI) / 180;

/** Straight-line miles between two towns. */
export function milesBetween(a: City, b: City) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 3959 * 2 * Math.asin(Math.sqrt(h));
}

/** Compass direction from a to b, e.g. "northeast". */
export function directionFrom(a: City, b: City) {
  const y = Math.sin(toRad(b.lng - a.lng)) * Math.cos(toRad(b.lat));
  const x = Math.cos(toRad(a.lat)) * Math.sin(toRad(b.lat)) - Math.sin(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.cos(toRad(b.lng - a.lng));
  const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  return ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"][Math.round(deg / 45) % 8];
}

/** The closest other towns on the list. */
export function nearestTo(city: City, n = 4) {
  return cities
    .filter((c) => c.slug !== city.slug)
    .sort((a, b) => milesBetween(city, a) - milesBetween(city, b))
    .slice(0, n);
}

export const denton = cities[0];

/** Towns grouped by the county most of each one sits in. */
export function citiesByCounty() {
  const groups = new Map<string, City[]>();
  for (const c of cities) groups.set(c.counties[0], [...(groups.get(c.counties[0]) ?? []), c]);
  return [...groups.entries()]
    .map(([county, list]) => ({ county, list: list.sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => b.list.length - a.list.length);
}
