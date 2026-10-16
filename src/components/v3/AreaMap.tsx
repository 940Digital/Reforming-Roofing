"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Band } from "./Band";
import { Marker, Unfold, ease } from "./Motion";

// Equirectangular projection over the map extent, with longitude scaled by cos(33°) so distances look right at this latitude.
const W = { lonMin: -97.45, lonMax: -96.25, latMin: 32.86, latMax: 33.45 };
const K = 900;
const LONS = Math.cos((33 * Math.PI) / 180);
const x = (lon: number) => (lon - W.lonMin) * LONS * K;
const y = (lat: number) => (W.latMax - lat) * K;
const VW = Math.round(x(W.lonMax));
const VH = Math.round(y(W.latMin));

// County lines are simplified to their bounding boxes; both counties are close to rectangles.
const counties = [
  { name: "Denton County", w: -97.3982, e: -96.8337, n: 33.4051, s: 32.9868 },
  { name: "Collin County", w: -96.8437, e: -96.2957, n: 33.4052, s: 32.9818 },
];

// City centers (approximate lat/lon). Label side is chosen per city to avoid collisions in the cluster.
type City = { name: string; lat: number; lon: number; side: "r" | "l" | "t" | "b"; offMap?: boolean };
const cities: City[] = [
  { name: "Denton", lat: 33.2148, lon: -97.1331, side: "l" },
  { name: "Aubrey", lat: 33.3043, lon: -96.9864, side: "r" },
  { name: "Cross Roads", lat: 33.2213, lon: -96.9947, side: "t" },
  { name: "Corinth", lat: 33.154, lon: -97.0647, side: "l" },
  { name: "Little Elm", lat: 33.1626, lon: -96.9375, side: "b" },
  { name: "Prosper", lat: 33.2362, lon: -96.8011, side: "r" },
  { name: "Frisco", lat: 33.1507, lon: -96.8236, side: "r" },
  { name: "McKinney", lat: 33.1972, lon: -96.6398, side: "r" },
  { name: "The Colony", lat: 33.089, lon: -96.8864, side: "l" },
  { name: "Lewisville", lat: 33.0462, lon: -96.9942, side: "l" },
  { name: "Flower Mound", lat: 33.0146, lon: -97.097, side: "l" },
  { name: "Grapevine", lat: 32.9343, lon: -97.0781, side: "r" },
  { name: "Southlake", lat: 32.9412, lon: -97.1342, side: "l" },
  // Fort Worth sits southwest of the frame, so it gets an edge marker with an arrow.
  { name: "Fort Worth", lat: 32.7555, lon: -97.3308, side: "r", offMap: true },
];

const EDGE = { cx: 34, cy: VH - 30 };
const pos = (c: City) => (c.offMap ? EDGE : { cx: x(c.lon), cy: y(c.lat) });

const labelPos = (c: City) => {
  const { cx, cy } = pos(c);
  switch (c.side) {
    case "l":
      return { tx: cx - 24, ty: cy + 7, anchor: "end" as const };
    case "t":
      return { tx: cx, ty: cy - 26, anchor: "middle" as const };
    case "b":
      return { tx: cx, ty: cy + 42, anchor: "middle" as const };
    default:
      return { tx: cx + 24, ty: cy + 7, anchor: "start" as const };
  }
};

export function AreaMap() {
  const reduce = useReducedMotion();
  const view = { once: false, amount: 0.3 } as const;

  return (
    <section aria-labelledby="area-h">
      <Band id="service-area" n="06" label="Service area" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Unfold className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="area-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            Denton and Collin Counties
          </h2>
          <p className="text-lg text-navy/75 md:text-right">And the towns around them. Not listed? Call and ask.</p>
        </Unfold>

        <div className="mt-10 grid gap-px border border-hair bg-hair lg:grid-cols-[2fr_1fr]">
          <figure className="bg-white p-4 md:p-6">
            <svg viewBox={`0 0 ${VW} ${VH}`} className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
              <title id="map-title">Service area map</title>
              <desc id="map-desc">Map of Denton and Collin Counties, Texas, marking the fourteen communities Roofing Reformation serves most.</desc>

              {counties.map((c, i) => (
                <g key={c.name}>
                  <motion.rect
                    x={x(c.w)}
                    y={y(c.n)}
                    width={x(c.e) - x(c.w)}
                    height={y(c.s) - y(c.n)}
                    fill={i === 0 ? "#E5F0FE" : "#F3EEDF"}
                    stroke="#095798"
                    strokeWidth={2}
                    initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
                    whileInView={{ pathLength: 1, fillOpacity: 1 }}
                    viewport={view}
                    transition={{ duration: 1.2, ease, delay: i * 0.2 }}
                  />
                  <text x={x(c.w) + 16} y={y(c.n) + 32} className="fill-blue text-[19px] font-semibold uppercase tracking-[0.12em]">
                    {c.name}
                  </text>
                </g>
              ))}

              {cities.map((c, i) => {
                const { tx, ty, anchor } = labelPos(c);
                const { cx, cy } = pos(c);
                return (
                  <motion.g
                    key={c.name}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={view}
                    transition={{ duration: 0.4, ease, delay: 0.9 + i * 0.07 }}
                  >
                    {c.offMap && <path d={`M${cx - 6} ${cy + 6} l-18 18 m0 -10 v10 h10`} stroke="#B42335" strokeWidth={2.5} fill="none" />}
                    <circle cx={cx} cy={cy} r={17} fill="#B42335" stroke="#fff" strokeWidth={2.5} />
                    <text x={cx} y={cy + 6} textAnchor="middle" className="fill-white text-[16px] font-bold">
                      {i + 1}
                    </text>
                    <text x={tx} y={ty} textAnchor={anchor} className="hidden fill-navy text-[21px] font-semibold md:inline">
                      {c.offMap ? `${c.name} (southwest)` : c.name}
                    </text>
                  </motion.g>
                );
              })}

              {/* north arrow */}
              <g transform={`translate(${VW - 40} ${VH - 70})`} className="fill-navy/60">
                <path d="M0 -22 L8 6 L0 0 L-8 6 Z" />
                <text y={26} textAnchor="middle" className="text-[13px] font-semibold">N</text>
              </g>
            </svg>
            <figcaption className="mt-2 text-xs text-navy/60">County lines simplified. Markers show approximate town centers.</figcaption>
          </figure>

          <ol className="grid grid-cols-2 content-start gap-x-4 bg-white p-6 md:p-8">
            {cities.map((c, i) => (
              <li key={c.name} className="flex items-center gap-3 border-b border-hair py-2.5">
                <Marker n={i + 1} size="sm" />
                <span className="whitespace-nowrap font-semibold">{c.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
