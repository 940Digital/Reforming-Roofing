"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";

const trust = ["Veteran-owned", "Serving since 2019", "Owners on every job", "Warranty-backed"];

export function Hero() {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: reduce ? false : { clipPath: "inset(0 0 100% 0)", y: 28 },
    animate: { clipPath: "inset(0 0 0% 0)", y: 0 },
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const, delay: 0.15 + i * 0.14 },
  });
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay: d },
  });

  return (
    <section id="top" className="dark-ground relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 -z-10">
        {reduce ? (
          <Image
            src="/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png"
            alt="Finished home with a gray shingle roof and a standing seam metal roof over the front entry, in Texas open country"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_50%]"
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
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/25 md:to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />
        {/* diagonal corner cuts carried over from the old site banners */}
        <div className="absolute left-0 top-0 h-28 w-28 bg-red [clip-path:polygon(0_0,100%_0,0_100%)] md:h-44 md:w-44" />
        <div className="absolute bottom-0 right-0 h-28 w-28 bg-blue [clip-path:polygon(100%_0,100%_100%,0_100%)] md:h-52 md:w-52" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-40 pt-36 md:px-8 md:pt-40">
        <motion.p {...fade(0)} className="eyebrow !text-white [--marker:#fff]">
          {business.tagline}
        </motion.p>

        <h1 className="h-display mt-5 text-[clamp(3.1rem,9.5vw,8.2rem)]">
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(0)}>Roofing contractor</motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(1)}>
              in <span className="text-[#ff9aa7]">Denton, TX</span>
            </motion.span>
          </span>
        </h1>

        <motion.p {...fade(0.55)} className="mt-6 max-w-xl text-lg leading-relaxed text-white md:text-xl">
          Residential and commercial roofing across Denton and Collin Counties. The owners run every job. You deal with the people who answer for the work.
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn btn-red">Get a free inspection</a>
          <a href={business.phoneHref} className="btn btn-line">Call {business.phoneDisplay}</a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t-4 border-red bg-navy">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-1 px-5 py-4 md:grid-cols-4 md:px-8 md:py-5">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2 whitespace-nowrap font-display text-[0.78rem] uppercase tracking-[0.06em] md:gap-3 md:text-lg md:tracking-[0.12em]">
              <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-red" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
