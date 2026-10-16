import { business } from "@/config/business";

/**
 * Inspection requests from /option-3.
 * TODO(Owen): not connected yet. Wire it the way Brick by Brick is wired (Resend + ALTCHA) once Rob's
 * destination email and a Resend key exist. Test submissions go to Owen, never the client.
 * Until then nothing is stored or sent, and the visitor is told plainly to call.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "That request was empty." }, { status: 400 });
  }

  // honeypot filled: pretend success so bots learn nothing
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true, message: "Thanks. We will be in touch." });
  }

  return Response.json(
    { ok: false, message: `Online requests are not connected yet. Please call ${business.phoneDisplay} and we will book your inspection.` },
    { status: 503 },
  );
}
