import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Area } from "@/components/Area";
import { Neighborhood } from "@/components/Neighborhood";
import { cities, cityHref } from "@/config/cities";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { itemList, pageGraph } from "@/config/schema";

export const metadata = metaFor("/service-area");

const faqs: [string, string][] = [
  ["My town is not listed. Can you still come out?", "Text or call and ask. We will tell you straight whether we can get to you."],
  ["Which counties do you cover?", "Mostly Denton County and Collin County, plus Gunter in Grayson County. Every town we serve has its own page, linked above."],
  ["What if a storm damages my roof?", "Text or call us. We offer emergency roofing service."],
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
      <Neighborhood prev="#fffdf2" />
      <Faq items={faqs} bg="paper" prev="#042d58" />
      <FinalCta />
    </PageShell>
  );
}
