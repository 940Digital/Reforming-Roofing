import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { InfoSection } from "@/components/InfoSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/config/meta";

export const metadata = pageMeta(
  "/services",
  "Roofing Services in Denton & Collin County | Roofing Reformation",
  "Roof inspection, repair and replacement, storm damage repair, shingle, tile and commercial roofing, plus gutters and skylights in Denton and Collin Counties.",
);

const signs = [
  {
    h: "A repair usually makes sense when",
    items: [
      "A few shingles are missing or damaged after a storm",
      "One leak shows up in one spot",
      "The flashing around a chimney, vent or wall has pulled loose",
      "The rest of the roof is in good shape",
    ],
  },
  {
    h: "A replacement is worth talking about when",
    items: [
      "Shingles are curling, cracking or losing granules across the roof",
      "Leaks show up in more than one place",
      "The roof deck feels soft or looks like it sags",
      "You keep paying for repairs on the same roof",
    ],
  },
];

const faqs: [string, string][] = [
  ["Do you work on homes and businesses?", "Yes. We do residential roofing and commercial roofing systems for business and property owners."],
  ["What shingle brands do you install?", "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed."],
  ["Do you do anything besides roofs?", "Yes. We also do siding, gutters and skylights."],
  ["What if a storm damages my roof?", "Call us. We offer emergency roofing service."],
  ["What does an estimate cost?", "Nothing. The inspection and the estimate are free."],
  ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Roofing services for homes and businesses"
        intro="Free inspections, repairs and replacements for shingle, tile and commercial roofs, plus gutters and skylights. Across Denton and Collin Counties."
      />
      <ServiceCatalog prev="#042d58" />
      <InfoSection eyebrow="Repair or replace?" title="Signs to look for" bg="cream" prev="#f3eedf">
        <div className="grid gap-6 md:grid-cols-2">
          {signs.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.08} className="border-t-4 border-red bg-tint p-6 md:p-8">
              <h3 className="font-display text-2xl uppercase tracking-wide text-navy">{s.h}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed marker:text-red">
                {s.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed">
            You don&apos;t have to figure this out alone. The free inspection tells you which one your roof needs, and we explain why.
          </p>
        </Reveal>
      </InfoSection>
      <Faq items={faqs} bg="paper" prev="#fffdf2" />
      <FinalCta />
    </PageShell>
  );
}
