import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { Process } from "@/components/Process";
import { InfoSection } from "@/components/InfoSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { itemList, pageGraph, serviceItems } from "@/config/schema";
import { services } from "@/config/services";

export const metadata = metaFor("/services");

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
  ["What shingle brands do you install?", "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed."],
  ["Do you do anything besides roofs?", "Yes. We also do siding, gutters and skylights, plus remodeling, home repairs and painting."],
  ["What if a storm damages my roof?", "Text or call us. We offer emergency roofing service."],
  ["What does an estimate cost?", "Nothing. The inspection and the estimate are free."],
  ["Do I have to decide on the spot?", "No. We explain what we found, your options and the price. Then you decide."],
  ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
];

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/services", type: "CollectionPage", trail: ["/services"], faqs, mainEntity: itemList("/services", serviceItems(services)) })} />
      <PageHero
        eyebrow="Services"
        title="Roofing and home services"
        intro="Free inspections, repairs and replacements for shingle and tile roofs, plus gutters, skylights, remodeling, repairs and painting. Across Denton and Collin Counties."
      />
      <ServiceCatalog prev="#042d58" />
      <Process prev="#f3eedf" />
      <InfoSection eyebrow="Repair or replace?" title="Signs to look for" bg="cream" prev="#042d58">
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
