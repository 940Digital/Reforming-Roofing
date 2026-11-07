import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { people } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { featured } from "@/config/work";
import { JsonLd } from "@/components/JsonLd";
import { abs, ids, pageGraph } from "@/config/schema";

export const metadata = metaFor("/about");

/**
 * What a homeowner can count on, each backed by a line from a real Google review
 * (verbatim, from src/config/googleReviews.ts). Keep it that way: no reason without a quote.
 */
const reasons = [
  {
    h: "Straight answers",
    p: "If your roof has years left, we tell you. You only pay for work the roof actually needs.",
    q: "They came out the same day we called to look at our roof and told us we did not need a new roof yet.",
    by: "Cheryl Christ",
  },
  {
    h: "Plain English",
    p: "We show you what we found and explain each step, so the decision is easy to make.",
    q: "Explained everything in the easiest way to understand (no roofing jargon).",
    by: "Elijah Flores",
  },
  {
    h: "On time, every day",
    p: "We keep the times we set and keep you posted while the work is underway.",
    q: "The roofing team came and were very punctual (early actually) everyday.",
    by: "Regan Reed",
  },
  {
    h: "Storm damage help",
    p: "After hail or wind, we inspect the damage and walk you through what comes next.",
    q: "RR inspected the damage, helped us with the claim process, and a rep was onsite when the insurance adjuster arrived.",
    by: "MK S",
  },
  {
    h: "A clean site",
    p: "When the roof is done, the mess goes with us.",
    q: "Roofing Reformation delivered a high quality product, installation and clean up.",
    by: "David Sanford",
  },
  {
    h: "Here after the job",
    p: "Our roofing work is warranty-backed, and we still pick up when you text a year later.",
    q: "The relationship doesn’t just stop once the roof is put on.",
    by: "Ross Deter",
  },
];

// Four, so they sit in an even 2x2. The free inspection is offered in the CTA right below.
const facts = ["Veteran-owned", "Since 2019", "Insured", "Emergency service"];

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
        eyebrow="About"
        title="Why homeowners hire us"
        intro="Six things you can count on when you call us, each one in a client's own words."
        image={featured[0]}
      />

      <section className="slant bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-red">Why us</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">What you can count on</h2>
          </Reveal>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.h} delay={(i % 3) * 0.06} className="cut flex flex-col bg-paper p-7">
                <span className="font-display text-4xl leading-none text-red" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-navy">{r.h}</h3>
                <p className="mt-2 text-lg leading-relaxed">{r.p}</p>
                <figure className="mt-6 border-l-4 border-red pl-4 pt-1 md:mt-auto md:pt-6">
                  <blockquote className="leading-relaxed text-navy">&ldquo;{r.q}&rdquo;</blockquote>
                  <figcaption className="mt-2 text-sm font-medium uppercase tracking-wider text-ink/70">
                    {r.by}, Google review
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#fffdf2" }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <Reveal>
              <p className="eyebrow text-red">Team</p>
              <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Who you will deal with</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">
                The owners oversee every project and speak with every client. Faith and integrity run the company.
              </p>
            </Reveal>
            <Reveal>
              <ul className="grid grid-cols-2 gap-2" aria-label="Quick facts">
                {facts.map((f) => (
                  <li key={f} className="flex items-center justify-center bg-navy px-3 py-3 text-center font-display text-sm uppercase tracking-[0.1em] text-white sm:text-base">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {people.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.08} className="flex gap-5 bg-white p-5">
                <div className="relative h-24 w-24 shrink-0 bg-navy md:h-28 md:w-28">
                  <Image src={p.src} alt={p.alt} fill sizes="112px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-navy">{p.name}</h3>
                  {p.role && <p className="eyebrow mt-1 text-[0.8rem] text-red">{p.role}</p>}
                  <p className="mt-2 leading-relaxed">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </PageShell>
  );
}
