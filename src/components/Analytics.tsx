"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

// public.sites row for this website in the 940Digital tracker. Public by design: it ships in the page.
const SITE_ID = "8fed7b58-2bdd-433e-8214-957ce8b83cea";

const GOOGLE_PROFILE = /^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|g\.page|share\.google)/i;

/**
 * Loads the tracker, which records phone taps (lead_submit / phone_click), Instagram and Facebook
 * (social_click) and the form (form_start, lead_submit) by itself. It does not know sms: links or
 * Google profile links, so those two are picked up here, for every link on the site.
 * Production only, so local work never lands in Rob's numbers.
 */
export function Analytics() {
  const enabled = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.href.startsWith("sms:")) track("text_click");
      else if (GOOGLE_PROFILE.test(link.href)) track("google_profile_click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled]);

  if (!enabled) return null;
  return <Script src={`https://www.940digital.com/tracker.js?site=${SITE_ID}`} strategy="afterInteractive" />;
}
