"use client";

import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { categoryHref, serviceGroups } from "@/config/services";

const roofing = serviceGroups[0];

/** Homepage Roofing card. On desktop the text panel starts over the photo, on the left,
 *  and slides right into place to reveal it. Replays on scroll like the other reveals. */
export function RoofingFeature() {
  const ref = useRef<HTMLAnchorElement>(null);
  const shown = useInView(ref, { once: false, amount: 0.35 });

  return (
    <a
      ref={ref}
      href={categoryHref(roofing.id)}
      className="dark-ground group relative grid overflow-hidden bg-navy text-white lg:grid-cols-[1.2fr_1fr]"
    >
      {/* The photo unclips on the same timing as the panel, so its visible edge tracks the panel's left edge */}
      <div className={`slide-photo relative min-h-64 bg-blue md:min-h-80 [clip-path:inset(0_0_0_0)] ${shown ? "" : "lg:[clip-path:inset(0_100%_0_0)]"}`}>
        <Image
          src="/assets/original/860db2_cf892d60ac384833bfd92f879f2f16af.png"
          alt="Aerial view of a finished gray shingle roof on a single-story home with mature trees and a curved walkway"
          fill
          sizes="(min-width:1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
      {/* 120% = the photo column's width (1.2fr against 1fr), so the panel starts flush left */}
      <div
        className={`slide-panel relative z-10 flex flex-col justify-center bg-navy p-7 group-hover:bg-blue md:p-12 ${
          shown ? "" : "lg:-translate-x-[120%]"
        }`}
      >
        <p className="eyebrow text-white [--marker:#b42335]">Our main service</p>
        <h3 className="h-display mt-3 text-5xl md:text-7xl">{roofing.name}</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">{roofing.lead}</p>
        <span className="mt-8 font-display text-lg uppercase tracking-[0.14em] text-[#ff9aa7]">
          See roofing services <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </a>
  );
}
