import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.action === "create_lead") {
      return NextResponse.json({
        ok: true,
        leadId: `PLK-${Date.now().toString(36).toUpperCase()}`,
        crmTarget: "https://legal-crm-demo.vercel.app/",
      });
    }

    if (body.action === "create_payment") {
      return NextResponse.json({
        ok: true,
        payment: {
          id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          totalAmountUsd: Number(body.totalAmountUsd) || 315,
          method: body.method || "Stripe Card",
        },
        crmTarget: "https://legal-crm-demo.vercel.app/",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
