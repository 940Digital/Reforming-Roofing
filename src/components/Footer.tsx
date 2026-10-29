import Image from "next/image";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav";

const services = navLinks.find((l) => l.children)!;
const company = navLinks.filter((l) => !l.children);

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

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-white [--marker:#b42335]">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

const link = "text-white/85 transition-colors hover:text-white hover:underline decoration-red decoration-2 underline-offset-4";

export function Footer() {
  return (
    <footer className="dark-ground relative isolate overflow-hidden border-t-8 border-red bg-[#021f3d] text-white">
      <Image src="/assets/original/860db2_15a8b429d8324dac8b658cd9b42aad17.jpeg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-15" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <a href="/" aria-label={`${business.name}, home`} className="inline-flex items-center gap-4">
            <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={60} height={57} />
            <span className="font-display text-2xl uppercase leading-none tracking-[0.08em]">{business.name}</span>
          </a>
          <p className="mt-5 max-w-xs leading-relaxed text-white/80">
            {business.tagline} Veteran-owned roofing for homes and businesses in Denton and Collin Counties.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${business.name} on ${s.name ?? s.label}`}
                    title={s.name ?? s.label}
                    className="grid h-11 w-11 place-items-center bg-white/10 text-white transition-colors [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] hover:bg-red"
                  >
                    {icons[s.label]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 lg:contents">
          <Column title="Company">
            <ul className="space-y-3">
              {company.map((l) => (
                <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>
              ))}
            </ul>
          </Column>

          <Column title="Services">
            <ul className="space-y-3">
              {services.children!.map((c) => (
                <li key={c.href}><a href={c.href} className={link}>{c.label}</a></li>
              ))}
              <li><a href={services.href} className={link}>All services</a></li>
            </ul>
          </Column>
        </div>

        <Column title="Call">
          <a href={business.phoneHref} className="font-display text-3xl tracking-wide hover:underline decoration-red decoration-2 underline-offset-4">
            {business.phoneDisplay}
          </a>
          {business.email && <p className="mt-2"><a href={`mailto:${business.email}`} className={link}>{business.email}</a></p>}
          <p className="mt-4 leading-relaxed text-white/80">Free inspection and estimate. Financing available.</p>
          <a href="/service-area" className={`mt-3 inline-block ${link}`}>Serving Denton and Collin Counties</a>
        </Column>
      </div>

      {/* extra bottom room on phones for the fixed call bar */}
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-5 pb-20 pt-5 text-sm text-white/65 md:px-8 md:pb-5">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
