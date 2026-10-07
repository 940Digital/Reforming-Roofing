import Image from "next/image";
import { Reveal } from "./Reveal";
import { business } from "@/config/business";

export function FinalCta() {
  return (
    <section id="contact" className="dark-ground slant slant-r relative isolate overflow-hidden bg-navy pb-24 text-white md:pb-32" style={{ ["--prev" as string]: "#f3eedf" }}>
      <Image
        src="/assets/original/860db2_0f7ef833b12c4c22aebffb57abce12b9.jpeg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-navy/70" />
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="eyebrow justify-center text-white [--marker:#b42335]">Free estimate and inspection</p>
          <h2 className="h-display mt-4 text-5xl md:text-7xl">Get your roof looked at</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl">
            Call, and we schedule the inspection. You get an honest assessment from the owners&apos; team and a clear estimate. Financing is available.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={business.phoneHref} className="btn btn-red !px-10 !py-5 !text-2xl">Call {business.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
