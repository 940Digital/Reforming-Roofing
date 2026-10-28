import Image from "next/image";
import { business } from "@/config/business";

type Crumb = { name: string; path: string };

/** Navy hero for inner pages: breadcrumb, eyebrow, H1, intro and the call button. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
}) {
  return (
    <section id="top" className="dark-ground relative isolate overflow-hidden bg-navy pb-24 pt-36 text-white md:pb-28 md:pt-44">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="text-white">{c.name}</span>
                  ) : (
                    <>
                      <a href={c.path} className="hover:text-white hover:underline">{c.name}</a>
                      <span aria-hidden>/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-white [--marker:#b42335]">{eyebrow}</p>
        <h1 className="h-display mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl">{intro}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={business.phoneHref} className="btn btn-red">Call {business.phoneDisplay}</a>
          <a href="#contact" className="btn btn-line">Get a free estimate</a>
        </div>
      </div>
    </section>
  );
}
