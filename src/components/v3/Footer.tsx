import Image from "next/image";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav-v3";

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <Image src="/assets/original/78fd08_12370bdb4ecf4983b62af229cb0f18e9.png" alt="Roofing Reformation logo, a red Luther rose with a blue heart and the letter R" width={110} height={101} />
          <p className="mt-5 font-semibold">{business.tagline}</p>
          <p className="mt-2 text-cream/70">Residential and commercial roofing in Denton and Collin Counties, Texas.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/60">On this page</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="text-cream/85 hover:text-cream hover:underline">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/60">Call</h2>
          <p className="mt-4"><a href={business.phoneHref} className="text-2xl font-bold hover:underline">{business.phoneDisplay}</a></p>
          {business.email && <p className="mt-2"><a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a></p>}
        </div>
      </div>
      <div className="border-t border-white/15 py-6 text-center text-sm text-cream/60">&copy; {new Date().getFullYear()} {business.name}</div>
    </footer>
  );
}
