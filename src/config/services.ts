/**
 * Single source of truth for service categories and their services.
 * Category and service pages, the homepage grid, schema and the sitemap all read from here.
 * General contracting copy is the client's own wording. Do not add claims it does not make.
 */

export type Service = {
  name: string;
  slug: string;
  /** Short line for cards. */
  summary: string;
  /** Full description for the service page. */
  body: string;
  /** What the job covers, taken from the body copy. Optional. */
  includes?: string[];
  icon?: string;
};

export type Category = {
  name: string;
  slug: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Photo behind the page hero. */
  heroImage: string;
  services: Service[];
};

const ico = (id: string) => `/assets/original/9a58ba_${id}.png`;

// Slugs follow the old site's URL structure (/roofing-services/<slug>).
const roofing: Category = {
  name: "Roofing",
  slug: "roofing-services",
  eyebrow: "Residential and commercial",
  heading: "Roofing services in Denton and Collin Counties",
  intro: "Eight kinds of roofing work. Pick the one that fits and we will take it from there.",
  heroImage: "/assets/original/860db2_b2a1fff6e5b143d48b4c59099ead2d84.jpeg",
  services: [
    {
      name: "Roof repairs",
      slug: "roof-repairs",
      icon: ico("940d1885006c4096bcc5918e4544dfc5"),
      summary: "A leak after a storm gets found and fixed quickly. We repair what is broken and tell you plainly what is not.",
      body: "A leak after a storm gets found and fixed quickly. We repair what is broken and tell you plainly what is not. Free estimate and inspection come first, and you get an honest assessment of the roof before any work begins.",
    },
    {
      name: "Roof replacement and reroofing",
      slug: "roof-replacement-reroofing",
      icon: ico("f07ab85f44824e918f61b9dcf74b37f2"),
      summary: "Old roof out, new roof on. We walk you through materials, designs and budget before anything starts.",
      body: "Old roof out, new roof on. We walk you through materials, designs and budget before anything starts. You choose the materials and design, the owners oversee the project, and we clean up when the job is done.",
    },
    {
      name: "Roof installation",
      slug: "roof-installation",
      icon: ico("d3648d83c57c4c11ae489397ce15bff9"),
      summary: "A new roof on a new build or a new project, handled start to finish by one team.",
      body: "A new roof on a new build or a new project, handled start to finish by one team. We explain the options and the cost before you decide anything, and the owners oversee the work from start to finish.",
    },
    {
      name: "Roof inspections",
      slug: "roof-inspections",
      icon: ico("02d94148ce2848eab3db8a145bb5c221"),
      summary: "Free inspection with an honest assessment of your roof's condition. You get the answer.",
      body: "Free inspection with an honest assessment of your roof's condition. Call us, we come out and look at the roof, and you get a plain-English answer about what we found and what your options are.",
    },
    {
      name: "Shingle roofing",
      slug: "shingle-roofing",
      icon: ico("7844bf9b136047e2883688d010f2cd4c"),
      summary: "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed.",
      body: "Asphalt shingle roofing installed and repaired. We work with shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed, and walk you through the choices before anything starts.",
      includes: ["Atlas", "GAF", "Malarkey", "CertainTeed"],
    },
    {
      name: "Tile roofing",
      slug: "tile-roofing",
      icon: ico("9572863c954a4054bd5adc4623d14c6d"),
      summary: "Tile roofing installed and repaired for homes that call for it.",
      body: "Tile roofing installed and repaired for homes that call for it. It starts with a free inspection and a clear estimate, and the owners oversee the work from start to finish.",
    },
    {
      name: "Metal roofing",
      slug: "metal-roofing",
      icon: ico("95483018a41541caaaa915ab92b06d7b"),
      summary: "Metal roofing for homes and businesses.",
      body: "Metal roofing for homes and businesses. We explain what we recommend and what it costs before you decide anything, then handle the installation.",
    },
    {
      name: "Commercial roofing",
      slug: "commercial-roofing",
      icon: ico("19a70e41a19a4956a4e7bc65928519c9"),
      summary: "Commercial roofing systems for business and property owners, held to the same owners-on-site standard.",
      body: "Commercial roofing systems for business and property owners, held to the same owners-on-site standard as our residential work. Free estimate and inspection come first, and everything after that is explained before it happens.",
    },
  ],
};

const generalContracting: Category = {
  name: "General contracting",
  slug: "general-contracting",
  eyebrow: "Remodeling, repairs and painting",
  heading: "General contracting in Denton and Collin Counties",
  intro: "Remodels, renovations, repairs and painting, all managed by one contractor so you get quality work, clear communication and no runaround.",
  heroImage: "/assets/original/860db2_38168d8edfe041ec9374b91f4d7da446.jpeg",
  services: [
    {
      name: "Remodeling",
      slug: "remodeling",
      summary: "Kitchens, bathrooms, living spaces and more, with every step handled.",
      body: "Remodeling services for kitchens, bathrooms, living spaces, and more. We handle every step, including demo, framing, drywall, flooring, trim, and finishes, so your project stays on track. Quality craftsmanship and honest communication from start to finish.",
      includes: ["Kitchens", "Bathrooms", "Living spaces", "Demo and framing", "Drywall and flooring", "Trim and finishes"],
    },
    {
      name: "Kitchen remodeling",
      slug: "kitchen-remodeling",
      summary: "A kitchen remodel built around how you live, from design to final cleanup.",
      body: "Transform your kitchen with a remodel built around how you live. We install cabinets, countertops, backsplashes, flooring, lighting, and fixtures, and can open up layouts for better flow. One contractor managing the whole project from design to final cleanup.",
      includes: ["Cabinets", "Countertops", "Backsplashes", "Flooring", "Lighting and fixtures", "Opened-up layouts"],
    },
    {
      name: "Bathroom remodeling",
      slug: "bathroom-remodeling",
      summary: "Full bathroom remodels from demo to final walkthrough.",
      body: "Full bathroom remodels from demo to final walkthrough. We handle showers, tubs, tile, vanities, fixtures, and lighting to give you a space that looks great and works better. From simple updates to complete gut jobs, we keep it clean, on schedule, and built to last.",
      includes: ["Showers and tubs", "Tile", "Vanities", "Fixtures", "Lighting", "Simple updates to full gut jobs"],
    },
    {
      name: "Home renovations",
      slug: "home-renovations",
      summary: "Renovations of any size, from a single room to a whole-house refresh.",
      body: "Ready to update your home? We handle renovations of any size, from a single room to a whole-house refresh. Flooring, drywall, trim, fixtures, and layout changes, all managed by one contractor so you get quality work, clear communication, and no runaround.",
      includes: ["Flooring", "Drywall", "Trim", "Fixtures", "Layout changes", "Single rooms to whole houses"],
    },
    {
      name: "Home repairs",
      slug: "home-repairs",
      summary: "The repairs that pile up around the house. No job too small.",
      body: "From drywall patches and door fixes to rotted trim, leaks, and fixtures that quit working, we take care of the repairs that pile up around the house. Reliable, honest service with quality workmanship. No job too small. Give us a call and check it off your list.",
      includes: ["Drywall patches", "Door fixes", "Rotted trim", "Leaks", "Fixtures that quit working"],
    },
    {
      name: "Painting",
      slug: "painting",
      summary: "Interior and exterior painting with proper prep and clean, sharp lines.",
      body: "Interior and exterior painting done right. We focus on proper prep, quality materials, and clean, sharp lines that hold up for years. Whether it is one room, a full repaint, or a fresh look outside, we deliver a professional finish at a fair price.",
      includes: ["Interior painting", "Exterior painting", "Proper prep", "Quality materials", "One room or a full repaint"],
    },
    {
      // The Google Business Profile lists this service as "Paint indoors".
      name: "Interior painting",
      slug: "interior-painting",
      summary: "Fresh paint for walls, ceilings, trim, doors and cabinets.",
      body: "Fresh interior paint for walls, ceilings, trim, doors, and cabinets. We protect your floors and furniture, repair drywall imperfections, and deliver crisp lines with a smooth, even finish. Fast, tidy work that makes any room feel brand new.",
      includes: ["Walls and ceilings", "Trim and doors", "Cabinets", "Drywall repair", "Floor and furniture protection"],
    },
    {
      name: "Exterior painting",
      slug: "exterior-painting",
      summary: "Protect your home and boost curb appeal with professional exterior painting.",
      body: "Protect your home and boost curb appeal with professional exterior painting. We pressure wash, scrape, caulk, and prime before applying quality paint to siding, trim, doors, and fences. Clean lines, durable finishes, and a crew that leaves your property spotless.",
      includes: ["Pressure washing", "Scraping and caulking", "Priming", "Siding and trim", "Doors and fences"],
    },
  ],
};

export const categories: Category[] = [roofing, generalContracting];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getService = (categorySlug: string, slug: string) =>
  getCategory(categorySlug)?.services.find((s) => s.slug === slug);

export const servicePath = (c: Category, s: Service) => `/${c.slug}/${s.slug}`;
