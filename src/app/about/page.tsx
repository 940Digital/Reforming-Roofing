import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { About } from "@/components/About";
import { InfoSection } from "@/components/InfoSection";
import { Why } from "@/components/Why";
import { Team, people } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { abs, ids, pageGraph } from "@/config/schema";

export const metadata = metaFor("/about");

const story = [
  "Rob Vaughan and Jeremy Morphis worked alongside each other for years before they started Roofing Reformation. Rob is a real estate broker and listing agent. Jeremy is an experienced roofer and project manager.",
  "They started the company to give people a better roofing experience: honest answers, plain English, and owners who stay involved.",
  "Today we do residential roofing across Denton and Collin Counties. We also do siding, gutters and skylights.",
];

const personNodes = people.map((p) => ({
  "@type": "Person",
  "@id": ids.person(p.name),
  name: p.name,
  ...(p.role ? { jobTitle: p.role } : {}),
  description: p.note,
  image: abs(p.src),
  worksFor: { "@id": ids.business },
  url: abs("/about#team"),
}));

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/about", type: "AboutPage", trail: ["/about"], extra: personNodes })} />
      <PageHero
        eyebrow="About us"
        title="A local, veteran-owned roofing company"
        intro="Roofing Reformation has served homeowners in Denton and Collin Counties since 2019. Here is who we are and how we work."
      />
      <About prev="#042d58" />
      <InfoSection eyebrow="Our story" title="A broker and a roofer" bg="paper" prev="#fffdf2">
        <div className="max-w-3xl space-y-5">
          {story.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </InfoSection>
      <Why prev="#f3eedf" />
      <Team prev="#fffdf2" />
      <FinalCta />
    </PageShell>
  );
}
