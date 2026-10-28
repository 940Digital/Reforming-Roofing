import Image from "next/image";
import { Reveal } from "./Reveal";
import { MoreLink, type SectionProps } from "./MoreLink";
import { services, serviceHref } from "@/config/services";

// Only services with an icon are featured on the homepage; the rest are on /services.
const featured = services.filter((s) => s.icon);

export function Services({ prev = "#fffdf2", more = false }: SectionProps = {}) {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Residential and commercial</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Roofing services in Denton and Collin Counties</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Roofing, gutters and skylights. Pick the one that fits and we will take it from there.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}>
              <a
                href={serviceHref(s.slug)}
                className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
              >
                <span className="grid h-14 w-14 place-items-center bg-white group-hover:bg-white">
                  <Image src={s.icon!} alt="" width={36} height={36} />
                </span>
                <h3 className="mt-5 font-display text-2xl uppercase leading-tight tracking-wide">{s.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{s.card}</p>
                <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See this service &rarr;
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal as="li" delay={(featured.length % 4) * 0.06}>
            <a
              href="/services"
              className="dark-ground flex h-full min-h-56 flex-col justify-end bg-navy p-6 text-white transition-colors duration-200 hover:bg-blue"
            >
              <span className="font-display text-5xl leading-none text-[#ff9aa7]">{services.length}</span>
              <span className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide">See all services &rarr;</span>
              <span className="mt-2 leading-relaxed text-white/85">Including gutters and skylights.</span>
            </a>
          </Reveal>
        </ul>

        <Reveal className="mt-10">
          <p className="text-lg">
            <strong className="font-display uppercase tracking-wide text-navy">Also offered:</strong> siding.
          </p>
        </Reveal>
        {more && <MoreLink href="/services" label="See all services" />}
      </div>
    </section>
  );
}
