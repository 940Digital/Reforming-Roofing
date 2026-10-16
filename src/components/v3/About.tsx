import { Unfold } from "./Motion";

const ideas = [
  {
    h: "What we do",
    p: "Repair, replacement, installation and inspection for homes and commercial buildings, in shingle, tile and metal. That includes residential roof replacement in Denton, TX and across Collin County.",
  },
  {
    h: "Why us",
    p: "The owners oversee every project and talk with every client directly. You will always know who is responsible for your roof.",
  },
  {
    h: "Proof",
    p: "Local, veteran-owned, insured and warranty-backed. The reviews and the finished roofs further down are real.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Unfold>
          <h2 className="max-w-3xl text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            Local roofers. Owners in charge.
          </h2>
        </Unfold>
        <div className="mt-10 grid gap-px border border-hair bg-hair md:grid-cols-3">
          {ideas.map((i, n) => (
            <Unfold key={i.h} delay={n * 0.1} className="bg-white p-7 md:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-red">{i.h}</h3>
              <p className="mt-4 text-lg leading-relaxed text-navy/85">{i.p}</p>
            </Unfold>
          ))}
        </div>
      </div>
    </section>
  );
}
