import Image from "next/image";
import { Reveal } from "./Reveal";
import { business } from "@/config/business";

const reviews = [
  {
    title: "Impressive workmanship",
    quote:
      "Jeremy was so accommodating and explained everything in the easiest way (no roofing jargon). I highly recommend this roofing company over any other.",
    who: "Elijah J.",
  },
  {
    title: "They walked us through everything",
    quote:
      "Jeremy was there to walk us through the entire process of roof and gutter replacement. We cannot say enough about his attention to every detail. Roofing Reformation delivered a high-quality product, installation, and clean-up.",
    who: "David P.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="slant bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#fffdf2" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Proof</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Real reviews from real clients</h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.who} delay={i * 0.08}>
              <figure className="cut relative flex h-full flex-col bg-white p-8 md:p-10">
                <span className="absolute right-6 top-2 font-display text-8xl leading-none text-red/20" aria-hidden>&rdquo;</span>
                <figcaption className="font-display text-2xl uppercase tracking-wide text-navy md:text-3xl">{r.title}</figcaption>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed md:text-xl">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="mt-6 flex items-center gap-3 font-display uppercase tracking-[0.14em] text-red">
                  <span className="h-[3px] w-8 bg-red" aria-hidden />
                  {r.who}
                </p>
              </figure>
            </Reveal>
          ))}
        </ul>

        {business.reviewsUrl && (
          <Reveal className="mt-8">
            <a href={business.reviewsUrl} className="btn btn-navy">Read more reviews</a>
          </Reveal>
        )}

        <Reveal className="mt-14 flex justify-center">
          <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={96} height={91} />
        </Reveal>
      </div>
    </section>
  );
}
