// Contact form: honeypot + ALTCHA proof-of-work, then delivery through Resend.
// Same pipeline as 940digital.com's live contact form.
import { verifySolution } from "altcha-lib/v1";
import { business } from "@/config/business";
import { altchaKey, resendKey } from "@/lib/formKeys";

type ContactBody = {
  name?: string;
  phone?: string;
  message?: string;
  website?: string;
  altcha?: string;
};

const json = (body: unknown, status: number) => Response.json(body, { status });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return json({ error: "bad request" }, 400);
  }
  const { name, phone, message, website, altcha } = body;

  // Honeypot: real visitors never see or fill this field.
  if (website) return json({ error: "submission rejected" }, 400);

  if (!name?.trim() || !phone?.trim() || !altcha) return json({ error: "missing required fields" }, 400);

  let verified = false;
  try {
    verified = await verifySolution(altcha, altchaKey(), true);
  } catch {
    verified = false;
  }
  if (!verified) return json({ error: "verification failed" }, 400);

  // Kept plain on purpose so spam filters (Rob's inbox is Zoho) have nothing to score: a full HTML document
  // with a matching plain-text part, no links, no images, no tracking. Sender auth (DKIM/SPF/DMARC on
  // 940digital.com via Resend) was checked passing on 2026-11-09.
  const lead = {
    name: name.trim().slice(0, 120),
    phone: phone.trim().slice(0, 40),
    message: (message?.trim() || "").slice(0, 3000),
  };
  const text = [
    `New inspection request from the ${business.name} website.`,
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    "",
    `What's going on: ${lead.message || "(left blank)"}`,
    "",
    "Text or call them back to set up the inspection.",
  ].join("\n");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>New inspection request</title></head>
<body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1a1a1a">
<p>New inspection request from the ${escapeHtml(business.name)} website.</p>
<p><strong>Name:</strong> ${escapeHtml(lead.name)}<br><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
<p><strong>What's going on:</strong><br>${lead.message ? escapeHtml(lead.message).replace(/\n/g, "<br>") : "(left blank)"}</p>
<p>Text or call them back to set up the inspection.</p>
</body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `"${business.name} Website" <forms@940digital.com>`,
        to: [business.leadsTo],
        subject: `New inspection request from ${lead.name}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return json({ error: "delivery failed" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("Contact form error:", err);
    return json({ error: "delivery failed" }, 502);
  }
}
