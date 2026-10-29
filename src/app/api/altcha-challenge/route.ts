// Self-hosted CAPTCHA challenge (ALTCHA proof-of-work), same setup as 940digital.com.
import { createChallenge } from "altcha-lib/v1";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const challenge = await createChallenge({
      hmacKey: process.env.ALTCHA_HMAC_KEY as string,
      maxNumber: 100000,
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    return Response.json(challenge, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "challenge generation failed" }, { status: 500 });
  }
}
