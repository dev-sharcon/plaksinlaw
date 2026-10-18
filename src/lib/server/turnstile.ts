import "server-only";

/** Verifies a Cloudflare Turnstile token. Skipped (returns true) when TURNSTILE_SECRET_KEY is not set. */
export async function verifyTurnstile(token: string | undefined, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}
