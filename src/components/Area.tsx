import Image from "next/image";
import { Reveal } from "./Reveal";
import { MoreLink, type SectionProps } from "./MoreLink";
import { business } from "@/config/business";
import { cityHref, citiesByCounty, type City } from "@/config/cities";

// Town chips keep the old banner's clipped top-left corner.
const chip = "flex h-full items-center whitespace-nowrap px-3 py-2.5 font-display text-[0.95rem] uppercase tracking-[0.04em] md:px-4 md:tracking-[0.08em] transition-colors [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] md:text-lg";

function County({ county, list, cols, callChip = false }: { county: string; list: City[]; cols: string; callChip?: boolean }) {
  return (
    <div className="cut h-full bg-paper p-4 sm:p-6 md:p-7">
      <h3 className="eyebrow text-navy">
        {county} County
        <span className="ml-auto text-sm tracking-[0.14em] text-ink/60">{list.length} {list.length === 1 ? "town" : "towns"}</span>
      </h3>
      <ul className={`mt-5 grid gap-2 ${cols}`}>
        {list.map((c) => (
          <li key={c.slug}>
            <a href={cityHref(c.slug)} className={`${chip} bg-navy text-white hover:bg-red`}>{c.name}</a>
          </li>
        ))}
        {/* fills the last cell of the grid on purpose */}
        {callChip && (
          <li className="col-span-2 sm:col-span-1">
            <a href={business.phoneHref} className={`${chip} bg-red text-white hover:bg-[#8f1a2a]`}>Not listed? Call</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export function Area({ prev = "#042d58", more = false }: SectionProps = {}) {
  // Largest county first: Denton takes the wide column, the rest stack beside it.
  const [main, ...rest] = citiesByCounty();

  return (
    <section id="service-area" className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow text-red">Service area</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Proudly serving Denton and Collin Counties</h2>
            <p className="mt-5 text-lg leading-relaxed">
              We work in these communities and the ones around them. If yours is not listed, call. We will tell you straight whether we can get to you.
            </p>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[1920/875] w-full bg-navy">
              <Image
                src="/assets/original/860db2_38168d8edfe041ec9374b91f4d7da446.jpeg"
                alt="Aerial view of a two-story home and its gray shingle roof in a Texas neighborhood, shown in navy tone"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <County county={main.county} list={main.list} cols="grid-cols-2 sm:grid-cols-3" callChip />
          <div className="grid content-start gap-5">
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
