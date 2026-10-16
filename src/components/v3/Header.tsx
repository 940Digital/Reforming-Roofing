"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav-v3";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-9 z-50 border-b border-white/10 bg-navy text-cream">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label={`${business.name}, back to top`}>
            <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={40} height={38} priority />
            <span className="text-[1.05rem] font-bold tracking-tight">Roofing Reformation</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.95rem] text-cream/80 transition-colors hover:text-cream">
                {l.label}
              </a>
            ))}
            <a href={business.phoneHref} className="bg-red px-4 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#8f1a2a]">
              {business.phoneDisplay}
            </a>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu-v3"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-6">
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </header>

      <div id="mobile-menu-v3" hidden={!open} className="fixed inset-x-0 bottom-0 top-[108px] z-40 overflow-y-auto bg-navy px-5 pb-10 pt-4 text-cream lg:hidden">
        <ul className="divide-y divide-white/15 border-b border-white/15">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-5 text-2xl font-bold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a href="#request" onClick={() => setOpen(false)} className="bg-red px-6 py-4 text-center font-semibold text-white">Request a free inspection</a>
          <a href={business.phoneHref} className="px-6 py-4 text-center font-semibold ring-1 ring-inset ring-cream/60">Call {business.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}
