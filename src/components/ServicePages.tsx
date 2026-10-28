import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageHero } from "./PageHero";
import { ServiceGrid } from "./ServiceGrid";
import { Process } from "./Process";
import { FinalCta } from "./FinalCta";
import { Reveal } from "./Reveal";
import { business } from "@/config/business";
import { categories, servicePath, type Category, type Service } from "@/config/services";

const CREAM = "#fffdf2";
const PAPER = "#f3eedf";
const NAVY = "#042d58";

const isRoofing = (c: Category) => c.slug === "roofing-services";

// Roofing pages keep the homepage's inspection CTA; general contracting gets its own wording.
const ctaFor = (c: Category) =>
  isRoofing(c)
    ? {}
    : {
        eyebrow: "Free estimate",
        title: "Tell us about the project",
        text: "Call and tell us what you have in mind. You get honest answers and a clear estimate before any work starts.",
      };

const homeCrumb = { name: "Home", path: "/" };
const servicesCrumb = { name: "Services", path: "/services" };
const categoryCrumb = (c: Category) => ({ name: c.name, path: `/${c.slug}` });

function AreaChips() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {business.serviceAreas.map((a) => (
        <li key={a} className="bg-navy px-3 py-1.5 font-display text-base uppercase tracking-[0.08em] text-white [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)]">
          {a}
        </li>
      ))}
    </ul>
  );
}

function OtherCategories({ current }: { current: Category }) {
  const others = categories.filter((c) => c.slug !== current.slug);
  return (
    <Reveal className="mt-10">
      <p className="text-lg">
        <strong className="font-display uppercase tracking-wide text-navy">Also from {business.name}:</strong>{" "}
        {others.map((c, i) => (
          <span key={c.slug}>
            {i > 0 && ", "}
            <a href={`/${c.slug}`} className="font-medium text-blue underline decoration-2 underline-offset-4 hover:text-navy">
              {c.name.toLowerCase()}
            </a>
          </span>
        ))}
        .
      </p>
    </Reveal>
  );
}

/* ---------- Category page ---------- */

export function CategoryPage({ category }: { category: Category }) {
  const path = `/${category.slug}`;

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[homeCrumb, servicesCrumb, categoryCrumb(category)]}
          eyebrow={category.eyebrow}
          title={category.heading}
          intro={category.intro}
          image={category.heroImage}
        />
        <section className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: NAVY }}>
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-red">{category.name}</p>
              <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Pick the service that fits</h2>
              <p className="mt-5 text-lg leading-relaxed">Each one has its own page with what the work covers.</p>
            </Reveal>
            <div className="mt-12">
              <ServiceGrid category={category} />
            </div>
            {isRoofing(category) && (
              <Reveal className="mt-10">
                <p className="text-lg">
                  <strong className="font-display uppercase tracking-wide text-navy">Also offered:</strong> siding, gutters and skylights.
                </p>
              </Reveal>
            )}
            <OtherCategories current={category} />
          </div>
        </section>
        {isRoofing(category) && <Process prev={CREAM} />}
        <FinalCta {...ctaFor(category)} prev={isRoofing(category) ? NAVY : CREAM} />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Service page ---------- */

/** The next four services in the category, wrapping around, so the related row is always one full row. */
function relatedTo(category: Category, service: Service) {
  const list = category.services;
  const i = list.indexOf(service);
  return Array.from({ length: Math.min(4, list.length - 1) }, (_, k) => list[(i + 1 + k) % list.length]);
}

export function ServicePage({ category, service }: { category: Category; service: Service }) {
  const path = servicePath(category, service);
  const crumbs = [homeCrumb, servicesCrumb, categoryCrumb(category), { name: service.name, path }];

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={crumbs}
          eyebrow={category.name}
          title={`${service.name} in Denton and Collin Counties`}
          intro={service.summary}
          image={category.heroImage}
        />

        <section className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: NAVY }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-red">About this service</p>
              <h2 className="h-display mt-4 text-4xl text-navy md:text-5xl">{service.name}</h2>
              <p className="mt-6 text-lg leading-relaxed md:text-xl">{service.body}</p>
              <h3 className="mt-10 font-display text-xl uppercase tracking-wide text-navy">Where we work</h3>
              <p className="mt-2 leading-relaxed">
                {business.counties.join(" and ")}, including these communities. If yours is not listed, call and ask.
              </p>
              <AreaChips />
            </Reveal>

            <Reveal className="flex flex-col gap-5">
              {service.includes && (
                <div className="bg-tint p-7 md:p-8">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-navy">
                    {isRoofing(category) && service.slug === "shingle-roofing" ? "Manufacturers we install" : "What the work covers"}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-lg leading-snug">
                        <span aria-hidden className="mt-2 h-2.5 w-5 flex-none -skew-x-[32deg] bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="dark-ground bg-navy p-7 text-white md:p-8">
                <p className="eyebrow text-white [--marker:#b42335]">Free estimate</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Call and tell us what you need. You get a clear estimate before any work starts.
                </p>
                <a href={business.phoneHref} className="btn btn-red mt-6 w-full sm:w-auto">Call {business.phoneDisplay}</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="slant bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: CREAM }}>
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-red">{category.name}</p>
                <h2 className="h-display mt-4 text-4xl text-navy md:text-5xl">More {category.name.toLowerCase()} services</h2>
              </div>
              <a href={`/${category.slug}`} className="font-display text-sm uppercase tracking-[0.14em] text-red hover:underline">
                See all {category.name.toLowerCase()} &rarr;
              </a>
            </Reveal>
            <div className="mt-10">
              <ServiceGrid category={category} services={relatedTo(category, service)} />
            </div>
          </div>
        </section>

        {isRoofing(category) && <Process />}
        <FinalCta {...ctaFor(category)} prev={isRoofing(category) ? NAVY : PAPER} />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Services hub ---------- */

export function ServicesHub() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[homeCrumb, servicesCrumb]}
          eyebrow="Everything we do"
          title="Roofing and general contracting services"
          intro={`Roofing, remodeling, repairs and painting across ${business.counties.join(" and ")}. Free estimate first, then a clear plan.`}
          image={categories[0].heroImage}
        />
        {categories.map((c, i) => (
          <section
            key={c.slug}
            className={`slant ${i % 2 ? "bg-paper" : "slant-r bg-cream"} pb-20 md:pb-28`}
            style={{ ["--prev" as string]: i === 0 ? NAVY : i % 2 ? CREAM : PAPER }}
          >
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="eyebrow text-red">{c.eyebrow}</p>
                  <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">{c.name}</h2>
                  <p className="mt-5 text-lg leading-relaxed">{c.intro}</p>
                </div>
                <a href={`/${c.slug}`} className="flex-none font-display text-sm uppercase tracking-[0.14em] text-red hover:underline">
                  See all {c.name.toLowerCase()} &rarr;
                </a>
              </Reveal>
              <div className="mt-12">
                <ServiceGrid category={c} />
              </div>
            </div>
          </section>
        ))}
        <FinalCta
          eyebrow="Free estimate"
          title="Tell us what you need"
          text="Roof, remodel, repair or paint: call and tell us about it. You get honest answers and a clear estimate before any work starts."
          prev={categories.length % 2 ? CREAM : PAPER}
        />
      </main>
      <Footer />
    </>
  );
}
