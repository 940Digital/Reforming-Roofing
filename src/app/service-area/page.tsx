import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Area } from "@/components/Area";
import { Neighborhood } from "@/components/Neighborhood";
import { InfoSection } from "@/components/InfoSection";
import { Reveal } from "@/components/Reveal";
import { cities, cityHref, citiesByCounty } from "@/config/cities";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { itemList, pageGraph } from "@/config/schema";

export const metadata = metaFor("/service-area");

const faqs: [string, string][] = [
  ["My town is not listed. Can you still come out?", "Call and ask. We will tell you straight whether we can get to you."],
  ["Which counties do you cover?", "Mostly Denton County and Collin County, plus Gunter in Grayson County. Every town we serve has its own page below."],
  ["What if a storm damages my roof?", "Call us. We offer emergency roofing service."],
];

export default function ServiceAreaPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/service-area", type: "CollectionPage", trail: ["/service-area"], faqs, mainEntity: itemList("/service-area", cities.map((c) => ({ name: c.name, path: cityHref(c.slug) }))) })} />
      <PageHero
        eyebrow="Service area"
        title="Roofing in Denton and Collin Counties"
        intro="We are a local company. These are the communities we work in most."
      />
      <Area prev="#042d58" />
      <InfoSection eyebrow="By county" title="Every town we serve" bg="paper" prev="#fffdf2">
        <div className="grid gap-10 md:grid-cols-3">
          {citiesByCounty().map(({ county, list }, i) => (
            <Reveal key={county} delay={i * 0.06} className="border-t-4 border-red pt-5">
              <h3 className="font-display text-2xl uppercase tracking-wide text-navy">{county} County</h3>
              <ul className="mt-4 space-y-2 text-lg">
                {list.map((c) => (
                  <li key={c.slug}>
                    <a href={cityHref(c.slug)} className="text-blue underline decoration-2 underline-offset-4 hover:text-navy">{c.name}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </InfoSection>
      <Neighborhood prev="#f3eedf" />
      <Faq items={faqs} bg="paper" prev="#042d58" />
      <FinalCta />
    </PageShell>
  );
}
