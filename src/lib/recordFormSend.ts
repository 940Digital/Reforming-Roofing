// Server-only. Records a delivered form send with the 940Digital tracker, so the lead counts even when the
// visitor's browser blocked the tracker, had Do Not Track on, or left before its beacon went out.
// Stores no personal details: just the site, the form, the page and (when there was one) the visit id.
import { TRACKER_SITE_ID } from "@/config/analytics";

const COLLECT_URL = "https://yyfeymmjdlewvdxrzggn.supabase.co/functions/v1/collect";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Set only in Vercel Production, so local and preview sends are never counted. */
const ingestKey = () => process.env.FORM_INGEST_KEY_RR || "";

/**
 * Never throws and never takes longer than `timeoutMs`: the visitor's request is already delivered, and a
 * slow or failed record must not turn it into an error. Returns whether the record was stored.
 */
export async function recordFormSend(
  input: { sessionId?: unknown; form: string; path: string },
  timeoutMs = 2500,
): Promise<boolean> {
  const key = ingestKey();
  if (!key) return false;
  const sessionId = typeof input.sessionId === "string" && UUID_RE.test(input.sessionId) ? input.sessionId : null;
  try {
    const res = await fetch(COLLECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-940-form-key": key },
      body: JSON.stringify({ action: "form_submission", site_id: TRACKER_SITE_ID, session_id: sessionId, form: input.form, path: input.path }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) console.error("Form send not recorded:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Form send not recorded:", err);
    return false;
  }
}
