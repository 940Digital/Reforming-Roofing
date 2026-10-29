import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { MoreLink, type SectionProps } from "./MoreLink";
import { cityHref, citiesByCounty, type City } from "@/config/cities";

function TownList({ list, cols, style }: { list: City[]; cols: string; style?: CSSProperties }) {
  return (
    <ul className={`mt-4 grid gap-x-5 border-t border-navy/15 md:gap-x-8 ${cols}`} style={style}>
      {list.map((c) => (
        <li key={c.slug} className="border-b border-navy/15">
          <a
            href={cityHref(c.slug)}
            className="group flex items-center justify-between gap-3 whitespace-nowrap py-3 font-display text-base uppercase tracking-[0.06em] text-navy md:text-lg md:tracking-[0.08em] hover:text-red"
          >
            {c.name}
            <span aria-hidden className="text-red transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function County({ county, list, cols, style }: { county: string; list: City[]; cols: string; style?: CSSProperties }) {
  return (
    <div className="border-t-4 border-red pt-5">
      <h3 className="flex items-baseline justify-between gap-4 font-display text-2xl uppercase tracking-wide text-navy">
        {county} County
        <span className="text-sm tracking-[0.14em] text-ink/60">{list.length} {list.length === 1 ? "town" : "towns"}</span>
      </h3>
      <TownList list={list} cols={cols} style={style} />
    </div>
  );
}

export function Area({ prev = "#042d58", more = false }: SectionProps = {}) {
  // Largest county first: Denton takes the wide column, the rest stack beside it.
  const [main, ...rest] = citiesByCounty();

  return (
    <section id="service-area" className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Service area</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Proudly serving Denton and Collin Counties</h2>
          <p className="mt-5 text-lg leading-relaxed">
            We work in these communities and the ones around them. If yours is not listed, call. We will tell you straight whether we can get to you.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
          {/* three columns from md up, filled top to bottom so the A to Z order reads down each column */}
          <County
            county={main.county}
            list={main.list}
            cols="grid-cols-2 md:grid-flow-col md:grid-cols-3 md:[grid-template-rows:repeat(var(--rows),auto)]"
            style={{ ["--rows" as string]: Math.ceil(main.list.length / 3) }}
          />
          <div className="grid content-start gap-10">
            {rest.map((g) => (
              <County key={g.county} county={g.county} list={g.list} cols={g.list.length > 1 ? "grid-cols-2" : ""} />
            ))}
          </div>
        </Reveal>

        {more && <MoreLink href="/service-area" label="See our service area" />}
      </div>
    </section>
  );
}
