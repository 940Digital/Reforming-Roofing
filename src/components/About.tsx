import Image from "next/image";
import { Reveal, Wipe } from "./Reveal";

const ideas = [
  {
    h: "What we do",
    p: "We repair, replace and install roofs on homes and commercial buildings. Shingle, tile, metal and commercial systems. Residential roof replacement in Denton, TX is our most common call, and we work across Collin County too.",
  },
  {
    h: "Why us",
    p: "The owners oversee every project and speak with every client. Nobody hands you off to a stranger. You get plain English and no pressure.",
  },
  {
    h: "Proof",
    p: "Veteran-owned and serving homeowners and businesses since 2019. Every job is warranty-backed. The reviews further down are real, and so are the roofs.",
  },
];

const stats = [
  { n: "2019", l: "Serving the area since" },
  { n: "Free", l: "Inspection and estimate" },
  { n: "Owners", l: "On every project" },
];

export function About() {
  return (
    <section id="about" className="slant bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-red">About Roofing Reformation</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Two owners. Every roof.</h2>
          </Reveal>

          <ol className="mt-10 space-y-8">
            {ideas.map((i, idx) => (
              <Reveal as="li" key={i.h} delay={idx * 0.08} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-display text-5xl leading-none text-red md:text-6xl" aria-hidden>0{idx + 1}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-navy">{i.h}</h3>
                  <p className="mt-2 text-lg leading-relaxed">{i.p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-6">
          <Wipe className="cut relative aspect-square w-full bg-navy">
            <Image
              src="/assets/original/860db2_ee80d5d1f27148bf8f8609523891c805.png"
              alt="Aerial view of a brick and stone home with a freshly finished gray shingle roof in a Texas neighborhood"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Wipe>
          <Reveal>
            <dl className="grid grid-cols-3 gap-px bg-navy/20">
              {stats.map((s) => (
                <div key={s.l} className="flex flex-col-reverse bg-tint px-3 py-5 text-center">
                  <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-ink/80 md:text-sm">{s.l}</dt>
                  <dd className="font-display text-3xl uppercase leading-none text-navy md:text-4xl">{s.n}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
