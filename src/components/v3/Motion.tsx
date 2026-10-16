"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.25, 0.8, 0.25, 1] as const;

/** Modules unfold into the grid: fade plus a short rise. Reverses on scroll back up. */
export function Unfold({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Recurrence 3: round red marker with a white numeral. */
export function Marker({ n, size = "md" }: { n: number; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "h-6 w-6 text-[0.75rem]" : "h-9 w-9 text-base";
  return (
    <span className={`inline-grid shrink-0 place-items-center rounded-full bg-red font-bold text-white ${dims}`} aria-hidden>
      {n}
    </span>
  );
}
