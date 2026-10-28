import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Team } from "@/components/Team";
import { InfoSection } from "@/components/InfoSection";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/config/meta";

export const metadata = pageMeta(
  "/team",
  "Our Team | Roofing Reformation, Denton, TX",
  "Meet Rob Vaughan, Jeremy Morphis and Robert Hines of Roofing Reformation. The owners oversee every project and speak with every client.",
);

const founders = [
  {
    name: "Rob Vaughan",
    text: "Rob is a seasoned real estate broker and listing agent. He worked alongside Jeremy for years before they started the company together. He chose the verse the company runs on, Proverbs 22:1: a good name is worth more than great riches.",
  },
  {
    name: "Jeremy Morphis",
    text: "Jeremy is an experienced roofer and project manager. He is often the one walking clients through the job, and his is the name that comes up in reviews.",
    quote: ["Jeremy was so accommodating and explained everything in the easiest way.", "Elijah J."],
  },
];

export default function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our team"
        title="Meet the people behind your roof"
        intro="Roofing Reformation is owner-run. The owners oversee every project and speak with every client."
      />
      <Team prev="#042d58" />
      <InfoSection eyebrow="The co-founders" title="Two backgrounds, one standard" bg="cream" prev="#f3eedf">
        <ul className="grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal as="li" key={f.name} delay={i * 0.08} className="cut bg-paper p-8">
              <h3 className="font-display text-3xl uppercase tracking-wide text-navy">{f.name}</h3>
              <p className="eyebrow mt-1 text-red">Co-founder</p>
              <p className="mt-4 text-lg leading-relaxed">{f.text}</p>
              {f.quote && (
                <blockquote className="mt-6 border-l-4 border-red pl-4">
                  <p className="text-lg italic leading-relaxed">&ldquo;{f.quote[0]}&rdquo;</p>
                  <footer className="mt-2 font-display uppercase tracking-[0.14em] text-red">{f.quote[1]}</footer>
                </blockquote>
              )}
            </Reveal>
          ))}
        </ul>
      </InfoSection>
      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
