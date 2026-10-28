import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { InfoSection } from "@/components/InfoSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { business } from "@/config/business";
import { pageMeta } from "@/config/meta";
import { serviceBySlug, serviceGroups, serviceHref, services } from "@/config/services";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: Props) {
  const s = serviceBySlug((await props.params).slug);
  if (!s) return {};
  return pageMeta(
    serviceHref(s.slug),
    `${s.name} in Denton, TX | ${business.name}`,
    `${s.card} Serving Denton and Collin Counties. Free inspection and estimate.`,
  );
}

export default async function ServicePage(props: Props) {
  const s = serviceBySlug((await props.params).slug);
  if (!s) notFound();
  const group = serviceGroups.find((g) => g.id === s.group)!;
  const related = s.related.map(serviceBySlug).filter((r) => r !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    url: `${business.siteUrl}${serviceHref(s.slug)}`,
    provider: { "@type": "RoofingContractor", name: business.name, url: business.siteUrl },
    areaServed: business.counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c}, Texas` })),
  };

  const lists = [
    { h: "Signs you need this", items: s.signs },
    { h: "What the job includes", items: s.includes },
  ];

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={`${group.name} services`} title={s.name} intro={s.summary} />

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
              <a
                href={serviceHref(r.slug)}
                className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
              >
                <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">{r.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{r.card}</p>
                <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See this service &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8">
          <a href="/services" className="btn btn-navy">All services &rarr;</a>
        </Reveal>
      </InfoSection>

      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
