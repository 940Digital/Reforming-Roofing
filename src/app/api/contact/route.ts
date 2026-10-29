// Contact form: honeypot + ALTCHA proof-of-work, then delivery through Resend.
// Same pipeline as 940digital.com's live contact form.
import { verifySolution } from "altcha-lib/v1";
import { business } from "@/config/business";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  town?: string;
  need?: string;
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
  const { name, phone, email, town, need, message, website, altcha } = body;

  // Honeypot: real visitors never see or fill this field.
  if (website) return json({ error: "submission rejected" }, 400);

  if (!name?.trim() || !phone?.trim() || !altcha) return json({ error: "missing required fields" }, 400);

  let verified = false;
  try {
    verified = await verifySolution(altcha, process.env.ALTCHA_HMAC_KEY as string, true);
  } catch {
    verified = false;
  }
  if (!verified) return json({ error: "verification failed" }, 400);

  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Town", town],
    ["Needs", need],
  ];
  const html = `
    ${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v?.trim() || "-")}</p>`).join("")}
    <p><strong>Message:</strong><br>${escapeHtml(message?.trim() || "-").replace(/\n/g, "<br>")}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `"${business.name} Website" <forms@940digital.com>`,
        to: [business.leadsTo],
        ...(email?.trim() ? { reply_to: email.trim() } : {}),
        subject: `New inspection request from ${name.trim()}${need ? ` (${need})` : ""}`,
        html,
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
