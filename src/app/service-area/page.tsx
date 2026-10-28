import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Area } from "@/components/Area";
import { Neighborhood } from "@/components/Neighborhood";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { pageMeta } from "@/config/meta";

export const metadata = pageMeta(
  "/service-area",
  "Service Area | Roofer in Denton, McKinney, Frisco & More | Roofing Reformation",
  "Roofing Reformation serves Denton and Collin Counties, including Denton, McKinney, Frisco, Prosper, Flower Mound, Lewisville and nearby cities.",
);

const faqs: [string, string][] = [
  ["My town is not listed. Can you still come out?", "Call and ask. We will tell you straight whether we can get to you."],
  ["Which counties do you cover?", "Denton County and Collin County, plus nearby cities like Southlake, Grapevine and Fort Worth."],
  ["What if a storm damages my roof?", "Call us. We offer emergency roofing service."],
];

export default function ServiceAreaPage() {
  return (
    <PageShell>
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
