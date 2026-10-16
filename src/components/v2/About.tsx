import Image from "next/image";
import { Reveal } from "./Motion";

const ideas = [
  {
    h: "What we do",
    p: "Repair, replacement, installation and inspection for homes and commercial buildings, in shingle, tile and metal. That includes residential roof replacement in Denton, TX and across Collin County.",
  },
  {
    h: "Why us",
    p: "The owners oversee every project and talk with every client directly. Nobody is handed off. Everything is explained in plain English.",
  },
  {
    h: "Proof",
    p: "Serving homeowners and businesses since 2019. Veteran-owned and insured. Every job is warranty-backed.",
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="peg-label">About the company</p>
            <h2 className="h2 mt-6">A roof gets done once. We do it carefully.</h2>
          </Reveal>
          <div className="mt-14 space-y-10">
            {ideas.map((i, n) => (
              <Reveal key={i.h} delay={n * 0.1} className="border-t border-rule pt-6">
                <h3 className="font-serif text-2xl">{i.h}</h3>
                <p className="mt-3 max-w-[34rem] text-lg leading-relaxed text-navy/80">{i.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="frame relative aspect-[4/5] w-full self-start lg:mt-24">
          <Image
            src="/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png"
            alt="Finished home with a gray shingle roof and a standing seam metal roof over the front entry, under an overcast sky"
            fill
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover object-[40%_50%]"
          />
        </Reveal>
      </div>
    </section>
  );
}
