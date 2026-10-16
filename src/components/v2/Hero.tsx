"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 -z-10">
        {reduce ? (
          <Image
            src="/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png"
            alt="Finished home with a gray shingle roof and a standing seam metal roof over the front entry, in Texas open country"
            fill
            priority
            sizes="100vw"
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
        <div className="absolute inset-0 bg-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/50" />
      </div>

      <div className="wrap w-full pb-20 pt-40 md:pb-28">
        <motion.div {...up(0)} className="flex items-center gap-4">
          <motion.span
            className="block h-px w-12 origin-left bg-white/80"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            aria-hidden
          />
          <span className="text-[0.8rem] uppercase tracking-[0.24em] text-white/85">{business.tagline}</span>
        </motion.div>

        <motion.h1 {...up(0.35)} className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,7.5vw,6rem)] leading-[1.04]">
          Roofing contractor in Denton, TX
        </motion.h1>

        <motion.p {...up(0.6)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
          Homes and businesses across Denton and Collin Counties. The owners are on every job.
        </motion.p>

        <motion.div {...up(0.8)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="sbtn sbtn-red">Book a free inspection</a>
          <a href={business.phoneHref} className="sbtn sbtn-ghost">Call {business.phoneDisplay}</a>
        </motion.div>
      </div>
    </section>
  );
}
