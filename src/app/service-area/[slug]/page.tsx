import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { InfoSection } from "@/components/InfoSection";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { cityNode, pageGraph } from "@/config/schema";
import { categoryHref, serviceGroups } from "@/config/services";
import { cities, cityBySlug, cityHref, denton, directionFrom, milesBetween, nearestTo, type City } from "@/config/cities";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

const countyLabel = (c: City) => `${c.counties.join(" and ")} ${c.counties.length > 1 ? "Counties" : "County"}`;

export async function generateMetadata(props: Props) {
  const c = cityBySlug((await props.params).slug);
  if (!c) return {};
  return metaFor(cityHref(c.slug));
}

export default async function CityPage(props: Props) {
  const c = cityBySlug((await props.params).slug);
  if (!c) notFound();

  const miles = Math.round(milesBetween(denton, c));
  const facts = [
    { h: c.counties.length > 1 ? "Counties" : "County", p: countyLabel(c) },
    { h: c.zips.length > 1 ? "ZIP codes" : "ZIP code", p: c.zips.join(", ") },
    { h: "Population", p: `${c.population2020.toLocaleString("en-US")} (2020 census)` },
    { h: "From Denton", p: c === denton ? "Center of our service area" : `About ${miles} miles ${directionFrom(denton, c)}` },
  ];
  const nearby = nearestTo(c);

  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: cityHref(c.slug), trail: ["/service-area", cityHref(c.slug)], about: [cityNode(c)] })} />
      <PageHero
        crumbs={[{ href: "/service-area", label: "Service area" }]}
        eyebrow={countyLabel(c)}
        title={`Roofing in ${c.name}, TX`}
        intro={`${c.intro} We do roofing, gutters, skylights, remodeling, repairs and painting here, starting with a free inspection and estimate.`}
      />

      <InfoSection eyebrow="Local facts" title={`${c.name} at a glance`} bg="cream" prev="#042d58">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal as="li" key={f.h} delay={i * 0.06} className="border-t-4 border-red pt-5">
              <h3 className="font-display text-xl uppercase tracking-wide text-navy">{f.h}</h3>
              <p className="mt-2 text-lg leading-relaxed">{f.p}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12">
          <h3 className="font-display text-2xl uppercase tracking-wide text-navy">Nearby towns we serve</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <a
                  href={cityHref(n.slug)}
                  className="block bg-navy px-4 py-2 font-display text-lg uppercase tracking-[0.08em] text-white transition-colors [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] hover:bg-red"
                >
                  {n.name} <span className="text-white/70">{Math.round(milesBetween(c, n))} mi</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </InfoSection>

      <InfoSection eyebrow="Services" title={`What we do in ${c.name}`} bg="paper" prev="#fffdf2">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 0.06}>
              <a href={categoryHref(g.id)} className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white">
                <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">{g.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{g.intro}</p>
                <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See {g.noun.toLowerCase()} services &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </InfoSection>

      <FinalCta prev="#f3eedf" />
    </PageShell>
  );
}
