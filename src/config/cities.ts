/**
 * Towns on the Google Business Profile service area, one page each at /service-area/<slug>.
 * Facts (county, ZIP codes, 2020 census population, coordinates) come from each town's Wikipedia
 * infobox, checked 2026-10-28. Each page must stay specific to its town: no copy that only swaps
 * the name, and no claims about jobs done there unless the client confirms them.
 *
 * `housing` is the Census Bureau's American Community Survey 5-year estimates for the town (tables
 * B25034, B25035, B25003 and B25024), pulled from data.census.gov on 2026-10-29. Lewisville uses the
 * 2019-2023 survey because the 2020-2024 release has no year-built figures for it.
 *
 * A set of pages that only differ by town name is what Google treats as doorway pages, so every
 * section on a town page has to be built from that town's own data. Set `indexed: false` to pull a
 * town out of search and the sitemap.
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
  housing: Housing;
  /** Set false to keep this town's page out of search results and the sitemap. */
  indexed?: boolean;
};

export type Housing = {
  /** Last year of the 5-year survey, e.g. 2024 for 2020-2024. */
  survey: number;
  /** Census place GEOID, for the source link. */
  place: string;
  medianYearBuilt: number;
  units: number;
  /** Housing units by year built: 2020 or later, 2010s, 2000s, 1990s ... 1940s, 1939 or earlier. */
  built: number[];
  occupied: number;
  ownerOccupied: number;
  /** Detached single-family houses. */
  singleFamily: number;
};

export const builtLabels = ["2020+", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "Pre-1940"];

/** Share of a town's housing, as a whole percent. */
const pct = (n: number, of: number) => Math.round((n / of) * 100);

export function housingStats(h: Housing) {
  const sum = (from: number, to: number) => h.built.slice(from, to).reduce((a, b) => a + b, 0);
  return {
    since2010: pct(sum(0, 2), h.units),
    since2020: pct(h.built[0], h.units),
    before2000: pct(sum(3, 10), h.units),
    owned: pct(h.ownerOccupied, h.occupied),
    houses: pct(h.singleFamily, h.units),
    /** Index into `built` of the decade with the most homes. */
    peak: h.built.indexOf(Math.max(...h.built)),
  };
}

export const censusSource = (h: Housing) =>
  `https://data.census.gov/table/ACSDT5Y${h.survey}.B25034?g=160XX00US${h.place}`;

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
    housing: { survey: 2024, place: "4819972", medianYearBuilt: 1997, units: 60531, built: [3618,  11555,  13217,  6752,  9119,  7514,  3886,  1889,  1567,  1414], occupied: 56664, ownerOccupied: 28332, singleFamily: 33962 },
  },
  {
    name: "Aubrey",
    slug: "aubrey",
    counties: ["Denton"],
    zips: ["76227"],
    population2020: 5006,
    lat: dms(33, 18, 26),
    lng: -dms(96, 59, 2),
    housing: { survey: 2024, place: "4804600", medianYearBuilt: 2013, units: 3176, built: [942,  922,  636,  150,  207,  63,  163,  0,  50,  43], occupied: 3091, ownerOccupied: 2350, singleFamily: 2758 },
  },
  {
    name: "Celina",
    slug: "celina",
    counties: ["Collin", "Denton"],
    zips: ["75009"],
    population2020: 16739,
    lat: dms(33, 19, 9),
    lng: -dms(96, 47, 44),
    housing: { survey: 2024, place: "4813684", medianYearBuilt: 2015, units: 11152, built: [3618,  3695,  1870,  528,  608,  179,  123,  0,  391,  140], occupied: 10324, ownerOccupied: 9570, singleFamily: 10805 },
  },
  {
    name: "Gunter",
    slug: "gunter",
    counties: ["Grayson"],
    zips: ["75058"],
    population2020: 2060,
    lat: dms(33, 27, 5),
    lng: -dms(96, 46, 40),
    housing: { survey: 2024, place: "4831616", medianYearBuilt: 2004, units: 762, built: [88,  197,  168,  45,  107,  31,  33,  12,  30,  51], occupied: 706, ownerOccupied: 489, singleFamily: 668 },
  },
  {
    name: "Ponder",
    slug: "ponder",
    counties: ["Denton"],
    zips: ["76259"],
    population2020: 2442,
    lat: dms(33, 10, 42),
    lng: -dms(97, 17, 28),
    housing: { survey: 2024, place: "4858664", medianYearBuilt: 2008, units: 887, built: [21,  356,  297,  30,  63,  27,  79,  6,  4,  4], occupied: 864, ownerOccupied: 756, singleFamily: 851 },
  },
  {
    name: "Corinth",
    slug: "corinth",
    counties: ["Denton"],
    zips: ["76208", "76210"],
    population2020: 22634,
    lat: dms(33, 8, 38),
    lng: -dms(97, 4, 20),
    housing: { survey: 2024, place: "4816696", medianYearBuilt: 1997, units: 8869, built: [133,  891,  2508,  3269,  1526,  346,  25,  81,  49,  41], occupied: 8540, ownerOccupied: 6550, singleFamily: 7528 },
  },
  {
    name: "Melissa",
    slug: "melissa",
    counties: ["Collin"],
    zips: ["75071", "75454"],
    population2020: 13901,
    lat: dms(33, 17, 5),
    lng: -dms(96, 33, 9),
    housing: { survey: 2024, place: "4847496", medianYearBuilt: 2015, units: 6266, built: [1821,  2768,  1135,  285,  46,  27,  143,  0,  41,  0], occupied: 6169, ownerOccupied: 5470, singleFamily: 5798 },
  },
  {
    name: "Prosper",
    slug: "prosper",
    counties: ["Collin", "Denton"],
    zips: ["75078"],
    population2020: 30174,
    lat: dms(33, 14, 45),
    lng: -dms(96, 50, 27),
    housing: { survey: 2024, place: "4859696", medianYearBuilt: 2014, units: 11921, built: [2393,  6204,  2494,  384,  284,  101,  21,  33,  7,  0], occupied: 11239, ownerOccupied: 9874, singleFamily: 10583 },
  },
  {
    name: "Anna",
    slug: "anna",
    counties: ["Collin"],
    zips: ["75409"],
    population2020: 16896,
    lat: dms(33, 21, 20),
    lng: -dms(96, 33, 43),
    housing: { survey: 2024, place: "4803300", medianYearBuilt: 2012, units: 8111, built: [1955,  2730,  2676,  236,  95,  129,  103,  119,  29,  39], occupied: 7753, ownerOccupied: 6084, singleFamily: 7479 },
  },
  {
    name: "Krum",
    slug: "krum",
    counties: ["Denton"],
    zips: ["76249"],
    population2020: 5483,
    lat: dms(33, 15, 26),
    lng: -dms(97, 13, 50),
    housing: { survey: 2024, place: "4839928", medianYearBuilt: 2005, units: 2035, built: [168,  469,  759,  143,  267,  183,  28,  0,  0,  18], occupied: 2014, ownerOccupied: 1527, singleFamily: 1878 },
  },
  {
    name: "Lewisville",
    slug: "lewisville",
    counties: ["Denton", "Dallas"],
    zips: ["75029", "75057", "75067", "75077"],
    population2020: 111822,
    lat: dms(33, 2, 18),
    lng: -dms(97, 0, 22),
    housing: { survey: 2023, place: "4842508", medianYearBuilt: 1996, units: 52909, built: [1261,  9981,  10146,  13192,  10708,  4649,  1505,  925,  221,  321], occupied: 50147, ownerOccupied: 23344, singleFamily: 23818 },
  },
  {
    name: "Little Elm",
    slug: "little-elm",
    counties: ["Denton"],
    zips: ["75068"],
    population2020: 46453,
    lat: dms(33, 9, 50),
    lng: -dms(96, 55, 49),
    housing: { survey: 2024, place: "4843012", medianYearBuilt: 2011, units: 19778, built: [2681,  8249,  7194,  1089,  174,  166,  52,  58,  27,  88], occupied: 18883, ownerOccupied: 13238, singleFamily: 14715 },
  },
  {
    name: "Pilot Point",
    slug: "pilot-point",
    counties: ["Denton"],
    zips: ["76258"],
    population2020: 4381,
    lat: dms(33, 23, 47),
    lng: -dms(96, 57, 31),
    housing: { survey: 2024, place: "4857476", medianYearBuilt: 1997, units: 1931, built: [203,  329,  393,  118,  381,  214,  53,  128,  0,  112], occupied: 1813, ownerOccupied: 1358, singleFamily: 1660 },
  },
  {
    name: "Argyle",
    slug: "argyle",
    counties: ["Denton"],
    zips: ["76226"],
    population2020: 4403,
    lat: dms(33, 6, 59),
    lng: -dms(97, 11, 8),
    housing: { survey: 2024, place: "4803768", medianYearBuilt: 2002, units: 1784, built: [296,  354,  316,  204,  362,  175,  77,  0,  0,  0], occupied: 1684, ownerOccupied: 1554, singleFamily: 1743 },
  },
  {
    name: "Flower Mound",
    slug: "flower-mound",
    counties: ["Denton", "Tarrant"],
    zips: ["75022", "75027", "75028"],
    population2020: 75956,
    lat: dms(33, 2, 3),
    lng: -dms(97, 6, 50),
    housing: { survey: 2024, place: "4826232", medianYearBuilt: 1997, units: 28789, built: [854,  5051,  5445,  11597,  4381,  978,  299,  76,  99,  9], occupied: 28128, ownerOccupied: 23202, singleFamily: 24717 },
  },
  {
    name: "Justin",
    slug: "justin",
    counties: ["Denton"],
    zips: ["76247"],
    population2020: 4409,
    lat: dms(33, 5, 18),
    lng: -dms(97, 18, 16),
    housing: { survey: 2024, place: "4838332", medianYearBuilt: 2011, units: 1842, built: [416,  536,  426,  114,  119,  95,  36,  75,  0,  25], occupied: 1842, ownerOccupied: 1542, singleFamily: 1692 },
  },
  {
    name: "Sanger",
    slug: "sanger",
    counties: ["Denton"],
    zips: ["76266"],
    population2020: 8839,
    lat: dms(33, 21, 47),
    lng: -dms(97, 10, 34),
    housing: { survey: 2024, place: "4865408", medianYearBuilt: 2001, units: 3856, built: [249,  993,  799,  417,  736,  243,  94,  146,  22,  157], occupied: 3632, ownerOccupied: 2678, singleFamily: 3066 },
  },
  {
    name: "Hickory Creek",
    slug: "hickory-creek",
    counties: ["Denton"],
    zips: ["75065"],
    population2020: 4718,
    lat: dms(33, 6, 40),
    lng: -dms(97, 1, 50),
    housing: { survey: 2024, place: "4833476", medianYearBuilt: 2008, units: 2036, built: [193,  729,  616,  109,  126,  148,  74,  41,  0,  0], occupied: 1936, ownerOccupied: 1543, singleFamily: 1679 },
  },
  {
    name: "Lake Dallas",
    slug: "lake-dallas",
    counties: ["Denton"],
    zips: ["75065"],
    population2020: 7708,
    lat: dms(33, 7, 28),
    lng: -dms(97, 1, 18),
    housing: { survey: 2024, place: "4840516", medianYearBuilt: 1998, units: 3294, built: [15,  447,  1073,  646,  635,  399,  18,  21,  40,  0], occupied: 3112, ownerOccupied: 2154, singleFamily: 2188 },
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
