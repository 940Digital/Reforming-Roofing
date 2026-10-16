import Image from "next/image";
import { Band } from "./Band";
import { Marker, Unfold } from "./Motion";
import { business } from "@/config/business";

// Written to be true whether or not the company handles insurance claims (see theme-option-3.md).
const steps = [
  { h: "Check from the ground", p: "Look for dented gutters, vents and downspouts, and shingle granules collecting in the gutters. Stay off the roof." },
  { h: "Get a local inspection", p: "Ours is free. We look at the roof and tell you honestly what we see, damage or not." },
  { h: "Call your insurance company", p: "Photograph everything first. Your policy and your adjuster decide what is covered." },
  { h: "Pick a contractor who stays", p: "Ask who owns the company, how long they have worked here, and who answers if something goes wrong later." },
];

export function Storm() {
  return (
    <section aria-labelledby="storm-h" className="bg-paper">
      <Band id="after-a-storm" n="02" label="After a storm" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <Unfold>
            <h2 id="storm-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
              Hail came through. Do this first.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy/80">
              North Texas storms bring out crews nobody has heard of. Four steps keep the decision in your hands.
            </p>
          </Unfold>
          <ol className="mt-10 grid gap-px border border-hair bg-hair">
            {steps.map((s, i) => (
              <Unfold as="li" key={s.h} delay={i * 0.08} className="flex gap-5 bg-white p-6">
                <Marker n={i + 1} />
                <div>
                  <h3 className="text-xl font-bold">{s.h}</h3>
                  <p className="mt-1.5 leading-relaxed text-navy/80">{s.p}</p>
                </div>
              </Unfold>
            ))}
          </ol>
        </div>
        <Unfold className="flex flex-col gap-px self-start border border-hair bg-hair">
          <div className="relative aspect-[820/565] bg-navy">
            <Image
              src="/assets/original/78fd08_ce8780ab4bd54a3cbc14efa7d6c23a02.png"
              alt="A hand holding a magnifying glass over a worn gray shingle during a roof inspection"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-navy p-7 text-cream">
            <p className="text-xl font-bold leading-snug">Roofing Reformation is local, veteran-owned and run by the people who answer for the work.</p>
            <p className="mt-3 text-cream/80">Emergency service is available.</p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="#request" className="bg-red px-5 py-3.5 text-center font-semibold text-white transition-colors hover:bg-[#8f1a2a]">Request a free inspection</a>
              <a href={business.phoneHref} className="whitespace-nowrap px-5 py-3.5 text-center font-semibold ring-1 ring-inset ring-cream/60 transition-colors hover:bg-cream hover:text-navy">Call {business.phoneDisplay}</a>
            </div>
          </div>
        </Unfold>
      </div>
    </section>
  );
}
