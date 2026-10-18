# plaksinlaw.com

Website of The Plaksin Law Firm, P.C. — Next.js 15 (App Router), React 19, Tailwind CSS 4.

## Development

```bash
npm install
cp .env.example .env.local   # fill in the keys you need
npm run dev
```

Without any delivery channel configured, form submissions are only logged to the console in development and **fail with an error in production** (they are never silently dropped).

## How forms and payments work

All forms post to `src/app/api/crm/route.ts`:

- **Leads** (inquiry modal, contacts page, visa quiz) are sent to Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`) and/or email via Resend (`RESEND_API_KEY` + `LEAD_EMAIL_TO`).
- **Card payments** create a Stripe Checkout Session (`STRIPE_SECRET_KEY`) and redirect the client to Stripe; a 5% card fee is added server-side. Card data never touches this site.
- **Zelle** sends a "client reports a Zelle transfer" notice through the same channels.
- **Spam protection**: Cloudflare Turnstile when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` are set, plus a honeypot field.

See `.env.example` for all variables.

## Deploy (Vercel)

Import the repository on Vercel (framework preset: Next.js, no extra settings), add the environment variables, then attach the `plaksinlaw.com` domain.

Legacy URLs of the old PHP site (`/rtvi/`, `/ntv/`, `/russia24/`, `/vesti24/`, `/sitemap`) are redirected in `next.config.ts`.
