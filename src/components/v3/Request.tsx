"use client";

import { useState, type FormEvent } from "react";
import { Band } from "./Band";
import { Unfold } from "./Motion";
import { business } from "@/config/business";

type Status = { kind: "idle" | "sending" | "done" | "error"; text?: string };

const field = "mt-2 w-full border border-navy/35 bg-white px-4 py-3 text-base text-navy placeholder:text-navy/45 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30";

export function Request() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/inspection", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = (await res.json()) as { ok: boolean; message: string };
      setStatus({ kind: body.ok ? "done" : "error", text: body.message });
    } catch {
      setStatus({ kind: "error", text: `That didn't go through. Please call ${business.phoneDisplay}.` });
    }
  }

  return (
    <section aria-labelledby="request-h">
      <Band id="request" n="08" label="Free inspection" />
      <div className="mx-auto grid max-w-6xl gap-px px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <Unfold className="bg-navy p-8 text-cream md:p-10">
          <h2 id="request-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.6rem]">
            Request a free inspection
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/85">
            Tell us where you are and what is going on. We will set a time, look at the roof and give you an honest assessment and a clear estimate. Financing is available.
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-cream/60">Or call</p>
          <a href={business.phoneHref} className="mt-2 inline-block text-3xl font-extrabold tracking-tight hover:underline">
            {business.phoneDisplay}
          </a>
        </Unfold>

        <Unfold delay={0.1} className="border border-hair bg-white p-8 md:p-10">
          <form onSubmit={onSubmit} noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block text-sm font-semibold">
                Phone
                <input name="phone" type="tel" required autoComplete="tel" className={field} />
              </label>
            </div>
            <label className="mt-5 block text-sm font-semibold">
              City
              <select name="city" required defaultValue="" className={field}>
                <option value="" disabled>Choose your city</option>
                {business.serviceAreas.map((c) => (
                  <option key={c}>{c}</option>
                ))}
                <option>Somewhere else nearby</option>
              </select>
            </label>
            <label className="mt-5 block text-sm font-semibold">
              What is going on with the roof?
              <textarea name="message" rows={4} className={field} placeholder="Hail last week, a leak over the kitchen, an old roof, anything." />
            </label>
            {/* honeypot: hidden from people, tempting to bots */}
            <label className="absolute -left-[9999px]" aria-hidden>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="mt-7 w-full bg-red px-6 py-4 font-semibold text-white transition-colors hover:bg-[#8f1a2a] disabled:opacity-60 sm:w-auto"
            >
              {status.kind === "sending" ? "Sending..." : "Request my free inspection"}
            </button>
            <p role="status" aria-live="polite" className={`mt-4 min-h-[1.5rem] font-semibold ${status.kind === "error" ? "text-red" : "text-navy"}`}>
              {status.text}
            </p>
          </form>
        </Unfold>
      </div>
    </section>
  );
}
