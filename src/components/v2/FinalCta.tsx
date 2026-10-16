import { PegRail, Reveal } from "./Motion";
import { business } from "@/config/business";

export function FinalCta() {
  return (
    <section id="contact" className="section">
      <PegRail className="mb-24 md:mb-32" pegs={7} />
      <div className="wrap text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="peg-label justify-center">Free inspection and estimate</p>
          <h2 className="mt-6 font-serif text-[2.5rem] leading-[1.1] md:text-[4rem]">Have us look at your roof.</h2>
          <p className="lede mx-auto mt-6">
            Call and we will set a time. You get an honest assessment and a clear estimate. Financing is available.
          </p>
          <div className="mt-10 flex justify-center">
            <a href={business.phoneHref} className="sbtn sbtn-red !px-10 !py-5 !text-lg">Call {business.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
