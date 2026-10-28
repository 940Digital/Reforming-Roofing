import { Reveal } from "./Reveal";
import { ServiceGrid } from "./ServiceGrid";
import { categories, getCategory, servicePath } from "@/config/services";

const roofing = getCategory("roofing-services")!;
const others = categories.filter((c) => c !== roofing);

export function Services() {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#fffdf2" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">{roofing.eyebrow}</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">{roofing.heading}</h2>
          <p className="mt-5 text-lg leading-relaxed">{roofing.intro}</p>
        </Reveal>

        <div className="mt-12">
          <ServiceGrid category={roofing} />
        </div>

        <Reveal className="mt-10">
          <p className="text-lg">
            <strong className="font-display uppercase tracking-wide text-navy">Also offered:</strong> siding, gutters and skylights.
          </p>
        </Reveal>

        {others.map((c) => (
          <Reveal key={c.slug} className="mt-14 border-t-4 border-navy pt-10">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow text-red">{c.eyebrow}</p>
                <h3 className="h-display mt-4 text-3xl text-navy md:text-5xl">{c.name}</h3>
                <p className="mt-4 text-lg leading-relaxed">{c.intro}</p>
              </div>
              <a href={`/${c.slug}`} className="flex-none font-display text-sm uppercase tracking-[0.14em] text-red hover:underline">
                See all {c.name.toLowerCase()} &rarr;
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={servicePath(c, s)}
                    className="block bg-navy px-4 py-2 font-display text-lg uppercase tracking-[0.08em] text-white transition-colors [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] hover:bg-red"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
