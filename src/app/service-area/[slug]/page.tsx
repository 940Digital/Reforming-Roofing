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
import { builtLabels, censusSource, cities, cityBySlug, cityHref, denton, directionFrom, housingStats, milesBetween, nearestTo, type City } from "@/config/cities";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

const countyLabel = (c: City) => `${c.counties.join(" and ")} ${c.counties.length > 1 ? "Counties" : "County"}`;

const decade = (i: number) => (i === 0 ? "2020s" : builtLabels[i] === "Pre-1940" ? "years before 1940" : builtLabels[i]);

/**
 * What a town's housing ages mean for its roofs. Every number comes from that town's Census data,
 * and the angle changes with the age of the housing, so no two towns read the same.
 */
function housingStory(c: City) {
  const h = c.housing;
  const s = housingStats(h);
  const boom = `The biggest building stretch was the ${decade(s.peak)}, when ${Math.round((h.built[s.peak] / h.units) * 100)}% of the homes standing today went up.`;
  if (h.medianYearBuilt <= 2000) {
    return {
      title: `Many ${c.name} roofs have some age`,
      body: [
        `Half of ${c.name}'s housing was built in ${h.medianYearBuilt} or earlier. A house built before 2000 has a roof that has been through more than 25 Texas summers, unless it has been replaced since. ${boom}`,
        "If you are not sure how old your roof is, start there. The free inspection tells you what shape it is in and whether a repair will do.",
      ],
    };
  }
  if (h.medianYearBuilt < 2010) {
    return {
      title: `${c.name} was built in waves`,
      body: [
        `${s.before2000}% of ${c.name}'s housing was built before 2000 and ${s.since2010}% since 2010. ${boom}`,
        "Roofs on the same street can be decades apart in age, and they need different things. An older roof may be near the end of its life, while a newer one mostly needs a look after a big storm.",
      ],
    };
  }
  return {
    title: `${c.name} is mostly built since 2010`,
    body: [
      `${s.since2010}% of ${c.name}'s housing was built in 2010 or later${s.since2020 >= 10 ? `, and ${s.since2020}% since 2020 alone` : ""}. Only ${s.before2000}% is older than 2000.`,
      "A newer roof is not a storm-proof roof. Hail and high wind damage new shingles too, and the damage is easy to miss from the ground. After a storm, an inspection tells you whether anything needs attention.",
    ],
  };
}

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
  const h = c.housing;
  const stats = housingStats(h);
  const story = housingStory(c);
  const tiles = [
    { h: "Median year built", p: String(h.medianYearBuilt) },
    { h: "Built before 2000", p: `${stats.before2000}%` },
    { h: "Owner-occupied", p: `${stats.owned}%` },
    { h: "Detached houses", p: `${stats.houses}%` },
  ];
  // oldest decade first, so the bars read as the town growing over time
  const bars = h.built.map((n, i) => ({ label: builtLabels[i], n, share: (n / h.units) * 100, peak: i === stats.peak })).reverse();
  const tallest = Math.max(...bars.map((b) => b.share));

  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: cityHref(c.slug), trail: ["/service-area", cityHref(c.slug)], about: [cityNode(c)] })} />
      <PageHero
        crumbs={[{ href: "/service-area", label: "Service area" }]}
        eyebrow={countyLabel(c)}
        title={`Roofing in ${c.name}, TX`}
        intro={c.intro}
      />

      <InfoSection eyebrow={`Homes in ${c.name}`} title={story.title} bg="cream" prev="#042d58">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Reveal className="max-w-2xl space-y-5 text-lg leading-relaxed md:text-xl">
              {story.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {tiles.map((t, i) => (
                <Reveal as="li" key={t.h} delay={i * 0.06} className="cut bg-paper p-5">
                  <p className="font-display text-4xl text-navy md:text-5xl">{t.p}</p>
                  <h3 className="mt-1 font-display text-sm uppercase tracking-[0.14em] text-ink/70">{t.h}</h3>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.08}>
            <figure className="border-t-4 border-red bg-tint p-6 md:p-8">
              <figcaption className="font-display text-xl uppercase tracking-wide text-navy">Homes standing today, by decade built</figcaption>
              <ul className="mt-5 space-y-2">
                {bars.map((b) => (
                  <li key={b.label} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3">
                    <span className="font-display text-sm tracking-[0.08em] text-navy">{b.label}</span>
                    <span className="h-4 bg-white">
                      <span className={`block h-full ${b.peak ? "bg-red" : "bg-navy"}`} style={{ width: `${(b.share / tallest) * 100}%` }} />
                    </span>
                    <span className="text-right tabular-nums">{Math.round(b.share)}%</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink/70">
                {h.units.toLocaleString("en-US")} housing units, apartments included. Source:{" "}
                <a href={censusSource(h)} className="underline underline-offset-2 hover:text-red" rel="noopener">
                  U.S. Census Bureau, American Community Survey {h.survey - 4}-{h.survey} 5-year estimates
                </a>
                .
              </p>
            </figure>
          </Reveal>
        </div>
      </InfoSection>

      <InfoSection eyebrow="Local facts" title={`${c.name} at a glance`} bg="paper" prev="#fffdf2">
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

      <InfoSection eyebrow="Services" title={`What we do in ${c.name}`} bg="cream" prev="#f3eedf">
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <a
                  href={categoryHref(g.id)}
                  className="block bg-navy px-4 py-2 font-display text-lg uppercase tracking-[0.08em] text-white transition-colors [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] hover:bg-red"
                >
                  {g.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </InfoSection>

      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
