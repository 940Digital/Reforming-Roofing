import Image from "next/image";
import { Reveal } from "./Reveal";

const icon = (id: string) => `/assets/original/${id}.png`;

const reasons = [
  { icon: icon("9a58ba_8960ce4be5f54d8690719781cb5c6cb2"), h: "Local and veteran-owned", p: "A proud, veteran-owned business serving its own community." },
  { icon: icon("9a58ba_256022f3317b46a4ae61f5b00fcd9419"), h: "A personalized approach", p: "Your roof is not one more job in a line. We take the time to understand what you need." },
  { icon: icon("9a58ba_962f198ac9cb464b806e7d7f4d44d57f"), h: "Insured and experienced", p: "You can have confidence in the team you call." },
  { icon: icon("860db2_35e8da79c9b54c52bfd695c11d445bf6"), h: "Emergency service available", p: "When a storm does damage, call. We offer emergency roofing service." },
];

const promises = [
  ["Communicate", "Clients are kept informed at every step, with honest assessments and clear explanations."],
  ["Keep our word", "We show up at scheduled times and finish projects as promised."],
  ["Stay accountable", "We stand by our work, offer a warranty and answer the phone after the job."],
];

export function Why() {
  return (
    <section id="why-us" className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Why Roofing Reformation</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">A good name is the whole business</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Faith and integrity run the company. The principle behind how we work is Proverbs 22:1. It shapes how we treat clients, other businesses and insurance adjusters.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.h} delay={(i % 4) * 0.06} className="cut bg-paper p-6">
              <span className="grid h-12 w-12 place-items-center bg-navy">
                <Image src={r.icon} alt="" width={30} height={30} className="invert" />
              </span>
              <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-navy">{r.h}</h3>
              <p className="mt-2 leading-relaxed">{r.p}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <blockquote className="relative mt-14 border-l-8 border-red bg-tint px-6 py-8 md:px-10">
            <p className="font-display text-2xl uppercase leading-snug tracking-wide text-navy md:text-4xl">
              &ldquo;A good name is to be chosen rather than great riches, loving favor rather than silver and gold.&rdquo;
            </p>
            <footer className="mt-3 font-display uppercase tracking-[0.14em] text-red">Proverbs 22:1</footer>
          </blockquote>
        </Reveal>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {promises.map(([h, p], i) => (
            <Reveal as="li" key={h} delay={i * 0.07}>
              <h3 className="eyebrow text-navy [--marker:#095798]">{h}</h3>
              <p className="mt-3 text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
