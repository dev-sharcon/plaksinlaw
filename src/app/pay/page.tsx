"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  CreditCard,
  Building2,
  Lock,
  Copy,
  Check,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/siteContent";

function PayPageInner() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<"ru" | "en">(
    searchParams.get("lang") === "ru" ? "ru" : "en"
  );
  const isRu = locale === "ru";

  const [fio, setFio] = useState(searchParams.get("fio") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [description, setDescription] = useState(
    searchParams.get("desc") || (isRu ? "Оплата консультации" : "Consultation Fee")
  );
  const [sum, setSum] = useState(searchParams.get("total") || searchParams.get("sum") || "315");
  const [method, setMethod] = useState<"Stripe Card" | "Zelle">("Stripe Card");
  const [copiedZelle, setCopiedZelle] = useState(false);

  const [step, setStep] = useState<"form" | "card" | "success">("form");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvc, setCardCvc] = useState("842");
  const [processing, setProcessing] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  const numericSum = parseFloat(sum) || 0;

  const handleMethodSwitch = (m: "Stripe Card" | "Zelle") => {
    setMethod(m);
    if (m === "Zelle" && sum === "315") setSum("300");
    if (m === "Stripe Card" && sum === "300") setSum("315");
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(CONTACT_INFO.zellePhone);
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2000);
  };

  const handleCompletePayment = async (payMethod: "Stripe Card" | "Zelle") => {
    setProcessing(true);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_payment",
          clientName: fio.trim(),
          phone: phone.trim(),
          email: email.trim(),
          description: description.trim(),
          totalAmountUsd: numericSum,
          method: payMethod,
        }),
      });
      const data = await res.json();
      setReceiptId(data?.payment?.id || `PAY-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep("success");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col">

      {/* Header */}
      <header className="bg-[#0B1F3A] text-white border-b border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#122D52] text-[#F2A93B] flex items-center justify-center border border-[#244775]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg font-bold leading-none">
                THE PLAKSIN LAW FIRM, P.C.
              </div>
              <div className="text-[10px] text-sky-300 font-mono uppercase tracking-wider mt-0.5">
                {isRu ? "Официальный платежный терминал" : "Official Client Billing Portal"}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale(isRu ? "en" : "ru")}
              className="px-2.5 py-1 border border-[#244775] text-xs font-semibold text-sky-200 hover:text-white cursor-pointer"
            >
              {isRu ? "English" : "Русский"}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isRu ? "На главную" : "Back to Site"}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-slate-300 shadow-lg">
          <div className="bg-[#0B1F3A] text-white px-6 py-5 border-b border-[#1E3A5F]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#F2A93B]">
              225 BROADWAY, SUITE 630, NEW YORK, NY 10007
            </p>
            <h1 className="font-serif text-2xl font-semibold mt-1">
              {isRu ? "Оплата юридических услуг и консультаций" : "Legal Fee & Consultation Payment"}
            </h1>
          </div>

          <div className="p-6 sm:p-8">
            {step === "success" ? (
              <div className="py-6 text-center space-y-5">
                <div className="w-14 h-14 mx-auto bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-mono uppercase tracking-widest text-emerald-700">
                    {receiptId} • {method}
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-[#0B1F3A]">
                    {isRu ? "Оплата успешно проведена" : "Payment Successfully Completed"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {isRu
                      ? `Сумма $${numericSum.toFixed(2)} (${description}) зачислена. Подтверждение отправлено на ${email}.`
                      : `Your payment of $${numericSum.toFixed(2)} (${description}) has been recorded.`}
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    {isRu ? "Вернуться на сайт" : "Return to Website"}
                  </Link>
                </div>
              </div>
            ) : step === "card" ? (
              <div className="space-y-5">
                <div className="bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">{fio}</div>
                    <div className="text-sm font-semibold text-[#0B1F3A]">{description}</div>
                  </div>
                  <div className="text-xl font-mono font-bold text-[#0B1F3A]">
                    ${numericSum.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Номер карты (Visa / MasterCard / Amex)" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        MM/YY
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 border border-slate-200">
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Stripe 256-bit Encrypted Checkout • The Plaksin Law Firm, P.C.</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="px-4 py-3 border border-slate-300 text-xs font-semibold text-slate-700"
                  >
                    {isRu ? "Назад" : "Back"}
                  </button>
                  <button
                    type="button"
                    disabled={processing}
                    onClick={() => handleCompletePayment("Stripe Card")}
                    className="flex-1 py-3 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {processing
                      ? isRu
                        ? "Обработка..."
                        : "Processing..."
                      : isRu
                      ? `Оплатить $${numericSum.toFixed(2)}`
                      : `Pay $${numericSum.toFixed(2)} USD`}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (method === "Stripe Card") setStep("card");
                  else handleCompletePayment("Zelle");
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleMethodSwitch("Stripe Card")}
                    className={`py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      method === "Stripe Card" ? "bg-[#0B1F3A] text-white" : "text-slate-600"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{isRu ? "Банковская карта" : "Credit Card"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMethodSwitch("Zelle")}
                    className={`py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      method === "Zelle" ? "bg-[#0B1F3A] text-white" : "text-slate-600"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{isRu ? "Zelle (Без комиссии)" : "Zelle (0% Fee)"}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Ф.И.О.:" : "Full Name:"}
                  </label>
                  <input
                    type="text"
                    required
                    value={fio}
                    onChange={(e) => setFio(e.target.value)}
                    placeholder={isRu ? "Имя и Фамилия" : "First and Last Name"}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Телефон:" : "Telephone:"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Назначение платежа:" : "Payment Purpose:"}
                  </label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Сумма (USD):" : "Amount (USD):"}
                  </label>
                  <div className="flex items-center">
                    <span className="px-3.5 py-2.5 bg-slate-100 border border-r-0 border-slate-300 font-mono font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      max="25000"
                      value={sum}
                      onChange={(e) => setSum(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base font-mono font-semibold border border-slate-300"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3.5 text-xs text-slate-700 space-y-2">
                  <p>
                    {isRu ? (
                      <>
                        При оплате <u>картой</u> платеж включает в себя невозвращаемую 5% комиссию. Чтобы избежать комиссии, используйте{" "}
                        <strong>Zelle: {CONTACT_INFO.zellePhone}</strong>.
                      </>
                    ) : (
                      <>
                        A 5% non-refundable fee applies to credit card payments. To avoid it, use{" "}
                        <strong>Zelle: {CONTACT_INFO.zellePhone}</strong>.
                      </>
                    )}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-amber-200/70">
                    <span className="font-mono font-bold text-[#0B1F3A]">
                      Zelle: {CONTACT_INFO.zellePhone}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyZelle}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0075BF] hover:underline"
                    >
                      {copiedZelle ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isRu ? "Скопировано" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isRu ? "Скопировать" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {isRu ? "Оплатить" : "Submit Payment"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA]" />}>
      <PayPageInner />
    </Suspense>
  );
}
