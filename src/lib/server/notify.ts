import "server-only";

export type LeadField = [label: string, value: string | number | undefined | null];

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function present(fields: LeadField[]) {
  return fields.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "") as [
    string,
    string | number,
  ][];
}

async function sendTelegram(title: string, fields: LeadField[]) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;

  const text =
    `<b>${escapeHtml(title)}</b>\n\n` +
    present(fields)
      .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(String(v))}`)
      .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
  return true;
}

async function sendEmail(title: string, fields: LeadField[], replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!apiKey || !to) return null;

  const rows = present(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="padding:4px 0">${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "Plaksin Law Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo || undefined,
      subject: title,
      html: `<h2 style="font-family:sans-serif">${escapeHtml(title)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

/**
 * Delivers a website submission to every configured channel (Telegram and/or email).
 * Returns false when no channel is configured yet (demo mode: the submission is only logged).
 * Throws if every configured channel failed.
 */
export async function deliverLead(title: string, fields: LeadField[], replyTo?: string) {
  const results = await Promise.allSettled([sendTelegram(title, fields), sendEmail(title, fields, replyTo)]);

  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[lead delivery]", f.reason));

  if (delivered) return true;

  if (failures.length === 0) {
    console.info("[lead delivery] demo mode, no channel configured:", title);
    return false;
  }
  throw new Error("All lead delivery channels failed");
}
