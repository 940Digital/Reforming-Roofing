// Server-only: the contact form's secrets. Never import this from a "use client" file.
import { createHmac } from "node:crypto";

/** Resend key. Production uses RESEND_API_KEY_RR (set in Vercel); local dev can use RESEND_API_KEY. */
export const resendKey = () => process.env.RESEND_API_KEY_RR || process.env.RESEND_API_KEY || "";

/**
 * ALTCHA signing secret. ALTCHA_HMAC_KEY wins if it is set; otherwise it is derived one-way from the
 * Resend key, so the site needs only one secret in Vercel. HMAC cannot be reversed to reveal the Resend key.
 */
export const altchaKey = () => {
  if (process.env.ALTCHA_HMAC_KEY) return process.env.ALTCHA_HMAC_KEY;
  const key = resendKey();
  return key ? createHmac("sha256", key).update("altcha-hmac-key:reforming-roofing").digest("hex") : "";
};

/** Both secrets present, so the real form (not the mock) can be shown. */
export const formReady = () => Boolean(resendKey() && altchaKey());
