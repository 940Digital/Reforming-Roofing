import Image from "next/image";
import { Reveal } from "./Reveal";

const people = [
  {
    name: "Rob Vaughan",
    role: "Co-founder",
    note: "A seasoned real estate broker and listing agent. He took the company's guiding principle from Proverbs 22:1.",
    src: "/assets/original/9a58ba_38aa574a49d545babe00fbd735819bd1.jpg",
    alt: "Portrait of Rob Vaughan, co-founder of Roofing Reformation, smiling in a blue checked shirt",
  },
  {
    name: "Jeremy Morphis",
    role: "Co-founder",
    note: "An experienced roofer and project manager. Clients name him in their reviews.",
    src: "/assets/original/9a58ba_571439b725f64e328a6b02dd2e77ab2a.jpg",
    alt: "Portrait of Jeremy Morphis, co-founder of Roofing Reformation, smiling in a light shirt",
  },
  {
    name: "Robert Hines",
    role: null, // TODO(Rob): role and short bio for Robert Hines were not on the old site
    note: "Part of the foundation of the company alongside the founders.",
    src: "/assets/original/9a58ba_ae85ef0db1024340aa0f287da43a461a.jpg",
    alt: "Portrait of Robert Hines of Roofing Reformation, smiling with a goatee in a light shirt",
  },
];

export function Team() {
  return (
    <section id="team" className="slant bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#fffdf2" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">The team</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">The people who answer for your roof</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Three people form the foundation of the company. Clients are treated as part of the Roofing Reformation family.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {people.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.08}>
              <article className="h-full bg-white">
                <div className="relative aspect-square w-full bg-navy">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl uppercase tracking-wide text-navy">{p.name}</h3>
                  {p.role && <p className="eyebrow mt-1 text-red">{p.role}</p>}
                  <p className="mt-3 leading-relaxed">{p.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
