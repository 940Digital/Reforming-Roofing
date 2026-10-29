import { business } from "@/config/business";

/** Title banner at the top of every page except the homepage. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  actions = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Links above the eyebrow, from the top level down to the parent page. */
  crumbs?: { href: string; label: string }[];
  /** The text and call buttons. Off on the contact page, which has its own. */
  actions?: boolean;
}) {
  return (
    <section className="dark-ground relative isolate overflow-hidden bg-navy text-white">
      {/* same corner cuts as the homepage hero */}
      <div className="absolute left-0 top-0 -z-10 h-20 w-20 bg-red [clip-path:polygon(0_0,100%_0,0_100%)] md:h-32 md:w-32" />
      <div className="absolute bottom-0 right-0 -z-10 h-20 w-20 bg-blue [clip-path:polygon(100%_0,100%_100%,0_100%)] md:h-36 md:w-36" />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.12em] text-white/75">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <a href={c.href} className="hover:text-white hover:underline">{c.label}</a>
                  <span aria-hidden>/</span>
                </li>
              ))}
              <li aria-current="page" className="text-white">{title}</li>
            </ol>
          </nav>
        )}
        <p className="eyebrow text-white [--marker:#b42335]">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{intro}</p>
        {actions && (
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={business.smsHref} className="btn btn-red">Text {business.phoneDisplay}</a>
            <a href={business.phoneHref} className="btn btn-line">Call</a>
          </div>
        )}
      </div>
    </section>
  );
}
