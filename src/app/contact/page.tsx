import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/config/schema";
import { business } from "@/config/business";

export const metadata = metaFor("/contact");

const faqs: [string, string][] = [
  ["Is the inspection free?", "Yes. The inspection and the estimate are free."],
  ["Do I have to decide on the spot?", "No. We explain what we found, your options and the price. Then you decide."],
  ["What if a storm damages my roof?", "Call us. We offer emergency roofing service."],
  ["Which areas do you serve?", "Denton and Collin Counties, plus Gunter in Grayson County. If your town is not listed, call and ask."],
  ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
];

const side = [
  {
    h: "Storm damage?",
    p: "Call. We offer emergency roofing service.",
  },
  {
    h: "Where we work",
    p: "Denton and Collin Counties, plus Gunter in Grayson County.",
    link: { href: "/service-area", label: "See the towns we serve" },
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/contact", type: "ContactPage", trail: ["/contact"], faqs })} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your roof"
        intro="Call and we will set up a free inspection. You get an honest look at your roof and a clear estimate, with no pressure to decide."
        actions={false}
      />

      <section className="slant bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="cut dark-ground relative isolate overflow-hidden bg-navy p-8 text-white md:p-12">
            {/* same corner cut as the page banners */}
            <div className="absolute bottom-0 right-0 -z-10 h-24 w-24 bg-blue [clip-path:polygon(100%_0,100%_100%,0_100%)] md:h-32 md:w-32" />
            <p className="eyebrow text-white [--marker:#b42335]">Call us</p>
            <h2 className="h-display mt-4 text-4xl md:text-5xl">Schedule your free inspection</h2>
            <a href={business.phoneHref} className="mt-6 block whitespace-nowrap font-display text-[2.6rem] tracking-wide text-[#ff9aa7] hover:underline decoration-2 underline-offset-8 sm:text-5xl md:text-7xl">
              {business.phoneDisplay}
            </a>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">
              Calling is the quickest way to reach us. We find a time to look at your roof, then walk you through what we found and what it costs.
            </p>
            {business.email && (
              <p className="mt-4 text-lg">
                Or email <a href={`mailto:${business.email}`} className="underline underline-offset-4 hover:text-[#ff9aa7]">{business.email}</a>
              </p>
            )}
            <a href={business.phoneHref} className="btn btn-red mt-8">Call now</a>
          </Reveal>

          <div className="grid content-start gap-5">
            {side.map((s, i) => (
              <Reveal key={s.h} delay={(i + 1) * 0.06} className="cut bg-paper p-6 md:p-8">
                <h3 className="eyebrow text-navy">{s.h}</h3>
                <p className="mt-3 text-lg leading-relaxed">{s.p}</p>
                {s.link && (
                  <a href={s.link.href} className="mt-4 inline-block font-display uppercase tracking-[0.14em] text-red hover:underline">
                    {s.link.label} &rarr;
                  </a>
                )}
              </Reveal>
            ))}
            <Reveal delay={0.18} className="cut bg-paper p-6 md:p-8">
              <h3 className="eyebrow text-navy">Follow along</h3>
              <p className="mt-3 text-lg leading-relaxed">Find us on Instagram, Facebook and Google.</p>
              <SocialLinks light className="mt-4" />
            </Reveal>
          </div>
        </div>
      </section>

      <Process prev="#fffdf2" />
      <Faq items={faqs} bg="paper" prev="#042d58" />
    </PageShell>
  );
}
