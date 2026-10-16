import Image from "next/image";
import { Band } from "./Band";
import { Unfold } from "./Motion";

const people = [
  {
    name: "Rob Vaughan",
    role: "Co-founder",
    note: "A seasoned real estate broker and listing agent. The company's guiding principle, Proverbs 22:1, came from him.",
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
    <section aria-labelledby="team-h" className="bg-paper">
      <Band id="team" n="07" label="Team" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Unfold>
          <h2 id="team-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            The people who answer for your roof
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/80">
            Rob and Jeremy started the company after years of working side by side in real estate and roofing.
          </p>
        </Unfold>
        <ul className="mt-10 grid gap-px border border-hair bg-hair md:grid-cols-3">
          {people.map((p, i) => (
            <Unfold as="li" key={p.name} delay={i * 0.1} className="bg-white">
              <div className="relative aspect-square bg-navy">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{p.name}</h3>
                {p.role && <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-red">{p.role}</p>}
                <p className="mt-3 leading-relaxed text-navy/80">{p.note}</p>
              </div>
            </Unfold>
          ))}
        </ul>
      </div>
    </section>
  );
}
