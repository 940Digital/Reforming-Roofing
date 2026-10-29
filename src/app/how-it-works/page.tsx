import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { InfoSection } from "@/components/InfoSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/config/schema";

export const metadata = metaFor("/how-it-works");

const checks = [
  ["Shingles", "Missing, cracked, curling or worn down."],
  ["Flashing", "The metal around chimneys, vents, skylights and walls. Many leaks start here."],
  ["Vents and pipe boots", "The seals around anything that comes through the roof."],
  ["Gutters and downspouts", "Whether water is getting off the roof and away from the house."],
  ["Storm damage", "Signs of hail or wind."],
  ["Inside", "Water stains on ceilings or in the attic, if you have seen any."],
];

const faqs: [string, string][] = [
  ["How long does an inspection take?", "Plan on about an hour."],
  ["Does the inspection cost anything?", "No. The inspection and the estimate are free."],
  ["Do I have to decide on the spot?", "No. We explain what we found, what your options are and what it costs. Then you decide. No pressure."],
  ["Who runs the job?", "The owners oversee every project from start to finish."],
  ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
  ["What happens when the work is done?", "We clean up after ourselves. The work is warranty-backed, and we stay reachable after the job is done."],
];

export default function HowItWorksPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/how-it-works", trail: ["/how-it-works"], faqs })} />
      <PageHero
        eyebrow="How it works"
        title="From first call to finished roof"
        intro="Every job follows the same four steps. You know what is happening and what it costs before any work starts."
      />
      <Process prev="#042d58" />
      <InfoSection eyebrow="The free inspection" title="What a roof inspection looks at" bg="cream" prev="#042d58">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed">A good inspection covers more than the shingles. Here is what gets checked.</p>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map(([h, p], i) => (
            <Reveal as="li" key={h} delay={(i % 3) * 0.06} className="bg-tint p-6">
              <h3 className="font-display text-xl uppercase tracking-wide text-navy">{h}</h3>
              <p className="mt-2 leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed">
            After that, we tell you what we found in plain English. If something is not broken, we tell you that too.
          </p>
        </Reveal>
      </InfoSection>
      <Faq items={faqs} bg="paper" prev="#fffdf2" />
      <FinalCta />
    </PageShell>
  );
}
