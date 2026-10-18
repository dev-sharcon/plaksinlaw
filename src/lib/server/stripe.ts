import "server-only";

interface CheckoutParams {
  amountCents: number;
  description: string;
  clientName: string;
  email: string;
  phone: string;
  locale: "ru" | "en";
  origin: string;
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Creates a Stripe Checkout Session via the REST API and returns its hosted payment URL. */
export async function createCheckoutSession(p: CheckoutParams) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");

  const form = new URLSearchParams({
    mode: "payment",
    locale: p.locale,
    customer_email: p.email,
    success_url: `${p.origin}/pay?status=success&session_id={CHECKOUT_SESSION_ID}&lang=${p.locale}`,
    cancel_url: `${p.origin}/pay?status=cancelled&lang=${p.locale}`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(p.amountCents),
    "line_items[0][price_data][product_data][name]": p.description.slice(0, 250),
    "line_items[0][price_data][product_data][description]":
      p.locale === "ru"
        ? "The Plaksin Law Firm, P.C. — включая 5% комиссию за оплату картой"
        : "The Plaksin Law Firm, P.C. — includes 5% card processing fee",
    "payment_intent_data[description]": `${p.clientName}: ${p.description}`.slice(0, 500),
    "metadata[client_name]": p.clientName.slice(0, 500),
    "metadata[phone]": p.phone.slice(0, 500),
    "metadata[purpose]": p.description.slice(0, 500),
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  const data = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) throw new Error(`Stripe: ${data.error?.message || res.status}`);
  return { id: data.id!, url: data.url };
}
