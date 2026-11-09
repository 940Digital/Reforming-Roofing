import { Arrow } from "@/components/Arrow";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/ContactForm";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/config/schema";
import { business } from "@/config/business";
import { heroFor } from "@/config/work";
import { formReady as keysReady } from "@/lib/formKeys";

export const metadata = metaFor("/contact");

const faqs: [string, string][] = [
  ["Is the inspection free?", "Yes. The inspection and the estimate are free."],
  ["Do I have to decide on the spot?", "No. We explain what we found, your options and the price. Then you decide."],
  ["What if a storm damages my roof?", "Text or call us. We offer emergency roofing service."],
  ["Which areas do you serve?", "Denton and Collin Counties, plus Gunter in Grayson County. If your town is not listed, text or call and ask."],
  ["Can I pay over time?", "Financing is available. Ask about it when we go over your estimate."],
];

// The form sits in the hero and is never faded in, so it shows the moment the page loads.
// Without the Resend key in Vercel (RESEND_API_KEY_RR) the form runs as a mock (pre-launch review): it shows, but sends nothing
// and its thank-you says so. Adding the keys and redeploying turns it into the real form.
const formReady = keysReady();

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/contact", type: "ContactPage", trail: ["/contact"], faqs })} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your roof"
        intro="Send a request or text us, and we will set up a free inspection. You get an honest look at your roof and a clear estimate, with no pressure to decide."
        actions={false}
        image={heroFor("/contact")}
        aside={
          <div id="request" className="cut bg-paper p-6 shadow-2xl md:p-10">
            <p className="eyebrow text-red">Send a request</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-5xl">Get your free inspection</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Leave a few details and we will text or call you to set a time. Fields marked * are required.
            </p>
            <div className="mt-8">
              <ContactForm mock={!formReady} />
            </div>
          </div>
        }
      />

      <section className="slant bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-3">
          <Reveal className="cut dark-ground relative isolate overflow-hidden bg-navy p-6 text-white md:p-8">
            {/* same corner cut as the page banners */}
            <div className="absolute bottom-0 right-0 -z-10 h-16 w-16 bg-blue [clip-path:polygon(100%_0,100%_100%,0_100%)] md:h-20 md:w-20" />
            <h3 className="eyebrow text-white [--marker:#b42335]">Rather text?</h3>
            <a href={business.smsHref} className="mt-4 block whitespace-nowrap font-display text-4xl tracking-wide text-white hover:underline decoration-2 underline-offset-8">
              {business.phoneDisplay}
            </a>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Send your name, your town and what is going on with your roof. Storm damage? Text or call. We offer emergency roofing service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={business.smsHref} className="btn btn-red">Text us now</a>
              <a href={business.phoneHref} className="btn btn-line">Call</a>
            </div>
            {business.email && (
              <p className="mt-6 text-lg">
                Or email <a href={`mailto:${business.email}`} className="underline underline-offset-4 hover:decoration-2">{business.email}</a>
              </p>
            )}
          </Reveal>
          <Reveal delay={0.06} className="cut bg-paper p-6 md:p-8">
            <h3 className="eyebrow text-navy">Where we work</h3>
            <p className="mt-3 text-lg leading-relaxed">Denton and Collin Counties, plus Gunter in Grayson County.</p>
            <a href="/service-area" className="mt-4 inline-block font-display uppercase tracking-[0.14em] text-red hover:underline">
              See the towns we serve <Arrow />
            </a>
          </Reveal>
          <Reveal delay={0.12} className="cut bg-paper p-6 md:p-8">
            <h3 className="eyebrow text-navy">Follow along</h3>
            <p className="mt-3 text-lg leading-relaxed">Find us on Instagram, Facebook and Google.</p>
            <SocialLinks light className="mt-4" />
          </Reveal>
        </div>
      </section>

      <Process prev="#fffdf2" />
      <Faq items={faqs} bg="paper" prev="#042d58" />
    </PageShell>
  );
}
