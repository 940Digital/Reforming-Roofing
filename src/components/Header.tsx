"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/config/business";
import { navLinks } from "@/config/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();
  const inSection = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // The phone-only contact bar waits until the hero (and its own buttons) has scrolled away.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header className="dark-ground fixed inset-x-0 top-0 z-50 bg-navy/95 backdrop-blur text-white border-b-4 border-red">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="/" className="flex items-center gap-3" aria-label={`${business.name}, home`}>
          <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={44} height={42} priority />
          <span className="font-display text-xl uppercase tracking-[0.08em] leading-none">
            Roofing Reformation
          </span>
        </a>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-7">
          {navLinks.map((l) => (
            <div key={l.href} className="group relative">
              <a href={l.href} aria-current={inSection(l.href) ? "page" : undefined} className="whitespace-nowrap font-display uppercase tracking-[0.12em] text-[0.95rem] text-white/90 hover:text-white hover:underline aria-[current=page]:underline decoration-red decoration-2 underline-offset-8">
                {l.label}
                {l.children && <span aria-hidden className="ml-1.5 inline-block text-[0.7em] text-white/70">&#9662;</span>}
              </a>
              {l.children && (
                // Opens on hover and on keyboard focus; the top padding bridges the gap so the menu stays open on the way down.
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-56 border-t-4 border-red bg-navy py-2 shadow-xl">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <a href={c.href} aria-current={pathname === c.href ? "page" : undefined} className="block whitespace-nowrap px-5 py-2.5 font-display uppercase tracking-[0.12em] text-[0.95rem] text-white/90 hover:bg-blue hover:text-white aria-[current=page]:text-white aria-[current=page]:underline decoration-red decoration-2 underline-offset-8">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* plays on the company name; the phone number lives on /contact and in the footer */}
          <a href="/contact" className="hidden md:inline-flex btn btn-red !py-2.5 !text-base">
            Reform my roof
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
              <a href={l.href} aria-current={inSection(l.href) ? "page" : undefined} onClick={() => setOpen(false)} className="block py-4 font-display text-3xl uppercase tracking-wide">
                {l.label}
              </a>
              {l.children && (
                <ul className="-mt-1 mb-4 ml-1 border-l-4 border-red pl-4">
                  {l.children.map((c) => (
                    <li key={c.href}>
                      <a href={c.href} aria-current={pathname === c.href ? "page" : undefined} onClick={() => setOpen(false)} className="block py-2 font-display text-xl uppercase tracking-wide text-white/85">
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a href={business.smsHref} className="btn btn-red">Text {business.phoneDisplay}</a>
          <a href={business.phoneHref} className="btn btn-line">Call instead</a>
        </div>
      </div>
      {/* phone-only contact bar: text first, call beside it */}
      <div
        aria-hidden={!pastHero || open}
        className={`fixed inset-x-0 bottom-0 z-40 flex border-t-4 border-red bg-navy font-display text-lg uppercase tracking-[0.08em] text-white transition-transform duration-300 md:hidden ${pastHero && !open ? "translate-y-0" : "translate-y-full"}`}
      >
        <a href={business.smsHref} tabIndex={pastHero && !open ? undefined : -1} className="flex flex-1 items-center justify-center gap-3 bg-red py-3.5">
          <span className="h-2.5 w-2.5 rotate-45 bg-white" aria-hidden />
          Text {business.phoneDisplay}
        </a>
        <a href={business.phoneHref} tabIndex={pastHero && !open ? undefined : -1} className="flex items-center px-5">
          Call
        </a>
      </div>
    </>
  );
}
