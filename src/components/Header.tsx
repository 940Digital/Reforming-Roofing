"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav";

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
    <header className="dark-ground fixed inset-x-0 top-0 z-50 bg-navy/95 backdrop-blur text-white border-b-4 border-red">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={`${business.name}, back to top`}>
          <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={44} height={42} priority />
          <span className="font-display text-xl uppercase tracking-[0.08em] leading-none">
            Roofing Reformation
          </span>
        </a>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="whitespace-nowrap font-display uppercase tracking-[0.12em] text-[0.95rem] text-white/90 hover:text-white hover:underline decoration-red decoration-2 underline-offset-8">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={business.phoneHref} className="hidden md:inline-flex btn btn-red !py-2.5 !text-base">
            {business.phoneDisplay}
          </a>
          <button
            type="button"
            className="xl:hidden grid h-11 w-11 place-items-center"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-7">
              <span className={`absolute left-0 h-[3px] w-7 bg-white transition-all ${open ? "top-[6px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-[6px] h-[3px] w-7 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[3px] w-7 bg-white transition-all ${open ? "top-[6px] -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

    </header>
      <div
        id="mobile-menu"
        hidden={!open}
        className="dark-ground fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-navy px-6 py-8 text-white xl:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-white/15">
              <a href={l.href} onClick={() => setOpen(false)} className="block py-4 font-display text-3xl uppercase tracking-wide">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-red">Get a free inspection</a>
          <a href={business.phoneHref} className="btn btn-line">Call {business.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}
