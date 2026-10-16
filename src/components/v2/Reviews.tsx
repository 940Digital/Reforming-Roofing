import { PegRail, Reveal } from "./Motion";
import { business } from "@/config/business";

const reviews = [
  {
    title: "Impressive workmanship",
    quote: "Jeremy was so accommodating and explained everything in the easiest way (no roofing jargon). I highly recommend this roofing company over any other.",
    who: "Elijah J.",
  },
  {
    title: "They walked us through everything",
    quote: "Jeremy was there to walk us through the entire process of roof and gutter replacement. We cannot say enough about his attention to every detail. Roofing Reformation delivered a high-quality product, installation, and clean-up.",
    who: "David P.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <Reveal>
          <p className="peg-label">Reviews</p>
          <h2 className="h2 mt-6">What clients say once the job is done</h2>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-24">
          {reviews.map((r, i) => (
            <div key={r.who} className="space-y-20 md:space-y-24">
            {i > 0 && <PegRail className="!px-0" pegs={3} />}
            <Reveal as="figure" className={`max-w-3xl ${i % 2 ? "md:ml-auto" : ""}`}>
              <h3 className="text-sm uppercase tracking-[0.22em] text-red">{r.title}</h3>
              <blockquote className="mt-5 font-serif text-[1.55rem] leading-[1.45] md:text-[2rem]">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-4 text-navy/70">
                <span className="h-px w-10 bg-navy/40" aria-hidden />
                {r.who}
              </figcaption>
            </Reveal>
            </div>
          ))}
        </div>

        {business.reviewsUrl && (
          <Reveal className="mt-14">
            <a href={business.reviewsUrl} className="link">Read more reviews</a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
