import type { ReactNode } from "react";
import { business } from "@/config/business";

const icons: Record<string, ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z" />
    </svg>
  ),
  Google: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
      <path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z" />
      <path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z" />
    </svg>
  ),
};

// Only profiles with a URL in business.ts get an icon.
type Social = { label: string; href: string | null; name?: string };
const socials = ([
  { label: "Instagram", href: business.social.instagram },
  { label: "Facebook", href: business.social.facebook },
  { label: "Google", href: business.googleBusinessUrl, name: "Google Business Profile" },
] as Social[]).filter((s): s is Social & { href: string } => Boolean(s.href));

/** Square icon buttons for every profile that has a URL in business.ts. `light` is for pale backgrounds. */
export function SocialLinks({ className = "", light = false }: { className?: string; light?: boolean }) {
  if (socials.length === 0) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener"
            aria-label={`${business.name} on ${s.name ?? s.label}`}
            title={s.name ?? s.label}
            className={`grid h-11 w-11 place-items-center text-white transition-colors ${light ? "bg-navy" : "bg-white/10"} [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] hover:bg-red`}
          >
            {icons[s.label]}
          </a>
        </li>
      ))}
    </ul>
  );
}
