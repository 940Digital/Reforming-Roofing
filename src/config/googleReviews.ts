/**
 * Google reviews from the older Roofing Reformation profile (the one with 27 reviews), copied by hand
 * on 2026-11-05 in Google's own "Most relevant" order. Text is verbatim apart from collapsed spacing.
 * Google only gives a relative age ("6 months ago"), so `date` is that age counted back from the copy
 * date, and the card turns it back into Google-style relative text.
 *
 * Not marked up as Review schema: Google's rules bar marking up reviews that live on another site.
 */
export type GoogleReview = {
  name: string;
  /** The line under the name, e.g. "Local Guide · 26 reviews · 5 photos". */
  meta: string;
  stars: number;
  /** Approximate, YYYY-MM. */
  date: string;
  text: string;
  /** Google cut the text off and the full review wasn't copied; the card links out for the rest. */
  truncated?: boolean;
  positive?: string;
  services?: string;
  /** Written by a relative of an owner. Kept off the site unless Owen says otherwise (FTC insider-review rule). */
  insider?: boolean;
};

export const googleProfile = {
  // Older profile with the reviews. The newer Pilot Point profile (cid 2917192926522942732) has 1.
  url: "https://www.google.com/maps?cid=6532997452404680633",
  rating: 5.0,
  count: 27,
  asOf: "2026-11-05",
};

const all: GoogleReview[] = [
  {
    name: "Greg and Karla Johnson",
    meta: "1 review",
    stars: 5,
    date: "2026-05",
    text: "We have known Jeremy for many years, and our experience with him has been nothing short of exceptional. After hail damage, he replaced our roof years ago with outstanding workmanship, and ever since, he has been our first call whenever severe weather hits. Jeremy consistently takes the time to come out, thoroughly inspect everything, and give his honest, expert opinion. He truly treats your home as if it were his own and never pressures you into unnecessary work. His integrity, professionalism, and genuine care are rare and deeply appreciated. We trust Jeremy completely and highly recommend him.",
  },
  {
    name: "Regan Reed",
    meta: "5 reviews · 2 photos",
    stars: 5,
    date: "2025-11",
    text: "We have known Jeremy for a long time and only recently found out he was part of a roofing company. He’s not one of those roofers that tells you within 30 seconds that he’s a roofer. He first connected us with a paint and trim person that replaced and fixed wood pieces and painted.\n\nThen the roofing team came and were very punctual (early actually) everyday. Jeremy came out to the house multiple times during the project to make adjustments and check on progress and we were able to add gutters, ridge vents, whirlybirds, and replaced our skylight!\n\nOur whole roof system looks better than it did when we built the house. A whole new curb appeal thanks to Jeremy and team.",
  },
  {
    name: "Ross Deter",
    meta: "3 reviews",
    stars: 5,
    date: "2026-05",
    text: "This is one of the most honest and easy to work with roofing companies you can ask for. And the relationship doesn’t just stop once the roof is put on. Jeremy has gone out of his way on multiple occasions to assist us with various things and check for damages after large storms. Highly recommend!",
  },
  {
    name: "Drew Kerestine",
    meta: "4 reviews",
    stars: 5,
    date: "2026-05",
    text: "The company is extremely professional and genuinely cares about doing what’s right—not just about making money. I highly recommend Jeremy and the team and will use them again for my next roof. They have completed my last two roofs at different homes.",
  },
  {
    name: "Jason Holecek",
    meta: "2 reviews",
    stars: 5,
    date: "2026-05",
    text: "I’d definitely recommend Roofing Reformation if you’re looking for a roofing company you can trust. They’re a local, veteran-operated business, and you can really tell they take pride in what they do.\nFrom the start, their team is easy to work with and keeps things straightforward. They explain everything clearly, don’t try to upsell you on things you don’t need, and just handle the job the right way. Whether it’s a repair or a full roof replacement, they show up, do solid work, and make sure you’re taken care of.",
  },
  {
    name: "Cameron Richman",
    meta: "5 reviews · 6 photos",
    stars: 5,
    date: "2026-05",
    text: "Loved working with Roofing Reformation. The communication was great and they have exceeded my expectations.",
  },
  {
    name: "Kristen Dolan",
    meta: "2 reviews",
    stars: 5,
    date: "2026-05",
    text: "Jeremy and his crew are awesome! Our roof is great.",
  },
  {
    name: "Susan Blessing",
    meta: "12 reviews",
    stars: 5,
    date: "2022-11",
    text: "I could not have had a better experience with Roofing Reformation! They were so quick and efficient, and Ryan Gentry really took the time to sit down and explain answers to all of my questions. He explained each step in the process and maintained very good communication with me so I knew what to expect. He also returned to my home after the work was completed to inspect and make sure everything was complete and correct. The new roof and gutters look amazing! It made my house look fresh and updated!",
    positive: "Responsiveness, Punctuality, Quality, Professionalism",
    services: "Attic venting, Gutter installation, Roof installation",
  },
  {
    name: "Elijah Flores",
    meta: "8 reviews",
    stars: 5,
    date: "2025-11",
    text: "Man let me tell you!!! Jeremy was so accommodating and explained everything in the easiest way to understand (no roofing jargon). He just came out a year later to check on vent of issue the next day after a text. Showed up, fixed it and was on his way ☺️\n\nI highly recommend this roofing company over any other. I have had probably 5 others quote and not able to do anything. I was ghosted. I even had Jeremy do one of my rental properties!!!",
  },
  {
    name: "Brad Kelley",
    meta: "8 reviews",
    stars: 5,
    date: "2024-11",
    text: "I’m a realtor and we needed a roof done quickly to close on time. Jeremy and Landry were awesome to work with. Fast responses through the whole process, great work done quickly, and easy to deal with. Highly recommended if you want a reputable and professional roofer!",
  },
  {
    name: "Scott and Sharla Reynolds",
    meta: "10 reviews · 2 photos",
    stars: 5,
    date: "2023-11",
    text: "Wow! Amazing experience with this company! Ryan Gentry took care of us from beginning to end. Communication, service and the work they did was fantastic. I can’t imagine anyone doing a better job. I will absolutely be using this company again if we need anything in the future and highly recommend them.",
  },
  {
    name: "David Sanford",
    meta: "12 reviews",
    stars: 5,
    date: "2023-11",
    text: "We suffered wind and hail damage to our roof and rain gutters. Jeremy Morphis was there to walk us through the entire process of the roof and gutter replacement. We cannot say enough about his attention to every detail. Roofing Reformation delivered a high quality product, installation and clean up. I would recommend them to anyone.",
    positive: "Responsiveness, Punctuality, Quality, Professionalism, Value",
    services: "Gutter installation, Roof inspection, Roof installation, Roof repair for storm & wind damage",
  },
  {
    name: "Susan Godwin",
    meta: "11 reviews",
    stars: 5,
    date: "2023-11",
    text: "I called Roofing Reformation about a problem with my roof. Talked to Jeremy Morphis. He told me he would be here the next morning. Accessed the problem and made the repair. I was so impressed with his professionalism, being on time, and fixing the problem. That I will call no one else to replace my roof or fix another problem. And he did an inspection of my roof!",
    positive: "Responsiveness, Punctuality, Quality, Professionalism, Value",
    services: "Roof inspection, Roof repair",
  },
  {
    name: "Cheryl Christ",
    meta: "Local Guide · 26 reviews · 5 photos",
    stars: 5,
    date: "2023-11",
    text: "Great company! They came out the same day we called to look at our roof and told us we did not need a new roof yet. They are honest, knowledgeable and even more importantly they are local, and will be here when we need them.",
  },
  {
    name: "MK S",
    meta: "Local Guide · 45 reviews · 18 photos",
    stars: 5,
    date: "2022-11",
    text: "Roofing Reformation met and exceeded my expectations. Like many in the area, we suffered hail damage during recent storms. RR inspected the damage, helped us with the claim process, and a rep was onsite when the insurance adjuster arrived.",
    truncated: true,
  },
  {
    name: "Monica Morphis",
    meta: "4 reviews · 3 photos",
    stars: 5,
    date: "2026-05",
    text: "Great company to work with! Super clean!",
    insider: true,
  },
  {
    name: "Robert White",
    meta: "2 reviews",
    stars: 5,
    date: "2022-11",
    text: "The service provided and quality of work was excellent. They were great with the work product and extra effort to ensure all was sealed well and looked good. Their cleanup once the job was completed was very thorough!",
    positive: "Responsiveness, Punctuality, Quality, Professionalism, Value",
    services: "Roof installation, Roof repair, Roof repair for storm & wind damage",
  },
];

export const googleReviews = all.filter((r) => !r.insider);

/** Google's wording for a review's age: "6 months ago", "a year ago", "3 years ago". */
export function reviewAge(date: string, now = new Date()) {
  const [y, m] = date.split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  if (months < 1) return "this month";
  if (months === 1) return "a month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "a year ago" : `${years} years ago`;
}
