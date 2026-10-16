import { Band } from "./Band";
import { Marker, Unfold } from "./Motion";

const steps = [
  { h: "Free inspection", p: "We come out, look at the roof and tell you what we see." },
  { h: "A plain-English plan", p: "What we found, your options and the cost. No jargon, no pressure." },
  { h: "The work", p: "The owners oversee it start to finish. You choose materials and design." },
  { h: "Clean-up and warranty", p: "We leave the property clean. The work is warranty-backed, and we stay reachable." },
];

export function Process() {
  return (
    <section aria-labelledby="process-h">
      <Band id="how-it-works" n="03" label="How it works" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Unfold>
          <h2 id="process-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            How a job runs
          </h2>
        </Unfold>
        <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-[18px] right-0 top-[18px] hidden h-px bg-hair lg:block" aria-hidden />
          {steps.map((s, i) => (
            <Unfold as="li" key={s.h} delay={i * 0.1} className="relative">
              <Marker n={i + 1} />
              <h3 className="mt-5 text-xl font-bold">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-navy/80">{s.p}</p>
            </Unfold>
          ))}
        </ol>
      </div>
    </section>
  );
}
