/**
 * Services offered, matching the Google Business Profile service list.
 * `summary` is the GBP description, used as written. Everything else is general, educational copy:
 * no prices, warranty terms or timelines unless they are already confirmed elsewhere on the site.
 */

const ico = (id: string) => `/assets/original/9a58ba_${id}.png`;

export const serviceGroups = [
  {
    id: "roofing",
    name: "Roofing",
    /** Singular form, for "Roofing services", "Gutter services". */
    noun: "Roofing",
    intro: "Residential and commercial roofing, from free inspections to full replacements.",
    title: "Roofing services in Denton and Collin Counties",
    lead: "Inspections, repairs and full replacements for homes and businesses. Shingle, tile and commercial roofs, with the owners overseeing every job.",
    meta: "Roof inspection, roof repair, storm damage repair and roof replacement for homes and businesses in Denton and Collin Counties. Shingle, tile and commercial roofing.",
    faqs: [
      ["Do you work on homes and businesses?", "Yes. We do residential roofing and commercial roofing for offices, retail centers, warehouses and other businesses."],
      ["What roofing materials do you work with?", "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed, tile roofing and commercial roofing systems."],
      ["How do I know if I need a repair or a new roof?", "The free inspection tells you. We explain what we found and what your options are. If a repair will do the job, we tell you."],
      ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
    ],
  },
  {
    id: "gutters",
    name: "Gutters",
    noun: "Gutter",
    intro: "Gutters that move water away from your roof, siding and foundation.",
    title: "Gutter services",
    lead: "Gutters move rainwater away from your roof, siding and foundation. We install new gutters, replace failing ones and clean clogged ones.",
    meta: "Gutter installation, gutter replacement and gutter cleaning in Denton and Collin Counties from Roofing Reformation.",
    faqs: [
      ["Do I need gutters?", "If water pours off your roof edge onto walkways or flower beds, or soil is washing out along the foundation, gutters help. They move water away from your roof edge, siding and foundation."],
      ["Install, replace or clean: which do I need?", "No gutters means installation. Sagging, rusted or pulling-away gutters usually need replacing. Gutters that are sound but overflowing usually just need cleaning."],
      ["Can you do gutters along with a new roof?", "Yes. We have replaced roofs and gutters together."],
    ],
  },
  {
    id: "skylights",
    name: "Skylights",
    noun: "Skylight",
    intro: "Skylight repair and replacement, with the flashing and seals done right.",
    title: "Skylight services",
    lead: "A skylight brings in natural light, but it is also an opening in your roof. We repair leaking skylights and replace ones that are past saving.",
    meta: "Skylight repair and skylight replacement in Denton and Collin Counties. Leaks, failed seals, cracked glass and worn flashing fixed.",
    faqs: [
      ["Should I repair or replace my skylight?", "If the unit is old, cloudy or cracked, replacement usually makes more sense. If only the seal or flashing has failed, a repair may be all it needs."],
      ["Why does my skylight leak?", "Often it is worn flashing or a failed seal around the unit, not the glass itself."],
      ["Should I replace my skylight when I replace my roof?", "It is often a good time, since the area around the skylight is already being worked on."],
    ],
  },
] as const;

export type ServiceGroup = (typeof serviceGroups)[number]["id"];

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  /** Shown on the homepage when set. */
  icon?: string;
  card: string;
  summary: string;
  signs: string[];
  includes: string[];
  faqs: [question: string, answer: string][];
  related: string[];
};

export const services: Service[] = [
  // Roofing
  {
    slug: "roof-inspection",
    name: "Roof inspection",
    group: "roofing",
    icon: ico("02d94148ce2848eab3db8a145bb5c221"),
    card: "Shingles, flashing, vents and decking checked, with honest recommendations.",
    summary:
      "Detailed roof inspections covering shingles, flashing, vents, and decking. We look for leaks, wear, and hidden damage, then give you honest recommendations on what needs attention and what doesn’t. Great for homeowners, home buyers, and after storms.",
    signs: [
      "A storm with hail or high wind just came through",
      "You are buying or selling a home",
      "You see water stains on a ceiling or in the attic",
      "Shingles look worn, curled or are missing",
      "Nobody has looked at your roof in years",
    ],
    includes: [
      "Shingles checked for wear, cracks, curling and missing pieces",
      "Flashing around chimneys, walls and skylights",
      "Vents and pipe boots",
      "Decking checked for soft spots and hidden damage",
      "A plain-English rundown of what needs attention and what does not",
    ],
    faqs: [
      ["Is the inspection free?", "Yes. The inspection and the estimate are free."],
      ["How long does it take?", "Plan on about an hour."],
      ["Should I get one before buying a house?", "It is a good idea. An inspection tells you what condition the roof is in before you commit, so a problem does not surprise you after closing."],
    ],
    related: ["roof-damage-repair", "storm-damage-roof-repair", "roof-replacement"],
  },
  {
    slug: "roof-damage-repair",
    name: "Roof damage repair",
    group: "roofing",
    icon: ico("940d1885006c4096bcc5918e4544dfc5"),
    card: "Leaks, missing shingles, cracked flashing and worn areas fixed at the source.",
    summary:
      "Fast, reliable roof damage repair for leaks, missing shingles, cracked flashing, and worn areas. We fix the problem at its source to protect your home and prevent bigger, costlier issues down the road. Call to schedule an inspection and repair.",
    signs: [
      "A leak or water stain inside",
      "Missing, cracked or lifted shingles",
      "Cracked or loose flashing",
      "Shingle granules collecting in gutters or at downspouts",
      "Worn spots on one part of the roof",
    ],
    includes: [
      "Finding where water is actually getting in",
      "Replacing damaged or missing shingles",
      "Resealing or replacing cracked flashing",
      "Repairing worn areas before they spread",
    ],
    faqs: [
      ["Do I need a repair or a new roof?", "If the damage is limited and the rest of the roof is in good shape, a repair usually does the job. The free inspection tells you which, and we explain why."],
      ["Why is the stain not right under the damage?", "Water can run along the decking or rafters before it drips. The stain on your ceiling can be several feet from where water gets in."],
      ["What does a repair estimate cost?", "Nothing. The inspection and the estimate are free."],
    ],
    related: ["roof-inspection", "storm-damage-roof-repair", "residential-roof-repair"],
  },
  {
    slug: "storm-damage-roof-repair",
    name: "Roof repair for storm and wind damage",
    group: "roofing",
    card: "Lifted, torn or missing shingles and debris damage secured and repaired.",
    summary:
      "Storm and wind damage roof repair for lifted, torn, or missing shingles, damaged flashing, and fallen-debris impact. We secure your roof quickly, document the damage, and make lasting repairs so your home stays protected.",
    signs: [
      "Shingles lifted, creased, torn or missing after high wind",
      "Shingle pieces or granules in the yard or gutters",
      "Dents or bruises from hail",
      "A tree limb or debris hit the roof",
      "A new leak after a storm",
    ],
    includes: [
      "Securing the roof to stop more water getting in",
      "Documenting the damage",
      "Replacing lifted, torn or missing shingles",
      "Repairing damaged flashing",
      "Repairing damage from fallen debris",
    ],
    faqs: [
      ["Does insurance cover storm damage?", "Often, depending on your policy and deductible. Check with your insurance company. We document the damage so you have it for your claim."],
      ["Do you offer emergency service?", "Yes. If a storm damages your roof, call us."],
      ["Should I get on the roof to check?", "No. A storm-damaged roof can be slick and unstable. Look from the ground and in the attic, then call for an inspection."],
    ],
    related: ["roof-inspection", "roof-damage-repair", "roof-replacement"],
  },
  {
    slug: "roof-replacement",
    name: "Roof replacement",
    group: "roofing",
    icon: ico("f07ab85f44824e918f61b9dcf74b37f2"),
    card: "Tear-off to cleanup: decking, underlayment, flashing and a new roof.",
    summary:
      "Full roof replacement done right, from tear-off and decking repair to underlayment, flashing, and new roofing installation. Durable materials and careful cleanup give your property lasting protection and curb appeal.",
    signs: [
      "Shingles curling, cracking or losing granules across the roof",
      "Leaks in more than one place",
      "Soft or sagging spots in the roof deck",
      "Repairs keep adding up on the same roof",
      "Storm damage across much of the roof",
    ],
    includes: [
      "Tearing off the old roof",
      "Repairing damaged decking",
      "New underlayment",
      "New flashing",
      "New roofing installed",
      "Careful cleanup",
    ],
    faqs: [
      ["How do I know if I need a new roof?", "Check the signs above. The free inspection gives you a straight answer, and if a repair will do, we tell you."],
      ["Do I get to choose the materials?", "Yes. We walk you through materials, designs and budget before anything starts."],
      ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
    ],
    related: ["residential-roof-replacement", "commercial-roof-replacement", "shingle-roofing"],
  },
  {
    slug: "shingle-roofing",
    name: "Shingle roofing",
    group: "roofing",
    icon: ico("7844bf9b136047e2883688d010f2cd4c"),
    card: "Asphalt shingles from Atlas, GAF, Malarkey and CertainTeed in a range of colors.",
    summary:
      "Professional shingle roofing installation and replacement in a range of colors. Asphalt shingles offer strong weather protection, lasting value, and great curb appeal for homes and small buildings.",
    signs: [
      "Your shingles are worn, curling or missing",
      "You are replacing a roof and want a proven option",
      "You want a new color or look for the house",
      "Storm damage has taken out part of the roof",
    ],
    includes: [
      "Help choosing a shingle and a color",
      "Installation or full replacement",
      "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed",
    ],
    faqs: [
      ["Which shingle brands do you install?", "Manufacturers including Atlas, GAF, Malarkey and CertainTeed."],
      ["Why are asphalt shingles so common?", "They give strong weather protection and good value, and they come in a wide range of colors."],
      ["Can you replace just a few shingles?", "Yes, when the damage is limited. That is a repair, not a replacement."],
    ],
    related: ["roof-replacement", "residential-roofing", "roof-damage-repair"],
  },
  {
    slug: "tile-roofing",
    name: "Tile roofing",
    group: "roofing",
    icon: ico("9572863c954a4054bd5adc4623d14c6d"),
    card: "Tile installed, repaired and replaced, including broken or slipped tile.",
    summary:
      "Tile roofing installation, repair, and replacement for homes and businesses. Tile delivers a long lifespan, strong weather resistance, and a distinctive look. We handle underlayment, flashing, and broken or slipped tile with care.",
    signs: [
      "Cracked, broken or slipped tiles",
      "A leak under a tile roof",
      "Worn-out underlayment beneath the tile",
      "You want a long-lasting roof with a distinctive look",
    ],
    includes: [
      "Tile installation and replacement",
      "Replacing broken or slipped tile",
      "Underlayment",
      "Flashing",
    ],
    faqs: [
      ["Why does my tile roof leak when the tiles look fine?", "Much of the waterproofing on a tile roof is the underlayment underneath. When it wears out, water can get through even if the tiles are whole."],
      ["Can I walk on my tile roof to check it?", "Better not. Tile can crack under foot traffic. Look from the ground and call for an inspection."],
      ["Do you do tile on commercial buildings?", "Yes. We install, repair and replace tile roofs for homes and businesses."],
    ],
    related: ["roof-damage-repair", "roof-replacement", "roof-inspection"],
  },
  {
    slug: "residential-roofing",
    name: "Residential roofing",
    group: "roofing",
    icon: ico("d3648d83c57c4c11ae489397ce15bff9"),
    card: "Inspections, repairs and replacements for homeowners, start to finish.",
    summary:
      "Residential roofing for homeowners who want a roof they can trust. Inspections, repairs, and replacements handled with clear communication, quality materials, and careful workmanship from start to finish.",
    signs: [
      "You want to know what shape your roof is in",
      "You have a leak or storm damage",
      "Your roof is getting old",
      "You are buying or selling a home",
    ],
    includes: [
      "Free roof inspections",
      "Roof repairs",
      "Full roof replacements",
      "Clear communication from start to finish",
    ],
    faqs: [
      ["Who will I deal with?", "The owners oversee every project and speak with every client."],
      ["Is the estimate free?", "Yes. The inspection and the estimate are free."],
      ["Do you do gutters too?", "Yes. We install, replace and clean gutters."],
    ],
    related: ["residential-roof-repair", "residential-roof-replacement", "roof-inspection"],
  },
  {
    slug: "residential-roof-replacement",
    name: "Residential roof replacement",
    group: "roofing",
    card: "Worn, leaking or storm-damaged home roofs replaced, tear-off to cleanup.",
    summary:
      "Residential roof replacement from tear-off to final cleanup. We replace worn, leaking, or storm-damaged roofs with quality materials, proper ventilation, and flashing to protect your home and boost curb appeal.",
    signs: [
      "Shingles curling or cracking across the roof",
      "Leaks in more than one room",
      "Storm damage across much of the roof",
      "Repair bills keep adding up",
    ],
    includes: [
      "Tear-off of the old roof",
      "Quality materials",
      "Proper attic ventilation",
      "New flashing",
      "Final cleanup",
    ],
    faqs: [
      ["Why does ventilation matter?", "Attic ventilation lets heat and moisture out. Without it, both build up under the roof and can shorten the life of the shingles and decking."],
      ["Do I get to choose the materials?", "Yes. We walk you through materials, designs and budget before anything starts."],
      ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
    ],
    related: ["roof-replacement", "shingle-roofing", "residential-roof-repair"],
  },
  {
    slug: "residential-roof-repair",
    name: "Residential roof repair",
    group: "roofing",
    card: "Leaks, damaged shingles, flashing and vents fixed, so a repair can save a replacement.",
    summary:
      "Residential roof repair for leaks, missing or damaged shingles, flashing, and vents. We find the cause, fix it properly, and help you avoid a full replacement when a repair will do the job.",
    signs: [
      "A leak or water stain inside",
      "Missing or damaged shingles",
      "Loose or cracked flashing",
      "A cracked vent or pipe boot",
    ],
    includes: [
      "Finding the cause of the leak",
      "Repairing shingles, flashing and vents",
      "A straight answer on whether a repair will do",
    ],
    faqs: [
      ["Will a repair do, or do I need a new roof?", "If the damage is limited and the rest of the roof is sound, a repair usually does the job. We tell you when it will."],
      ["What is a pipe boot?", "The rubber seal around plumbing vent pipes that come through the roof. They crack with age and sun, and they are a common source of small leaks."],
      ["Is the estimate free?", "Yes. The inspection and the estimate are free."],
    ],
    related: ["roof-damage-repair", "residential-roof-replacement", "roof-inspection"],
  },
  {
    slug: "commercial-roofing",
    name: "Commercial roofing",
    group: "roofing",
    icon: ico("19a70e41a19a4956a4e7bc65928519c9"),
    card: "Roofing systems for offices, retail centers, warehouses and other businesses.",
    summary:
      "Commercial roofing services for offices, retail centers, warehouses, and other businesses. We install, maintain, and repair roofing systems that protect your building, inventory, and operations with minimal disruption.",
    signs: [
      "Leaks over your workspace or inventory",
      "Water pooling on a flat or low-slope roof",
      "An aging roof you want to plan for",
      "You manage a property and need a roofer you can count on",
    ],
    includes: [
      "Installing roofing systems",
      "Maintenance",
      "Repairs",
      "Work planned to keep disruption to your business low",
    ],
    faqs: [
      ["What kinds of buildings do you work on?", "Offices, retail centers, warehouses and other businesses."],
      ["Can you work while we stay open?", "We plan the work to keep disruption to your business as low as possible."],
      ["Who oversees the job?", "The owners oversee every project from start to finish."],
    ],
    related: ["commercial-roof-repair", "commercial-roof-replacement", "roof-inspection"],
  },
  {
    slug: "commercial-roof-repair",
    name: "Commercial roof repair",
    group: "roofing",
    card: "Leaks, ponding water, flashing, seams and storm damage on commercial roofs.",
    summary:
      "Commercial roof repair for leaks, ponding water, damaged flashing, seams, and storm damage. Quick response keeps your business protected and helps extend the life of your existing roof before replacement is needed.",
    signs: [
      "Leaks or stained ceiling tiles",
      "Water that sits on the roof after rain",
      "Open or lifted seams",
      "Damaged flashing at walls, curbs or edges",
      "Storm damage",
    ],
    includes: [
      "Leak repair",
      "Fixing areas where water ponds",
      "Flashing and seam repair",
      "Storm damage repair",
    ],
    faqs: [
      ["What is ponding water?", "Water that stays on a flat or low-slope roof after rain. Over time it wears the roof and finds its way in."],
      ["Should we repair or replace?", "A timely repair can extend the life of your existing roof. If the roof is failing, we tell you plainly."],
      ["Do you offer emergency service?", "Yes. If a storm damages your roof, call us."],
    ],
    related: ["commercial-roofing", "commercial-roof-replacement", "storm-damage-roof-repair"],
  },
  {
    slug: "commercial-roof-replacement",
    name: "Commercial roof replacement",
    group: "roofing",
    card: "Aging or failing commercial roofs replaced, planned to limit downtime.",
    summary:
      "Commercial roof replacement for aging or failing roofs on businesses and properties. We tear off, prepare the deck, and install a durable new system, planned to limit downtime and protect your building for years.",
    signs: [
      "Leaks in several areas",
      "Repairs that keep coming back",
      "Ponding water across much of the roof",
      "A roof near the end of its life",
    ],
    includes: [
      "Tear-off of the old roof",
      "Deck preparation",
      "A durable new roofing system",
      "A plan built to limit downtime",
    ],
    faqs: [
      ["How do you limit downtime?", "We plan the job with you ahead of time, so the work fits around your business as much as possible."],
      ["Is the estimate free?", "Yes. The inspection and the estimate are free."],
      ["Who oversees the job?", "The owners oversee every project from start to finish."],
    ],
    related: ["commercial-roofing", "commercial-roof-repair", "roof-inspection"],
  },

  // Gutters
  {
    slug: "gutter-installation",
    name: "Gutter installation",
    group: "gutters",
    card: "New gutters sized and sloped so water drains away from your home.",
    summary:
      "Professional gutter installation for homes without gutters. We size and slope each run for proper drainage, so rainwater moves away from your roof, siding, and foundation and protects your property.",
    signs: [
      "Your home has no gutters",
      "Water pours off the roof edge onto walkways or flower beds",
      "Soil washing out along the foundation",
      "Water stains or rot on siding or fascia",
    ],
    includes: [
      "Sizing each gutter run",
      "Sloping each run toward the downspouts",
      "Downspouts that carry water away from the house",
    ],
    faqs: [
      ["Why do gutters matter?", "They move rainwater away from your roof, siding and foundation. Without them, water can damage all three."],
      ["What does sloping a gutter mean?", "Each run is pitched slightly toward a downspout, so water flows out instead of sitting in the gutter."],
      ["Can you do gutters along with a new roof?", "Yes. We have replaced roofs and gutters together."],
    ],
    related: ["gutter-replacement", "gutter-cleaning", "roof-replacement"],
  },
  {
    slug: "gutter-replacement",
    name: "Gutter replacement",
    group: "gutters",
    card: "Sagging, leaking, rusted or loose gutters replaced with a secure new system.",
    summary:
      "Gutter replacement for sagging, leaking, rusted, or pulling-away gutters. We remove the old system and install new gutters and downspouts with secure fastening and proper slope to protect your home from water damage.",
    signs: [
      "Gutters sagging or pulling away from the house",
      "Leaks at seams or corners",
      "Rust",
      "Water overflowing even when the gutters are clean",
    ],
    includes: [
      "Removing the old gutters",
      "New gutters and downspouts",
      "Secure fastening",
      "Proper slope",
    ],
    faqs: [
      ["Should I repair or replace my gutters?", "If they are sagging, rusted or pulling away in several places, replacement usually makes more sense than patching."],
      ["Why do gutters pull away from the house?", "Often from the weight of debris and standing water, or from fasteners working loose over time."],
      ["Can you replace gutters along with a roof?", "Yes. We have replaced roofs and gutters together."],
    ],
    related: ["gutter-installation", "gutter-cleaning", "roof-damage-repair"],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    group: "gutters",
    card: "Leaves and debris cleared from gutters and downspouts so water flows freely.",
    summary:
      "Gutter cleaning that clears leaves, dirt, and debris from gutters and downspouts so water flows freely. Regular cleaning helps prevent overflow, roof and fascia damage, foundation problems, and pest buildup.",
    signs: [
      "Gutters overflowing in the rain",
      "Plants growing in the gutters",
      "Gutters sagging under the weight",
      "Stains on the siding below the gutters",
    ],
    includes: [
      "Clearing leaves, dirt and debris from the gutters",
      "Clearing the downspouts",
      "Making sure water flows freely",
    ],
    faqs: [
      ["How often should gutters be cleaned?", "Many homes need it once or twice a year, and more often with trees nearby."],
      ["What happens if I skip it?", "Clogged gutters overflow. That can lead to roof and fascia damage, foundation problems and pests."],
      ["What if my gutters are past cleaning?", "If they are sagging, rusted or pulling away, we can replace them."],
    ],
    related: ["gutter-replacement", "gutter-installation", "roof-inspection"],
  },

  // Skylights
  {
    slug: "skylight-replacement",
    name: "Skylight replacement",
    group: "skylights",
    card: "Old, cloudy or leaking skylights replaced with new, energy-efficient units.",
    summary:
      "Old, cloudy, or leaking skylight? We remove the failing unit, inspect the opening, and install a new energy-efficient skylight with proper flashing and a watertight seal. More natural light, better efficiency, and no more drips or drafts. Fast, clean, done right.",
    signs: [
      "Cloudy or fogged glass",
      "Drips or stains around the skylight",
      "Drafts",
      "Cracked glass",
    ],
    includes: [
      "Removing the failing unit",
      "Inspecting the opening",
      "A new energy-efficient skylight",
      "Proper flashing and a watertight seal",
    ],
    faqs: [
      ["Why is my skylight cloudy?", "When the seal between the panes fails, moisture gets in and fogs the glass. That usually cannot be cleaned, so the unit needs replacing."],
      ["Should I replace it when I replace my roof?", "It is often a good time, since the area around the skylight is already being worked on."],
      ["Could a repair do instead?", "If the unit is in good shape and only the seal or flashing has failed, a repair may be enough. We tell you which."],
    ],
    related: ["skylight-repair", "roof-replacement", "roof-inspection"],
  },
  {
    slug: "skylight-repair",
    name: "Skylight repair",
    group: "skylights",
    card: "Leaks, cracked glass, failed seals and worn flashing fixed at the cause.",
    summary:
      "Leaks, cracked glass, failed seals, or worn flashing? We track down the cause and fix it right, not just cover it up. Resealing, reflashing, and repairs to stop water damage and keep your skylight working as it should. Honest assessments and quality work.",
    signs: [
      "Drips or water stains around the frame",
      "Cracked glass",
      "Fogging between the panes",
      "Worn or loose flashing",
    ],
    includes: [
      "Tracking down the cause",
      "Resealing",
      "Reflashing",
      "Repairs to stop water damage",
    ],
    faqs: [
      ["Why does my skylight leak?", "Often it is worn flashing or a failed seal around the unit, not the glass itself."],
      ["Should I repair or replace it?", "If the unit is old, cloudy or cracked, replacement usually makes more sense. If not, a repair may be all it needs."],
      ["Will you tell me if it just needs a small fix?", "Yes. You get an honest assessment."],
    ],
    related: ["skylight-replacement", "roof-damage-repair", "roof-inspection"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => `/services/${slug}`;
export const categoryHref = (id: ServiceGroup) => `/services/${id}`;
export const servicesIn = (id: ServiceGroup) => services.filter((s) => s.group === id);
