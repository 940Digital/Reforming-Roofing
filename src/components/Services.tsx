import Image from "next/image";
import { Reveal, Wipe } from "./Reveal";
import { MoreLink, type SectionProps } from "./MoreLink";
import { categoryHref, serviceGroups } from "@/config/services";

// Roofing leads at full width; the other categories sit in a row under it.
// Each card links to its category page, which lists the individual services.
const [roofing, ...others] = serviceGroups;

export function Services({ prev = "#fffdf2", more = false }: SectionProps = {}) {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">What we do</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Roofing services in Denton and Collin Counties</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Roofing first, plus gutters, skylights and general contracting. Pick the one that fits and we will take it from there.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <a
            href={categoryHref(roofing.id)}
            className="dark-ground group grid bg-navy text-white transition-colors duration-200 hover:bg-blue lg:grid-cols-[1.2fr_1fr]"
          >
            <Wipe className="relative min-h-64 bg-blue md:min-h-80">
              <Image
                src="/assets/original/860db2_cf892d60ac384833bfd92f879f2f16af.png"
                alt="Aerial view of a finished gray shingle roof on a single-story home with mature trees and a curved walkway"
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover"
              />
            </Wipe>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <p className="eyebrow text-white [--marker:#b42335]">Our main service</p>
              <h3 className="h-display mt-3 text-5xl md:text-7xl">{roofing.name}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">{roofing.lead}</p>
              <span className="mt-8 font-display text-lg uppercase tracking-[0.14em] text-[#ff9aa7]">
                See roofing services <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </a>
        </Reveal>

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {others.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 0.06}>
              <a
                href={categoryHref(g.id)}
                className="group flex h-full flex-col bg-tint p-7 transition-colors duration-200 hover:bg-navy hover:text-white"
              >
                <h3 className="font-display text-3xl uppercase tracking-wide text-navy group-hover:text-white">{g.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{g.intro}</p>
                <span className="mt-6 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See {g.noun.toLowerCase()} services <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        {more && <MoreLink href="/services" label="See all services" />}
      </div>
    </section>
  );
}
