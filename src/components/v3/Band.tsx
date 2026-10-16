import type { ReactNode } from "react";

/** Recurrence 1: the Unigrid title band that opens each major section. */
export function Band({ id, n, label, children }: { id?: string; n: string; label: string; children?: ReactNode }) {
  return (
    <div id={id} className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <p className="flex items-baseline gap-4 text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="text-cream/50">{n}</span>
          <span>{label}</span>
        </p>
        {children}
      </div>
    </div>
  );
}
