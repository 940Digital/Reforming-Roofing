import Image from "next/image";
import { Band } from "./Band";
import { Unfold } from "./Motion";

const reasons = [
  { icon: "9a58ba_8960ce4be5f54d8690719781cb5c6cb2", h: "Local and veteran-owned", p: "A veteran-owned business serving the community it lives in." },
  { icon: "9a58ba_962f198ac9cb464b806e7d7f4d44d57f", h: "Insured and experienced", p: "You can have confidence in the team you call." },
  { icon: "9a58ba_256022f3317b46a4ae61f5b00fcd9419", h: "A personal approach", p: "We take the time to understand your roof and what you need from it." },
  { icon: "860db2_35e8da79c9b54c52bfd695c11d445bf6", h: "Emergency service", p: "When a storm does damage, call. Emergency roofing service is available." },
];

export function Why() {
  return (
    <section aria-labelledby="why-h">
      <Band id="why-us" n="04" label="Why us" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Unfold>
            <h2 id="why-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
              Run on a good name
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-navy/80">
              Faith and integrity set the rules here: honest assessments, kept commitments, and work the owners stand behind.
            </p>
          </Unfold>
          <Unfold delay={0.1}>
            <blockquote className="border-l-4 border-red bg-white p-7 md:p-9">
              <p className="text-[1.45rem] font-semibold leading-snug md:text-[1.75rem]">
                &ldquo;A good name is to be chosen rather than great riches, loving favor rather than silver and gold.&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-red">Proverbs 22:1</footer>
            </blockquote>
          </Unfold>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Unfold as="li" key={r.h} delay={(i % 4) * 0.07} className="bg-white p-6">
              <span className="grid h-11 w-11 place-items-center bg-navy">
                <Image src={`/assets/original/${r.icon}.png`} alt="" width={26} height={26} className="invert" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{r.h}</h3>
              <p className="mt-1.5 leading-relaxed text-navy/80">{r.p}</p>
            </Unfold>
          ))}
        </ul>
      </div>
    </section>
  );
}
