import Image from "next/image";
import { Band } from "./Band";
import { Unfold } from "./Motion";
import { VideoModule } from "./VideoModule";
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

const gallery = [
  { src: "/assets/original/860db2_ee80d5d1f27148bf8f8609523891c805.png", alt: "Aerial view of a brick and stone home with a finished gray shingle roof in a Texas neighborhood" },
  { src: "/assets/original/9a58ba_684d4706b8f445d4b19388bc2bb86d69.png", alt: "Top-down aerial view of a two-story historic style home with a multi-gabled gray shingle roof and two chimneys" },
  { src: "/assets/original/9a58ba_c7219f7c60f847f88647c1bb1cea2964.png", alt: "Close aerial view of a complex gabled roof with dormers and chimneys covered in charcoal shingles" },
  { src: "/assets/original/860db2_cf892d60ac384833bfd92f879f2f16af.png", alt: "Aerial view of a finished gray shingle roof on a single-story home with mature trees and a curved walkway" },
];

export function Proof() {
  return (
    <section aria-labelledby="proof-h" className="bg-paper">
      <Band id="proof" n="05" label="Proof" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Unfold>
          <h2 id="proof-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            Real reviews. Real roofs.
          </h2>
        </Unfold>

        <div className="mt-10 grid gap-px border border-hair bg-hair md:grid-cols-2">
          {reviews.map((r, i) => (
            <Unfold as="figure" key={r.who} delay={i * 0.1} className="flex flex-col bg-white p-7 md:p-9">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-red">{r.title}</h3>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed md:text-xl">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 font-semibold">{r.who}</figcaption>
            </Unfold>
          ))}
        </div>
        {business.reviewsUrl && (
          <p className="mt-6"><a href={business.reviewsUrl} className="font-semibold text-blue underline">Read more reviews</a></p>
        )}

        <Unfold className="mt-16">
          <h3 className="text-2xl font-bold">See our roofs in your neighborhood</h3>
          <p className="mt-2 max-w-xl text-navy/80">Drone footage over roofs we have finished across Denton and Collin Counties.</p>
        </Unfold>
        <Unfold className="mt-6 border border-hair">
          <VideoModule
            src="/assets/original/video_9a58ba_99ef674890824d5fa106c485433f9406.mp4"
            poster="/assets/original/still_neighborhood-video_007s.jpg"
            posterAlt="Drone view of a newly roofed brick home with a pool, on a residential street"
          />
        </Unfold>
        <ul className="mt-px grid grid-cols-2 gap-px border border-t-0 border-hair bg-hair md:grid-cols-4">
          {gallery.map((g, i) => (
            <Unfold as="li" key={g.src} delay={i * 0.07} className="relative aspect-square bg-navy">
              <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
            </Unfold>
          ))}
        </ul>
      </div>
    </section>
  );
}
