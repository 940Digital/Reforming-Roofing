"use client";

import { useState } from "react";
import { Roboto } from "next/font/google";
import { reviewAge, type GoogleReview } from "@/config/googleReviews";

// Google's review UI is set in Roboto; the cards use it so they read like the real thing.
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// Google gives reviewers without a photo a coloured initial; these are colours from that set.
const avatarColors = ["#5e35b1", "#00897b", "#d81b60", "#f4511e", "#3949ab", "#7cb342", "#c2185b", "#0288d1", "#6d4c41", "#8e24aa"];
const colorFor = (name: string) => avatarColors[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length];

// Google shows roughly this much before its "More" link.
const CUT = 260;

function Stars({ n }: { n: number }) {
  return (
    <span className="flex" role="img" aria-label={`${n} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden>
          <path fill={i < n ? "#fbbc04" : "#dadce0"} d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviewCard({ r, profileUrl }: { r: GoogleReview; profileUrl: string }) {
  const long = r.text.length > CUT;
  const [open, setOpen] = useState(false);
  const shown = long && !open ? r.text.slice(0, r.text.lastIndexOf(" ", CUT)) : r.text;
  const more = "font-medium text-[#1a73e8] hover:underline";

  return (
    <article className={`${roboto.className} rounded-lg border border-[#dadce0] bg-white p-4 text-[#202124] shadow-[0_1px_2px_rgba(60,64,67,0.15)]`}>
      <header className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white"
          style={{ background: colorFor(r.name) }}
          aria-hidden
        >
          {r.name.trim()[0].toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium leading-5">{r.name}</p>
          <p className="truncate text-xs leading-4 text-[#70757a]">{r.meta}</p>
        </div>
      </header>

      <div className="mt-3 flex items-center gap-2">
        <Stars n={r.stars} />
        <span className="text-xs text-[#70757a]">{reviewAge(r.date)}</span>
      </div>

      <p className="mt-2 whitespace-pre-line text-sm leading-5">
        {shown}
        {long && !open && (
          <>
            {"… "}
            <button type="button" onClick={() => setOpen(true)} className={more}>More</button>
          </>
        )}
        {r.truncated && (
          <>
            {" … "}
            <a href={profileUrl} target="_blank" rel="noopener" className={more}>More</a>
          </>
        )}
      </p>

      {(r.positive || r.services) && (!long || open) && (
        <dl className="mt-3 space-y-2 text-sm leading-5">
          {r.positive && (
            <div>
              <dt className="font-medium">Positive</dt>
              <dd>{r.positive}</dd>
            </div>
          )}
          {r.services && (
            <div>
              <dt className="font-medium">Services</dt>
              <dd>{r.services}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

/** The rating summary that sits above Google's review list. */
export function GoogleRatingSummary({ rating, count, url }: { rating: number; count: number; url: string }) {
  return (
    <div className={`${roboto.className} flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-[#dadce0] bg-white px-5 py-4 text-[#202124]`}>
      <span className="text-5xl font-normal leading-none">{rating.toFixed(1)}</span>
      <div>
        <Stars n={Math.round(rating)} />
        <p className="mt-1 text-sm text-[#70757a]">{count} reviews on Google</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="ml-auto rounded-full border border-[#dadce0] px-4 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f8fbff]"
      >
        See all reviews on Google
      </a>
    </div>
  );
}
