import { PageShell } from "./PageShell";
import { PageHero } from "./PageHero";
import { InfoSection } from "./InfoSection";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";
import { metaFor } from "@/config/meta";
import { JsonLd } from "./JsonLd";
import { categoryServiceItems, itemList, pageGraph } from "@/config/schema";
import { categoryHref, serviceGroups, servicesIn, type ServiceGroup } from "@/config/services";

// Company-wide points, all stated elsewhere on the site.
const reasons = [
  ["Free inspection and estimate", "We look first and tell you what we found before you decide anything."],
  ["Owners on every job", "The owners oversee every project and speak with every client."],
  ["Local and veteran-owned", "Serving Denton and Collin Counties since 2019."],
  ["Honest answers", "We fix what is broken and tell you plainly what is not."],
];

// Pick the column count that fills every row.
const cols = (n: number) => (n % 3 !== 0 && n % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3");
// When three columns would leave two cards on the last row, the last card takes two columns.
const span = (n: number, i: number) => (n > 3 && n % 3 === 2 && i === n - 1 ? "lg:col-span-2" : undefined);

const groupOf = (id: ServiceGroup) => serviceGroups.find((g) => g.id === id)!;

export const categoryMeta = (id: ServiceGroup) => metaFor(categoryHref(id));

/** Landing page for one service category, e.g. /services/roofing. */
export function CategoryPage({ id }: { id: ServiceGroup }) {
  const g = groupOf(id);
  const list = servicesIn(id);
  const others = serviceGroups.filter((o) => o.id !== id);

  return (
    <PageShell>
      <JsonLd
        graph={pageGraph({
          path: categoryHref(id),
          type: "CollectionPage",
          trail: ["/services", categoryHref(id)],
          faqs: g.faqs,
          mainEntity: itemList(categoryHref(id), categoryServiceItems(id)),
        })}
      />
      <PageHero crumbs={[{ href: "/services", label: "Services" }]} eyebrow="Services" title={g.title} intro={g.lead} />

      <section className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-red">{g.name}</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">
              {list.length} {g.noun.toLowerCase()} services
            </h2>
          </Reveal>
          <ul className={`mt-10 grid gap-5 sm:grid-cols-2 ${cols(list.length)}`}>
            {list.map((s, i) => (
              <Reveal as="li" key={s.slug} className={span(list.length, i)} delay={(i % 4) * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <InfoSection eyebrow="Why call us" title="What you can count on" bg="cream" prev="#f3eedf">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([h, p], i) => (
            <Reveal as="li" key={h} delay={i * 0.06} className="border-t-4 border-red pt-5">
              <h3 className="font-display text-xl uppercase tracking-wide text-navy">{h}</h3>
              <p className="mt-2 text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </ul>
      </InfoSection>

      <Faq items={g.faqs.map(([q, a]) => [q, a])} bg="paper" prev="#fffdf2" />

      <InfoSection eyebrow="More services" title="We also do" bg="cream" prev="#f3eedf">
        <ul className="grid gap-5 md:grid-cols-3">
          {others.map((o, i) => (
            <Reveal as="li" key={o.id} delay={i * 0.06}>
              <a href={categoryHref(o.id)} className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white">
                <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">{o.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{o.intro}</p>
                <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See {o.noun.toLowerCase()} services &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </InfoSection>

      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
