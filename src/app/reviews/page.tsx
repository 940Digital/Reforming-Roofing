import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reviews, reviews } from "@/components/Reviews";
import { InfoSection } from "@/components/InfoSection";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { abs, ids, pageGraph } from "@/config/schema";

export const metadata = metaFor("/reviews");

// Each point comes from the reviews shown above it.
const themes = [
  ["No roofing jargon", "Clients tell us they understood every step. We explain things in plain English."],
  ["Walked through the whole job", "From the first visit to the clean-up, there is someone to answer questions. The owners speak with every client."],
  ["A clean site", "We clean up after ourselves, and clients notice."],
];

// Text reviews only: they carry no star rating, so none is claimed.
const reviewNodes = reviews.map((r, i) => ({
  "@type": "Review",
  "@id": `${abs("/reviews")}#review-${i + 1}`,
  itemReviewed: { "@id": ids.business },
  author: { "@type": "Person", name: r.who },
  name: r.title,
  reviewBody: r.quote,
}));

export default function ReviewsPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/reviews", trail: ["/reviews"], extra: reviewNodes })} />
      <PageHero
        eyebrow="Reviews"
        title="What our clients say"
        intro="Real words from homeowners we have worked with."
      />
      <Reviews prev="#042d58" />
      <InfoSection eyebrow="What clients bring up" title="The same three things" bg="cream" prev="#f3eedf">
        <ul className="grid gap-8 md:grid-cols-3">
          {themes.map(([h, p], i) => (
            <Reveal as="li" key={h} delay={i * 0.07} className="border-t-4 border-red pt-5">
              <h3 className="font-display text-2xl uppercase tracking-wide text-navy">{h}</h3>
              <p className="mt-3 text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 max-w-3xl">
          <p className="text-lg leading-relaxed">Worked with us? We would be grateful if you told your neighbors.</p>
        </Reveal>
      </InfoSection>
      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
