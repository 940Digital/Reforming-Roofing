import { Reveal } from "./Reveal";

const bgClass = { cream: "bg-cream", paper: "bg-paper" };

export function Faq({
  items,
  bg,
  prev,
  title = "Common questions",
}: {
  items: [question: string, answer: string][];
  bg: keyof typeof bgClass;
  prev: string;
  title?: string;
}) {
  return (
    <section className={`slant slant-r ${bgClass[bg]} pb-20 md:pb-28`} style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-red">FAQ</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">{title}</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-10 border-t-4 border-navy">
            {items.map(([q, a]) => (
              <li key={q} className="border-b border-navy/20">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl uppercase tracking-wide text-navy md:text-2xl [&::-webkit-details-marker]:hidden">
                    {q}
                    <span className="text-3xl leading-none text-red transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="pb-6 text-lg leading-relaxed">{a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
