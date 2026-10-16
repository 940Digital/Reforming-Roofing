"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** The one shared reveal: slow fade and a short rise. Reverses on scroll back up. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Recurrence 1: the peg rail. The hairline draws left to right, then the pegs fade in where they sit.
 *  One in-view check on a taller wrapper drives both, so a 1px line can't flicker the trigger. */
export function PegRail({ className = "", pegs = 5, tone = "navy" }: { className?: string; pegs?: number; tone?: "navy" | "cream" }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const shown = reduce || inView;
  const line = tone === "navy" ? "bg-navy/25" : "bg-cream/40";
  const peg = tone === "navy" ? "bg-navy/40" : "bg-cream/60";
  return (
    <div className={`wrap ${className}`} aria-hidden>
      <div ref={ref} className="relative h-6">
        <motion.div
          className={`absolute inset-x-0 top-1/2 h-px origin-left ${line}`}
          initial={false}
          animate={{ scaleX: shown ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 1.2, ease }}
        />
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-[8%]">
          {Array.from({ length: pegs }).map((_, i) => (
            <motion.span
              key={i}
              className={`block h-[7px] w-[7px] rounded-full ${i === Math.floor(pegs / 2) ? "bg-red" : peg}`}
              initial={false}
              animate={{ opacity: shown ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease, delay: shown && !reduce ? 0.5 + (i / pegs) * 0.6 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
