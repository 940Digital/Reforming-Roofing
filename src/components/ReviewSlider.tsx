"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleReviewCard } from "./GoogleReviewCard";
import type { GoogleReview } from "@/config/googleReviews";

const INTERVAL = 6000;

/** How many cards fit side by side at the current width. */
function useVisible() {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const lg = matchMedia("(min-width: 1024px)");
    const sm = matchMedia("(min-width: 640px)");
    const update = () => setVisible(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return visible;
}

/**
 * Homepage review carousel. Advances one card every few seconds and loops back to the start.
 * Holds still while the visitor hovers, focuses or reads inside it, while the tab is hidden,
 * and entirely for visitors who ask for reduced motion.
 */
export function ReviewSlider({ reviews, profileUrl }: { reviews: GoogleReview[]; profileUrl: string }) {
  const visible = useVisible();
  const stops = Math.max(1, reviews.length - visible + 1);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [reduce, setReduce] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % stops) + stops) % stops), [stops]);

  useEffect(() => setIndex((i) => Math.min(i, stops - 1)), [stops]);

  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (held || reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % stops);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [held, reduce, stops]);

  const btn =
    "flex h-11 w-11 items-center justify-center bg-navy text-white transition-colors hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Google reviews"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(root.current?.contains(document.activeElement) ?? false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHeld(false)}
      // Phones: hold while a finger is on it, and a sideways swipe moves one card.
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setHeld(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        if (start !== null) {
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }
        setHeld(false);
      }}
    >
      <div className="-mx-2 touch-pan-y overflow-hidden">
        <ul
          className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
        >
          {reviews.map((r, i) => {
            const shown = i >= index && i < index + visible;
            return (
              <li
                key={r.name}
                className="shrink-0 px-2"
                style={{ flexBasis: `${100 / visible}%` }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${reviews.length}`}
                aria-hidden={!shown}
                inert={!shown}
              >
                <GoogleReviewCard r={r} profileUrl={profileUrl} compact />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button type="button" className={`${btn} cut`} onClick={() => go(index - 1)} aria-label="Previous reviews">&larr;</button>
        <button type="button" className={`${btn} cut-br`} onClick={() => go(index + 1)} aria-label="Next reviews">&rarr;</button>
        <div className="ml-2 flex items-center gap-3">
          <div className="relative h-1.5 w-28 bg-navy/15 sm:w-40" aria-hidden>
            <div
              className="absolute inset-y-0 bg-red transition-all duration-700"
              style={{ left: `${(index / reviews.length) * 100}%`, width: `${(visible / reviews.length) * 100}%` }}
            />
          </div>
          <p className="font-display text-sm uppercase tracking-[0.14em] text-navy" aria-live="polite">
            {index + 1}
            {visible > 1 ? `\u2013${index + visible}` : ""} of {reviews.length}
          </p>
        </div>
      </div>
    </div>
  );
}
