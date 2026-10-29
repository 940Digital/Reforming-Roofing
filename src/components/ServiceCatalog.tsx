import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";
import { categoryHref, serviceGroups, servicesIn } from "@/config/services";

// Pick the column count that fills every row.
const cols = (n: number) => (n % 3 !== 0 && n % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3");

/** Every service, grouped. Used on /services. */
export function ServiceCatalog({ prev }: { prev: string }) {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl space-y-16 px-5 md:px-8">
        {serviceGroups.map((g) => (
          <div key={g.id} id={g.id}>
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-red">{g.name}</p>
              <h2 className="h-display mt-4 text-4xl text-navy md:text-5xl">
                <a href={categoryHref(g.id)} className="hover:underline decoration-red decoration-4 underline-offset-8">{g.noun} services</a>
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{g.intro}</p>
            </Reveal>
            <ul className={`mt-8 grid gap-5 sm:grid-cols-2 ${cols(servicesIn(g.id).length)}`}>
              {servicesIn(g.id).map((s, i) => (
                <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-6">
              <a href={categoryHref(g.id)} className="font-display uppercase tracking-[0.14em] text-red hover:underline">
                More about {g.name.toLowerCase()} &rarr;
              </a>
            </Reveal>
          </div>
        ))}
        <Reveal>
          <p className="text-lg">
            <strong className="font-display uppercase tracking-wide text-navy">Also offered:</strong> siding.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
