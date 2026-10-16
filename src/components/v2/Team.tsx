import Image from "next/image";
import { Reveal } from "./Motion";

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
    note: "An experienced roofer and project manager. Clients mention him by name in their reviews.",
    src: "/assets/original/9a58ba_571439b725f64e328a6b02dd2e77ab2a.jpg",
    alt: "Portrait of Jeremy Morphis, co-founder of Roofing Reformation, smiling in a light shirt",
  },
  {
    name: "Robert Hines",
    role: null as string | null, // TODO(Rob): role and short bio for Robert Hines were not on the old site
    note: "One of the three people the company is built on.",
    src: "/assets/original/9a58ba_ae85ef0db1024340aa0f287da43a461a.jpg",
    alt: "Portrait of Robert Hines of Roofing Reformation, smiling with a goatee in a light shirt",
  },
];

export function Team() {
  return (
    <section id="team" className="section bg-navy text-cream">
      <div className="wrap">
        <Reveal>
          <p className="peg-label !text-cream/70 [--peg:#ff9aa7]">The team</p>
          <h2 className="h2 mt-6 max-w-3xl">The people you will actually meet</h2>
          <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-cream/80 md:text-xl">
            Rob and Jeremy started the company after years working side by side in real estate and roofing. Clients are treated as part of the family.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {people.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.12}>
              <div className="frame relative aspect-[4/5] w-full">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-6 font-serif text-2xl">{p.name}</h3>
              {p.role && <p className="mt-1 text-sm uppercase tracking-[0.2em] text-cream/60">{p.role}</p>}
              <p className="mt-3 leading-relaxed text-cream/80">{p.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
