import Image from "next/image";
import { Reveal } from "./Motion";

const steps = [
  { h: "Free inspection", p: "We come out, look at the roof and tell you honestly what we see." },
  { h: "A plain-English plan", p: "What we found, your options and the cost. No jargon, no pressure." },
  { h: "The work", p: "The owners oversee it from the first shingle to the last. You choose materials and design." },
  { h: "Clean-up and warranty", p: "We leave the property clean. The work is warranty-backed and we stay reachable." },
];

export function Process() {
  return (
    <section id="how-it-works" className="section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="peg-label">How it works</p>
            <h2 className="h2 mt-6">Four steps, explained before they happen.</h2>
            <p className="lede mt-6">The inspection and the estimate are free. You decide after you understand.</p>
          </Reveal>
          <Reveal className="frame relative aspect-[820/565] w-full">
            <Image
              src="/assets/original/78fd08_ce8780ab4bd54a3cbc14efa7d6c23a02.png"
              alt="A hand holding a magnifying glass over a worn gray shingle during a roof inspection"
              fill
              sizes="(min-width:1024px) 35vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.h} delay={i * 0.12} className="border-t border-navy/30 pt-6">
              <span className="font-serif text-4xl italic text-red" aria-hidden>{i + 1}</span>
              <h3 className="mt-4 font-serif text-[1.45rem]">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-navy/75">{s.p}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
