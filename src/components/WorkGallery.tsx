"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, Wipe } from "./Reveal";
import type { WorkJob } from "@/config/work";

/** Columns for a job's thumbnail row, chosen so no row is left half full. */
function thumbCols(n: number) {
  const mobile = n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : n;
  return { mobile: Math.min(mobile, 3), desktop: Math.min(n, 6) };
}

/** Every finished job: lead photo, a short note, then the rest of the set. Any photo opens full size. */
export function WorkGallery({ jobs }: { jobs: WorkJob[] }) {
  const [open, setOpen] = useState<{ job: number; photo: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const show = (job: number, photo: number) => {
    setOpen({ job, photo });
    dialog.current?.showModal();
  };
  const step = useCallback(
    (d: number) =>
      setOpen((o) => {
        if (!o) return o;
        const n = jobs[o.job].photos.length;
        return { ...o, photo: (o.photo + d + n) % n };
      }),
    [jobs],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = open && jobs[open.job];
  const photo = current && current.photos[open.photo];

  return (
    <>
      <ol className="space-y-20 md:space-y-28">
        {jobs.map((job, j) => {
          const [lead, ...rest] = job.photos;
          const cols = thumbCols(rest.length);
          const flip = j % 2 === 1;
          // A lone second photo sits above the text instead of stretching across a row of its own.
          const side = rest.length === 1 ? rest[0] : null;
          return (
            <li key={job.id} id={job.id} className="scroll-mt-28">
              <div className="grid items-end gap-8 lg:grid-cols-12">
                <Reveal className={`lg:col-span-4 ${flip ? "lg:order-2" : ""}`}>
                  {side && (
                    <button
                      type="button"
                      onClick={() => show(j, 1)}
                      className="group relative mb-8 block aspect-[16/9] w-full overflow-hidden bg-navy"
                      aria-label={`Open photo: ${side.alt}`}
                    >
                      <Image
                        src={side.src}
                        alt={side.alt}
                        fill
                        sizes="(min-width:1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </button>
                  )}
                  <p className="eyebrow text-red">Photographed {job.shot}</p>
                  <h2 className="h-display mt-4 text-3xl text-navy md:text-5xl">{job.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed">{job.blurb}</p>
                  <p className="mt-4 font-display text-sm uppercase tracking-[0.14em] text-navy/70">
                    {job.photos.length} photos
                  </p>
                </Reveal>
                <Wipe className={`lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
                  <button
                    type="button"
                    onClick={() => show(j, 0)}
                    className={`group relative block aspect-[16/9] w-full overflow-hidden bg-navy ${flip ? "cut-br" : "cut"}`}
                    aria-label={`Open photo: ${lead.alt}`}
                  >
                    <Image
                      src={lead.src}
                      alt={lead.alt}
                      fill
                      sizes="(min-width:1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                </Wipe>
              </div>

              {rest.length > 1 && (
                <ul
                  className="mt-4 grid gap-3 md:mt-5 md:gap-4 [grid-template-columns:repeat(var(--m),minmax(0,1fr))] md:[grid-template-columns:repeat(var(--d),minmax(0,1fr))]"
                  style={{ ["--m" as string]: cols.mobile, ["--d" as string]: cols.desktop }}
                >
                  {rest.map((ph, i) => (
                    <Reveal as="li" key={ph.src} delay={i * 0.05}>
                      <button
                        type="button"
                        onClick={() => show(j, i + 1)}
                        className="group relative block aspect-[16/9] w-full overflow-hidden bg-navy"
                        aria-label={`Open photo: ${ph.alt}`}
                      >
                        <Image
                          src={ph.src}
                          alt={ph.alt}
                          fill
                          sizes={`(min-width:768px) ${Math.round(100 / cols.desktop)}vw, ${Math.round(100 / cols.mobile)}vw`}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      </button>
                    </Reveal>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <dialog
        ref={dialog}
        data-close
        onClose={() => setOpen(null)}
        onClick={(e) => (e.target as HTMLElement).dataset.close !== undefined && dialog.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy/[.97]"
        aria-label={current ? current.title : "Photo"}
      >
        {current && photo && (
          <figure data-close className="flex h-[100dvh] w-screen flex-col justify-center px-3 py-16 md:px-16">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl max-h-[78dvh]">
              <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <figcaption className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 text-white">
              <span className="text-base text-white/90 md:text-lg">{photo.alt}</span>
              <span className="font-display uppercase tracking-[0.14em] text-white/70">
                {open.photo + 1} / {current.photos.length}
              </span>
            </figcaption>
            <div className="fixed right-3 top-3 flex gap-2 md:right-6 md:top-6">
              {current.photos.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="btn btn-line !px-4" aria-label="Previous photo">&larr;</button>
                  <button type="button" onClick={() => step(1)} className="btn btn-line !px-4" aria-label="Next photo">&rarr;</button>
                </>
              )}
              <button type="button" onClick={() => dialog.current?.close()} className="btn btn-red !px-4" aria-label="Close">
                Close
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
