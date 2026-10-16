"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav-v2";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-9 z-50 transition-colors duration-500 ${
          solid ? "bg-cream text-navy shadow-[0_1px_0_rgba(4,45,88,0.12)]" : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label={`${business.name}, back to top`}>
            <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={38} height={36} priority />
            <span className="font-serif text-lg">Roofing Reformation</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.95rem] opacity-85 transition-opacity hover:opacity-100">
                {l.label}
              </a>
            ))}
            <a href={business.phoneHref} className="text-[0.95rem] font-medium">
              {business.phoneDisplay}
            </a>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </header>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-[108px] z-40 overflow-y-auto bg-cream px-6 pb-10 pt-6 lg:hidden">
        <ul>
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-rule">
              <a href={l.href} onClick={() => setOpen(false)} className="block py-5 font-serif text-3xl">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3">
          <a href="#contact" onClick={() => setOpen(false)} className="sbtn sbtn-red">Book a free inspection</a>
          <a href={business.phoneHref} className="sbtn sbtn-ghost-dark">Call {business.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}
