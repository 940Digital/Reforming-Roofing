import { business } from "./business";
import { steps } from "./process";
import { allPages, pageAt, staticPages } from "./pages";
import { categoryHref, serviceGroups, serviceHref, servicesIn } from "./services";
import { cityHref, citiesByCounty } from "./cities";

/** llms.txt (https://llmstxt.org): a plain-text guide to the site for AI tools. */

const url = (path: string) => `${business.siteUrl}${path === "/" ? "" : path}`;
const link = (path: string) => {
  const p = pageAt(path);
  return `- [${p.name}](${url(path)}): ${p.description}`;
};

function header() {
  const profiles = [business.googleBusinessUrl && `Google Business Profile: ${business.googleBusinessUrl}`, business.social.instagram && `Instagram: ${business.social.instagram}`, business.social.facebook && `Facebook: ${business.social.facebook}`].filter(Boolean);
  return [
    `# ${business.name}`,
    "",
    `> Veteran-owned residential and commercial roofing contractor serving ${business.counties.join(" and ")}, Texas, since ${business.foundedYear}. Roof inspections, repairs and replacements for shingle, tile and commercial roofs, plus gutters, skylights, remodeling, home repairs and painting. The owners oversee every project and speak with every client.`,
    "",
    "## Key facts",
    "",
    `- Phone: ${business.phoneDisplay}`,
    `- Website: ${business.siteUrl}`,
    `- Service area: ${business.serviceAreas.length} towns in ${business.counties.join(" and ")}, Texas, and nearby: ${business.serviceAreas.join(", ")}. No street address; the team comes to you.`,
    "- Free roof inspection and estimate. An inspection takes about an hour.",
    "- Financing is available.",
    "- Emergency roofing service is available after storm damage.",
    "- Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed.",
    `- Co-founders: Rob Vaughan (real estate broker and listing agent) and Jeremy Morphis (experienced roofer and project manager).`,
    `- Tagline: "${business.tagline}" The company's guiding principle is Proverbs 22:1.`,
    ...profiles.map((p) => `- ${p}`),
  ];
}

export function llmsTxt() {
  const lines = [...header(), ""];
  for (const g of serviceGroups) {
    lines.push(`## ${g.noun} services`, "", `- [${g.title}](${url(categoryHref(g.id))}): ${g.intro}`);
    for (const s of servicesIn(g.id)) lines.push(`- [${s.name}](${url(serviceHref(s.slug))}): ${s.card}`);
    lines.push("");
  }
  lines.push("## Service area", "");
  for (const { county, list } of citiesByCounty()) {
    lines.push(`- ${county} County: ${list.map((c) => `[${c.name}](${url(cityHref(c.slug))})`).join(", ")}`);
  }
  lines.push("");
  lines.push("## Company", "", ...staticPages.map((p) => link(p.path)), "");
  lines.push("## Optional", "", `- [Full details](${business.siteUrl}/llms-full.txt): every service with what it includes, signs you need it, and FAQs.`, `- [Sitemap](${business.siteUrl}/sitemap.xml): all ${allPages.length} pages.`, "");
  return lines.join("\n");
}

export function llmsFullTxt() {
  const lines = [...header(), "", "## How a job works", ""];
  steps.forEach((s, i) => lines.push(`${i + 1}. ${s.h}: ${s.p}`));
  lines.push("");
  for (const g of serviceGroups) {
    lines.push(`## ${g.noun} services`, "", `URL: ${url(categoryHref(g.id))}`, "", g.lead, "");
    for (const [q, a] of g.faqs) lines.push(`Q: ${q}`, `A: ${a}`, "");
    for (const s of servicesIn(g.id)) {
      lines.push(`### ${s.name}`, "", `URL: ${url(serviceHref(s.slug))}`, "", s.summary, "", "Signs you need this:");
      lines.push(...s.signs.map((t) => `- ${t}`), "", "What the job includes:");
      lines.push(...s.includes.map((t) => `- ${t}`), "");
      for (const [q, a] of s.faqs) lines.push(`Q: ${q}`, `A: ${a}`, "");
    }
  }
  return lines.join("\n");
}
