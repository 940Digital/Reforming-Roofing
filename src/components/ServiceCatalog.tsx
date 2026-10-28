import { Reveal } from "./Reveal";
import { serviceGroups, services, serviceHref } from "@/config/services";

/** Every service, grouped. Used on /services. */
export function ServiceCatalog({ prev }: { prev: string }) {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl space-y-16 px-5 md:px-8">
        {serviceGroups.map((g) => (
          <div key={g.id} id={g.id}>
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-red">{g.name}</p>
              <h2 className="h-display mt-4 text-4xl text-navy md:text-5xl">{g.name} services</h2>
              <p className="mt-4 text-lg leading-relaxed">{g.intro}</p>
            </Reveal>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.group === g.id)
                .map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                    <a
                      href={serviceHref(s.slug)}
                      className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
                    >
                      <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">{s.name}</h3>
                      <p className="mt-3 flex-1 leading-relaxed">{s.card}</p>
                      <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                        See this service &rarr;
                      </span>
                    </a>
                  </Reveal>
                ))}
            </ul>
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
