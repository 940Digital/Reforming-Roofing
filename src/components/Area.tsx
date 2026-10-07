import Image from "next/image";
import { Reveal } from "./Reveal";
import { business } from "@/config/business";

export function Area() {
  return (
    <section id="service-area" className="slant slant-r bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-red">Service area</p>
            <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Proudly serving Denton and Collin Counties</h2>
            <p className="mt-5 text-lg leading-relaxed">
              We work in these communities and the ones around them. If yours is not listed, call. We will tell you straight whether we can get to you.
            </p>
          </Reveal>
          <Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {business.serviceAreas.map((c) => (
                <li key={c} className="bg-navy px-4 py-2 font-display text-lg uppercase tracking-[0.08em] text-white [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)]">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="cut relative aspect-[1920/875] w-full bg-navy">
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
    </section>
  );
}
