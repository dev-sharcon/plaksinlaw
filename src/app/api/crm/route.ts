import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/server/notify";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { createCheckoutSession, isStripeConfigured } from "@/lib/server/stripe";

export const runtime = "nodejs";

const CARD_FEE_RATE = 0.05;
const MIN_AMOUNT_USD = 1;
const MAX_AMOUNT_USD = 25000;

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("invalid_json");
  }

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0];
  if (!(await verifyTurnstile(str(body.turnstileToken, 2048), ip))) {
    return fail("captcha_failed", 403);
  }

  const name = str(body.fullName || body.clientName, 200);
  const phone = str(body.phone, 50);
  const email = str(body.email, 200);
  const locale = body.locale === "ru" ? "ru" : "en";
  const pageUrl = str(req.headers.get("referer"), 300);

  if (!name || !phone) return fail("missing_fields");
  if (email && !isEmail(email)) return fail("invalid_email");

  try {
    if (body.action === "create_payment") {
      const method = body.method === "Zelle" ? "Zelle" : "Stripe Card";
      const description = str(body.description, 250) || "Legal services";
      const base = Math.round(Number(body.baseAmountUsd) * 100) / 100;
      if (!Number.isFinite(base) || base < MIN_AMOUNT_USD || base > MAX_AMOUNT_USD) {
        return fail("invalid_amount");
      }
      if (!email) return fail("missing_fields");

      if (method === "Zelle") {
        await deliverLead(
          `Zelle: клиент сообщил об оплате $${base.toFixed(2)}`,
          [
            ["Клиент", name],
            ["Телефон", phone],
            ["Email", email],
            ["Назначение", description],
            ["Сумма (без комиссии)", `$${base.toFixed(2)}`],
            ["Язык", locale],
            ["Страница", pageUrl],
          ],
          email
        );
        return NextResponse.json({ ok: true, method });
      }

      if (!isStripeConfigured()) return fail("card_payments_unavailable", 503);

      const totalCents = Math.round(base * (1 + CARD_FEE_RATE) * 100);
      const origin = new URL(req.url).origin;
      const session = await createCheckoutSession({
        amountCents: totalCents,
        description,
        clientName: name,
        email,
        phone,
        locale,
        origin: process.env.NEXT_PUBLIC_SITE_URL || origin,
      });

      // Notification is best-effort: the Stripe session must not fail because Telegram/email is down.
      deliverLead(
        `Stripe: клиент перешёл к оплате $${(totalCents / 100).toFixed(2)}`,
        [
          ["Клиент", name],
          ["Телефон", phone],
          ["Email", email],
          ["Назначение", description],
          ["Сумма к списанию", `$${(totalCents / 100).toFixed(2)} (вкл. 5%)`],
          ["Stripe session", session.id],
        ],
        email
      ).catch((e) => console.error("[crm] payment notice failed", e));

      return NextResponse.json({ ok: true, method, checkoutUrl: session.url });
    }

    // Any other submission is a consultation lead (inquiry modal, contacts page, visa quiz).
    await deliverLead(
      `Новая заявка с сайта: ${name}`,
      [
        ["Имя", name],
        ["Телефон", phone],
        ["Email", email],
        ["Категория", str(body.visaCategory || body.category, 300)],
        ["Источник", str(body.source || body.type, 100) || "website"],
        ["Комментарий", str(body.notes, 4000)],
        ["Язык", locale],
        ["Страница", pageUrl],
      ],
      email || undefined
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[crm]", err);
    return fail("delivery_failed", 502);
  }
}
