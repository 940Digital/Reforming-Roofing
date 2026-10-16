"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";
import { ease } from "./Motion";

const facts = ["Free roof inspections", "Owners oversee every job", "Veteran-owned", "Warranty-backed"];

export function Hero() {
  const reduce = useReducedMotion();
  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section id="top" className="relative">
      {/* the title band */}
      <div className="bg-navy pb-[18vh] pt-[150px] text-cream md:pb-[22vh] md:pt-[172px]">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.p {...up(0)} className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/70">
            {business.tagline}
          </motion.p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <motion.h1 {...up(0.12)} className="text-[clamp(2.6rem,6.6vw,5.4rem)] font-extrabold leading-[1.02] tracking-tight">
              Roofing contractor in Denton, TX
            </motion.h1>
            <motion.div {...up(0.28)}>
              <p className="max-w-md text-lg leading-relaxed text-cream/90">
                When hail comes through Denton and Collin Counties, call the local, veteran-owned crew whose owners oversee every job.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#request" className="bg-red px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-[#8f1a2a]">
                  Request a free inspection
                </a>
                <a href={business.phoneHref} className="px-6 py-4 text-center font-semibold ring-1 ring-inset ring-cream/60 transition-colors hover:bg-cream hover:text-navy">
                  Call {business.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* the video module, opening upward out of the band */}
      <div className="mx-auto -mt-[14vh] max-w-6xl px-5 md:-mt-[18vh] md:px-8">
        <motion.div
          className="relative aspect-[4/3] w-full overflow-hidden bg-navy sm:aspect-[16/8]"
          initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.1, ease, delay: 0.45 }}
        >
          {reduce ? (
            <Image
              src="/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png"
              alt="Finished home with a gray shingle roof and a standing seam metal roof over the front entry"
              fill
              priority
              sizes="(min-width:1152px) 1152px, 100vw"
              className="object-cover"
            />
          ) : (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/assets/video/hero-loop.mp4"
              poster="/assets/video/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Drone footage over finished roofs in Denton and Collin County neighborhoods"
            />
          )}
        </motion.div>
        <ul className="grid grid-cols-2 gap-px border border-hair bg-hair md:grid-cols-4">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-3 bg-white px-4 py-4 text-[0.95rem] font-semibold md:px-5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
