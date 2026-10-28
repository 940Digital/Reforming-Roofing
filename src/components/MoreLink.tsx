import { Reveal } from "./Reveal";

/** Props shared by homepage sections that also appear on their own page. */
export type SectionProps = {
  /** Colour of the section above, for the slanted seam. */
  prev?: string;
  /** Show the link to the section's own page (homepage only). */
  more?: boolean;
};

export function MoreLink({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <Reveal className="mt-10">
      <a href={href} className={`btn ${dark ? "btn-red" : "btn-navy"}`}>
        {label} &rarr;
      </a>
    </Reveal>
  );
}
