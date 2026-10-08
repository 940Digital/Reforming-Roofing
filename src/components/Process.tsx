import Image from "next/image";
import { Reveal, Wipe } from "./Reveal";

const steps = [
  { h: "Free inspection", p: "Call us. We come out, look at the roof and give you an honest assessment of its condition." },
  { h: "A plain-English plan", p: "No roofing jargon. We explain what we found, what your options are and what it costs before you decide anything." },
  { h: "The work", p: "The owners oversee the project from start to finish. You choose the materials and design. We handle the installation." },
  { h: "Clean-up and warranty", p: "We clean up after ourselves. The work is warranty-backed, and we stay reachable after the job is done." },
];

export function Process() {
  return (
    <section id="how-it-works" className="dark-ground slant bg-navy pb-0 text-white" style={{ ["--prev" as string]: "#f3eedf" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:px-8 md:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-white [--marker:#b42335]">How it works</p>
            <h2 className="h-display mt-4 text-4xl md:text-6xl">Four steps. No surprises.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90">
              Free estimate and inspection come first. Everything after that is explained before it happens.
            </p>
          </Reveal>
          <Wipe className="relative mt-8 aspect-[820/565] w-full max-w-md bg-blue">
            <Image
              src="/assets/original/78fd08_ce8780ab4bd54a3cbc14efa7d6c23a02.png"
              alt="A hand holding a magnifying glass over a worn gray shingle on a roof during an inspection"
              fill
              sizes="(min-width:1024px) 30vw, 90vw"
              className="object-cover"
            />
          </Wipe>
        </div>

        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.h} delay={(i % 2) * 0.08} className="border-t-4 border-red pt-5">
              <span className="font-display text-6xl leading-none text-[#ff9aa7]" aria-hidden>{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide">{s.h}</h3>
              <p className="mt-2 text-lg leading-relaxed text-white/90">{s.p}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="relative h-48 w-full md:h-64">
        <Image
          src="/assets/original/860db2_b2a1fff6e5b143d48b4c59099ead2d84.jpeg"
          alt="Gloved hands setting an asphalt shingle into place on a roof, shown in navy tone"
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%]"
        />
      </div>
    </section>
  );
}
