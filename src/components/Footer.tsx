import Image from "next/image";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav";

export function Footer() {
  return (
    <footer className="dark-ground relative isolate overflow-hidden border-t-8 border-red bg-[#021f3d] text-white">
      <Image src="/assets/original/860db2_15a8b429d8324dac8b658cd9b42aad17.jpeg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Image src="/assets/original/78fd08_12370bdb4ecf4983b62af229cb0f18e9.png" alt="Roofing Reformation logo, a red Luther rose with a blue heart and the letter R" width={140} height={128} />
          <p className="mt-4 font-display text-xl uppercase tracking-[0.08em]">{business.tagline}</p>
          <p className="mt-2 text-white/80">Residential and commercial roofing in Denton and Collin Counties, Texas.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow text-white [--marker:#b42335]">On this page</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/90 hover:underline">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow text-white [--marker:#b42335]">Call</h2>
          <p className="mt-4"><a href={business.phoneHref} className="font-display text-3xl tracking-wide hover:underline">{business.phoneDisplay}</a></p>
          {business.email && <p className="mt-2"><a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a></p>}
          <p className="mt-4 text-white/80">Proudly serving Denton and Collin Counties.</p>
        </div>
      </div>
      <div className="border-t border-white/15 px-5 py-5 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
