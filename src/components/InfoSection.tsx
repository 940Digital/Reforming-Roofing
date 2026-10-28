import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

const bgClass = { cream: "bg-cream", paper: "bg-paper" };

/** A plain light section for page-only copy. */
export function InfoSection({
  eyebrow,
  title,
  bg,
  prev,
  children,
}: {
  eyebrow: string;
  title: string;
  bg: keyof typeof bgClass;
  prev: string;
  children: ReactNode;
}) {
  return (
    <section className={`slant ${bgClass[bg]} pb-20 md:pb-28`} style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">{eyebrow}</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">{title}</h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
