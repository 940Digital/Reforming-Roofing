import Image from "next/image";
import { Reveal } from "./Motion";
import { business } from "@/config/business";

export function Area() {
  return (
    <section id="service-area" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:gap-20">
        <Reveal className="frame relative order-2 aspect-square w-full lg:order-1">
          <Image
            src="/assets/original/9a58ba_c7219f7c60f847f88647c1bb1cea2964.png"
            alt="Close aerial view of a complex gabled roof with dormers and chimneys covered in charcoal shingles"
            fill
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="peg-label">Service area</p>
            <h2 className="h2 mt-6">Denton and Collin Counties</h2>
            <p className="lede mt-6">
              These are the communities we serve most. If yours is close and not listed, call and ask.
            </p>
          </Reveal>
          <Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-x-10 border-t border-rule">
              {business.serviceAreas.map((c) => (
                <li key={c} className="border-b border-rule py-3 text-lg">{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
