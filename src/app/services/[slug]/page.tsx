import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { InfoSection } from "@/components/InfoSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph, serviceNode } from "@/config/schema";
import { categoryHref, serviceBySlug, serviceGroups, serviceHref, services } from "@/config/services";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: Props) {
  const s = serviceBySlug((await props.params).slug);
  if (!s) return {};
  return metaFor(serviceHref(s.slug));
}

export default async function ServicePage(props: Props) {
  const s = serviceBySlug((await props.params).slug);
  if (!s) notFound();
  const group = serviceGroups.find((g) => g.id === s.group)!;
  const related = s.related.map(serviceBySlug).filter((r) => r !== undefined);


  const lists = [
    { h: "Signs you need this", items: s.signs },
    { h: "What the job includes", items: s.includes },
  ];

  return (
    <PageShell>
      <JsonLd
        graph={pageGraph({
          path: serviceHref(s.slug),
          trail: ["/services", categoryHref(group.id), serviceHref(s.slug)],
          faqs: s.faqs,
          mainEntity: serviceNode(s),
        })}
      />
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }, { href: categoryHref(group.id), label: group.name }]}
        eyebrow={`${group.noun} services`}
        title={s.name}
        intro={s.summary}
      />

      <InfoSection eyebrow="What to know" title={`About ${s.name.toLowerCase()}`} bg="cream" prev="#042d58">
        <div className="grid gap-6 md:grid-cols-2">
          {lists.map((l, i) => (
            <Reveal key={l.h} delay={i * 0.08} className="border-t-4 border-red bg-tint p-6 md:p-8">
              <h3 className="font-display text-2xl uppercase tracking-wide text-navy">{l.h}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed marker:text-red">
                {l.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </InfoSection>

      <Faq items={s.faqs} bg="paper" prev="#fffdf2" />

      <InfoSection eyebrow="Related services" title="You might also need" bg="cream" prev="#f3eedf">
        <ul className="grid gap-5 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.06}>
              <ServiceCard service={r} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={categoryHref(group.id)} className="btn btn-navy">All {group.noun.toLowerCase()} services &rarr;</a>
          <a href="/services" className="btn btn-navy btn-end">All services &rarr;</a>
        </Reveal>
      </InfoSection>

      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
