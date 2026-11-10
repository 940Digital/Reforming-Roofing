"use client";

import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { business } from "@/config/business";
import { track } from "@/lib/analytics";

// The ALTCHA widget is a custom element loaded from /js/altcha.min.js.
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        challenge?: string;
        name?: string;
        hidelogo?: boolean;
      };
    }
  }
}

const field = "mt-2 block w-full border-2 border-navy/20 bg-white px-4 py-3 text-lg text-ink placeholder:text-ink/40 focus:border-blue focus:outline-none";
const label = "font-display text-sm uppercase tracking-[0.14em] text-navy";

type Status = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

/**
 * `mock`: shown while the Resend/ALTCHA keys are not set in Vercel (pre-launch review). Same fields and
 * flow, but no verification widget and nothing is sent. The thank-you says so and gives the text number,
 * so a real visitor who finds the preview is never left thinking a request went through.
 */
export function ContactForm({ mock = false }: { mock?: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f)) as Record<string, string>;

    if (mock) {
      setStatus({ kind: "sending" });
      await new Promise((r) => setTimeout(r, 700));
      setStatus({
        kind: "ok",
        text: `Thanks, ${data.name.split(" ")[0]}. This form is a preview and is not connected yet, so nothing was sent. Text us at ${business.phoneDisplay} to set up your inspection.`,
      });
      f.reset();
      return;
    }

    if (!data.altcha) {
      setStatus({ kind: "err", text: "Please wait for the verification to finish, then try again." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      track("form_sent"); // the tracker's lead_submit fires on the attempt; this one means it actually went through
      setStatus({ kind: "ok", text: "Thanks. We got your request and will text or call you to set up the inspection." });
      f.reset();
      f.querySelectorAll<HTMLElement & { reset?: () => void }>("altcha-widget").forEach((w) => w.reset?.());
    } catch {
      setStatus({ kind: "err", text: `Something went wrong sending your request. Please text or call us at ${business.phoneDisplay}.` });
    }
  }

  return (
    <>
      {!mock && (
        <>
          <Script src="/js/altcha.min.js" type="module" strategy="lazyOnload" />
          <link rel="stylesheet" href="/altcha.css" />
        </>
      )}

      <form ref={form} id="inspection-request" onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        {/* Two required fields and one optional box: every extra field costs leads. Town, email and the job
            type come out on the follow-up text or call. */}
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>What&rsquo;s going on? <span className="normal-case tracking-normal text-ink/60">(optional)</span></span>
          <textarea name="message" rows={2} placeholder="A leak, storm damage, an old roof..." className={field} />
        </label>

        {/* honeypot: hidden from people, filled by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {!mock && <div className="sm:col-span-2 [&_altcha-widget]:[--altcha-border-radius:0] [&_altcha-widget]:[--altcha-color-border:rgba(4,45,88,0.2)] [&_altcha-widget]:[--altcha-color-border-focus:#095798] [&_altcha-widget]:[--altcha-max-width:100%]">
          <altcha-widget challenge="/api/altcha-challenge" name="altcha" hidelogo />
        </div>}

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <button type="submit" disabled={status.kind === "sending"} className="btn btn-red shrink-0 whitespace-nowrap disabled:opacity-60">
            {status.kind === "sending" ? "Sending..." : "Request my free inspection"}
          </button>
          {status.text && (
            <p role="status" className={`text-lg ${status.kind === "ok" ? "text-blue" : "text-red"}`}>{status.text}</p>
          )}
        </div>
      </form>
    </>
  );
}
