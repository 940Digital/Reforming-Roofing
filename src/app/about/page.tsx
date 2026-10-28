import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { About } from "@/components/About";
import { InfoSection } from "@/components/InfoSection";
import { Why } from "@/components/Why";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/config/meta";

export const metadata = pageMeta(
  "/about",
  "About Us | Veteran-Owned Roofer in Denton, TX | Roofing Reformation",
  "Roofing Reformation is a local, veteran-owned roofing company serving Denton and Collin Counties since 2019. The owners oversee every project.",
);

const story = [
  "Rob Vaughan and Jeremy Morphis worked alongside each other for years before they started Roofing Reformation. Rob is a real estate broker and listing agent. Jeremy is an experienced roofer and project manager.",
  "They started the company to give people a better roofing experience: honest answers, plain English, and the owners on the job.",
  "Today we do residential and commercial roofing across Denton and Collin Counties. We also do siding, gutters and skylights.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="A local, veteran-owned roofing company"
        intro="Roofing Reformation has served homeowners and businesses in Denton and Collin Counties since 2019. Here is who we are and how we work."
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
      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
