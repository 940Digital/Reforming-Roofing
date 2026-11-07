/**
 * Finished jobs on the /our-work page, from the drone photos the client sent in November 2026.
 * Street addresses are left off on purpose (they are homeowners' houses), and the exported
 * JPEGs carry no GPS or camera metadata. Captions only describe what the photos show.
 */
export type WorkPhoto = { src: string; alt: string };
export type WorkJob = {
  id: string;
  title: string;
  /** Month the photos were taken, from the camera. */
  shot: string;
  blurb: string;
  photos: WorkPhoto[];
};

const p = (name: string, alt: string): WorkPhoto => ({ src: `/assets/work/${name}.jpg`, alt });

export const jobs: WorkJob[] = [
  {
    id: "acreage",
    title: "Brick home on acreage",
    shot: "June 2023",
    blurb: "A shingle hip roof over a brick home and its detached garage, set back on open land.",
    photos: [
      p("acreage-1", "Drone view of a brick home with a hip shingle roof and a detached garage on a large green lot"),
      p("acreage-2", "Side view of the same brick home's shingle roof with a curved walkway and tree line behind"),
      p("acreage-3", "Rear view of the brick home's roof above a stone patio, with the garage beside it"),
      p("acreage-4", "Wide drone shot of the home and garage at the end of a long drive through open land"),
    ],
  },
  {
    id: "woods-edge",
    title: "Shingle roof backing onto the trees",
    shot: "August 2023",
    blurb: "A hip roof in architectural shingles on a home with a pool, at the edge of a newer neighborhood.",
    photos: [
      p("woods-edge-1", "Drone view of a home's shingle hip roof above a backyard pool, with woods behind"),
      p("woods-edge-2", "Front of a two-story brick home with a gray shingle roof on a curving street"),
      p("woods-edge-3", "Top-down drone view of a gray shingle roof next to a backyard pool and tree line"),
      p("woods-edge-4", "Angled drone view of the shingle roof and pool, with neighboring roofs beyond"),
      p("woods-edge-5", "Close drone view of the shingle roof and pool from the wooded side"),
    ],
  },
  {
    id: "country-metal",
    title: "Metal roofs on a country property",
    shot: "November 2024",
    blurb: "Metal roofing on the house, the shop and the barn of one rural property.",
    photos: [
      p("country-metal-1", "Drone view of a home with a gray metal roof and a front porch, with a flag by the steps"),
      p("country-metal-2", "Rear view of the home's metal roof and covered back porch"),
      p("country-metal-3", "The home's metal roof from the other side, with crape myrtles along the wall"),
      p("country-metal-4", "A metal-roofed shop with a carport on the same property"),
      p("country-metal-5", "A long metal-roofed barn with an open-sided shed"),
    ],
  },
  {
    id: "open-land",
    title: "Shingle roofs out in the country",
    shot: "September 2023",
    blurb: "Homes on wide-open lots, where the whole roof is on show from the road.",
    photos: [
      p("open-land-1", "Drone view of a single-story home with a red-brown shingle roof and a carport, among trees"),
      p("open-land-2", "A home with a gray shingle roof and a back deck on a large open lot"),
    ],
  },
  {
    id: "cul-de-sac",
    title: "Shingle roof on a cul-de-sac",
    shot: "June 2025",
    blurb: "A shingle roof on a single-story home in a fenced-yard neighborhood.",
    photos: [
      p("cul-de-sac-1", "Drone view of single-story homes with brown shingle roofs around a cul-de-sac"),
      p("cul-de-sac-2", "Front of a row of shingle-roofed homes on a cul-de-sac"),
      p("cul-de-sac-3", "Close angled view of a shingle roof and driveway on the cul-de-sac"),
      p("cul-de-sac-4", "Rear view of the shingle roof over a fenced backyard"),
      p("cul-de-sac-5", "Backyards and shingle roofs from behind the stone wall"),
      p("cul-de-sac-6", "Wide rear view of the street's roofs and fenced yards"),
      p("cul-de-sac-7", "Top-down drone view of a shingle roof showing its vents and hips"),
    ],
  },
  {
    id: "pond-side",
    title: "Two-story home by the pond",
    shot: "August 2025",
    blurb: "A two-story roof with a chimney, backing onto a pond in an established neighborhood.",
    photos: [
      p("pond-side-1", "Drone view of a two-story home with a gray shingle roof and chimney, with neighboring homes beyond"),
      p("pond-side-2", "Angled view of the two-story home's roof and its tree-shaded backyard"),
      p("pond-side-3", "The home's roof seen from the pond side, with crape myrtles along the fence"),
      p("pond-side-4", "Top-down drone view of the shingle roof showing its valleys and vents"),
    ],
  },
];

/** Three leads for the homepage teaser. */
export const featured: WorkPhoto[] = ["acreage", "woods-edge", "country-metal"].map(
  (id) => jobs.find((j) => j.id === id)!.photos[0],
);

/** Unsplash stock (free licence) for services the drone set doesn't show. Source ids in public/assets/stock-ids.json. */
const stock = (name: string, alt: string): WorkPhoto => ({ src: `/assets/stock/${name}.jpg`, alt });

const allPhotos = jobs.flatMap((j) => j.photos);
const own = (name: string) => allPhotos.find((ph) => ph.src === `/assets/work/${name}.jpg`)!;

/**
 * Banner photo for each services page, keyed by path. Roofing pages use the client's own drone
 * photos where one shows the service; everything else uses stock until real job photos come in.
 */
const heroByPath: Record<string, WorkPhoto> = {
  // Pages outside /services. Every page gets a banner photo (Owen, 2026-11-07).
  "/about": own("country-metal-1"),
  "/contact": own("woods-edge-2"),
  "/reviews": own("cul-de-sac-1"),
  "/our-work": own("acreage-4"),
  "/service-area": own("cul-de-sac-6"),
  "/404": own("woods-edge-3"),
  "/services": own("acreage-1"),
  "/services/roofing": own("woods-edge-1"),
  "/services/roof-inspection": own("pond-side-4"),
  "/services/roof-damage-repair": own("cul-de-sac-3"),
  "/services/roof-replacement": own("pond-side-1"),
  "/services/shingle-roofing": own("woods-edge-4"),
  "/services/storm-damage-roof-repair": stock("storm-worn-shingles", "Weathered roof shingles curling, split and lifting along a roofline"),
  "/services/tile-roofing": stock("tile-roofing", "Close view of terracotta clay roof tiles"),
  "/services/siding": stock("siding", "Two-story home with green lap siding, white trim and a front porch"),
  "/services/gutters": stock("gutters", "Brown gutter and white downspout along a roof edge"),
  "/services/gutter-installation": stock("gutter-installation", "New white gutter and downspout under a roof eave against a blue sky"),
  "/services/gutter-replacement": stock("gutter-replacement", "Dark seamless gutter and downspout along the eave of a gabled house"),
  "/services/gutter-cleaning": stock("gutter-cleaning", "Dry leaves packed into a gutter along a shingle roof"),
  "/services/skylights": stock("skylights", "Open roof window looking up at a blue sky with clouds"),
  "/services/skylight-replacement": stock("skylight-replacement", "A roof window set into a clay tile roof"),
  "/services/skylight-repair": stock("skylight-repair", "Skylight letting daylight into a white room"),
  "/services/general-contracting": stock("gc-tools", "A drill, hammer, paintbrush, screws and a board on a workbench"),
  "/services/remodeling": stock("remodel-open-living", "A remodeled open-plan living room and kitchen with wood floors, a leather sofa and a green accent wall"),
  "/services/kitchen-remodeling": stock("kitchen-remodeling", "Remodeled kitchen with white cabinets, a farmhouse sink and stainless appliances"),
  "/services/bathroom-remodeling": stock("bathroom-remodeling", "Remodeled bathroom with a glass shower, double vanity and wood floors"),
  "/services/home-repairs": stock("repair-tools", "A square, tape measure, drill, pliers, wrench and hex keys laid out on a work surface"),
  "/services/interior-painting": stock("paint-roller", "A paint roller laying blue paint over a white wall"),
  "/services/exterior-painting": stock("painted-porch", "A freshly painted front porch with gray siding, white trim and a black front door"),
};

export const heroFor = (path: string): WorkPhoto | undefined => heroByPath[path];

/**
 * Town pages rotate through wide drone shots in list order, so neighbouring towns differ.
 * The alt text never names a town: a banner is not a claim that the job was in that town.
 */
const townPool = [
  "pond-side-2", "open-land-1", "acreage-2", "cul-de-sac-2", "woods-edge-5", "country-metal-3",
  "pond-side-3", "cul-de-sac-4", "acreage-3", "cul-de-sac-7", "cul-de-sac-5", "open-land-2",
].map(own);
export const townHero = (index: number): WorkPhoto => townPool[index % townPool.length];
