"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** One shared reveal for every section below the hero. Reverses on scroll back up. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "blockquote";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </M>
  );
}

/** Poster-print wipe: a frame that uncovers along a diagonal. Used on photos.
 *  The in-view check watches the unclipped outer box so the wipe can reverse and replay. */
export function Wipe({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: reduce || inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1], delay: inView ? delay : 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
