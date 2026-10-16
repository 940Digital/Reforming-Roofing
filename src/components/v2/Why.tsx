import { PegRail, Reveal } from "./Motion";

const reasons = [
  { h: "Local and veteran-owned", p: "A veteran-owned business serving the community it lives in." },
  { h: "Faith and integrity", p: "Honest assessments, kept commitments, and work we stand behind." },
  { h: "Owners who answer to you", p: "The people who run the company oversee your project." },
  { h: "A personal approach", p: "Your roof is never one more job in a line. We take time to understand it." },
];

export function Why() {
  return (
    <section id="why-us" className="section bg-paper">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="peg-label justify-center">Why Roofing Reformation</p>
          <blockquote className="mt-10">
            <p className="font-serif text-[1.9rem] italic leading-snug md:text-[2.6rem]">
              &ldquo;A good name is to be chosen rather than great riches, loving favor rather than silver and gold.&rdquo;
            </p>
            <footer className="mt-6 text-sm uppercase tracking-[0.22em] text-navy/60">Proverbs 22:1</footer>
          </blockquote>
          <h2 className="mt-12 font-serif text-2xl md:text-3xl">The verse the company is run by.</h2>
        </Reveal>

        <PegRail className="mt-16 !max-w-3xl" />

        <ul className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.h} delay={i * 0.1} className="text-center">
              <h3 className="font-serif text-xl">{r.h}</h3>
              <p className="mt-2 leading-relaxed text-navy/75">{r.p}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
