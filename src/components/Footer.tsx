import Image from "next/image";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav";
import { SocialLinks } from "./SocialLinks";

const services = navLinks.find((l) => l.children)!;
const company = navLinks.filter((l) => !l.children);

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
            {business.tagline} Veteran-owned roofing for homes in Denton and Collin Counties.
          </p>
          <SocialLinks className="mt-6" />
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
