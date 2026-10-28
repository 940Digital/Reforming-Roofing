import Image from "next/image";
import { Reveal } from "./Reveal";
import { servicePath, type Category, type Service } from "@/config/services";

/** The service card grid used on the homepage, the services hub and every category and service page. */
export function ServiceGrid({ category, services = category.services }: { category: Category; services?: Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}>
          <a
            href={servicePath(category, s)}
            className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
          >
            <span className="grid h-14 w-14 place-items-center bg-white">
              {s.icon ? (
                <Image src={s.icon} alt="" width={36} height={36} />
              ) : (
                <span className="font-display text-2xl leading-none text-red" aria-hidden>
                  {String(category.services.indexOf(s) + 1).padStart(2, "0")}
                </span>
              )}
            </span>
            <h3 className="mt-5 font-display text-2xl uppercase leading-tight tracking-wide">{s.name}</h3>
            <p className="mt-3 flex-1 leading-relaxed">{s.summary}</p>
            <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
              See this service &rarr;
            </span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
