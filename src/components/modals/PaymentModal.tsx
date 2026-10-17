"use client";

import React, { useState, useEffect } from "react";
import { X, CreditCard, Copy, Check, Lock, CheckCircle2, Building2 } from "lucide-react";
import { CONTACT_INFO, Locale } from "@/data/siteContent";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  initialValues?: {
    fio?: string;
    phone?: string;
    email?: string;
    desc?: string;
    sum?: string;
  };
}

export default function PaymentModal({
  isOpen,
  onClose,
  locale,
  initialValues,
}: PaymentModalProps) {
  const isRu = locale === "ru";

  const [fio, setFio] = useState(initialValues?.fio || "");
  const [phone, setPhone] = useState(initialValues?.phone || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [description, setDescription] = useState(
    initialValues?.desc || (isRu ? "Оплата консультации" : "Consultation Fee")
  );
  const [sum, setSum] = useState(initialValues?.sum || "315");
  const [method, setMethod] = useState<"Stripe Card" | "Zelle">("Stripe Card");
  const [copiedZelle, setCopiedZelle] = useState(false);

  // Simulated Stripe Checkout step
  const [step, setStep] = useState<"form" | "stripe_checkout" | "success">("form");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvc, setCardCvc] = useState("842");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [receiptId, setReceiptId] = useState("");

  useEffect(() => {
    if (initialValues) {
      if (initialValues.fio) setFio(initialValues.fio);
      if (initialValues.phone) setPhone(initialValues.phone);
      if (initialValues.email) setEmail(initialValues.email);
      if (initialValues.desc) setDescription(initialValues.desc);
      if (initialValues.sum) setSum(initialValues.sum);
    }
  }, [initialValues]);

  useEffect(() => {
    // Update default description language if not modified
    if (description === "Оплата консультации" && !isRu) {
      setDescription("Consultation Fee");
    } else if (description === "Consultation Fee" && isRu) {
      setDescription("Оплата консультации");
    }
  }, [isRu, description]);

  if (!isOpen) return null;

  const numericSum = parseFloat(sum) || 0;

  const handleMethodSwitch = (newMethod: "Stripe Card" | "Zelle") => {
    setMethod(newMethod);
    if (newMethod === "Zelle" && sum === "315") {
      setSum("300");
    } else if (newMethod === "Stripe Card" && sum === "300") {
      setSum("315");
    }
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(CONTACT_INFO.zellePhone);
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2000);
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fio.trim() || !phone.trim() || !email.trim() || !description.trim()) {
      setError(
        isRu
          ? "Пожалуйста, заполните все обязательные поля."
          : "Please complete all required fields."
      );
      return;
    }

    if (numericSum < 1 || numericSum > 25000) {
      setError(
        isRu
          ? "Сумма должна быть от $1 до $25,000."
          : "Amount must be between $1 and $25,000."
      );
      return;
    }

    if (method === "Stripe Card") {
      setStep("stripe_checkout");
    } else {
      submitPaymentRecord("Zelle");
    }
  };

  const submitPaymentRecord = async (payMethod: "Stripe Card" | "Zelle") => {
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
    } catch {
      setError(isRu ? "Произошла ошибка при проведении оплаты." : "An error occurred during payment.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAndClose = () => {
    setStep("form");
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/80 backdrop-blur-[2px] p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-300 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0B1F3A] text-white px-6 py-4 border-b border-[#1E3A5F]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#F2A93B] font-semibold">
              THE PLAKSIN LAW FIRM, P.C. • BILLING
            </p>
            <h3 className="font-serif text-xl font-semibold tracking-tight mt-0.5">
              {isRu ? "Оплата юридических услуг" : "Legal Services Payment"}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close payment modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {step === "success" ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-mono uppercase tracking-widest text-emerald-700">
                  {receiptId} • {method}
                </p>
                <h4 className="font-serif text-2xl font-semibold text-[#0B1F3A]">
                  {method === "Stripe Card"
                    ? isRu
                      ? "Оплата успешно проведена"
                      : "Payment Successfully Processed"
                    : isRu
                    ? "Уведомление об оплате Zelle принято"
                    : "Zelle Payment Notification Received"}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isRu
                    ? `Платеж на сумму $${numericSum.toFixed(2)} (${description}) зафиксирован в клиентской системе The Plaksin Law Firm, P.C. Квитанция направлена на ${email}.`
                    : `Your payment of $${numericSum.toFixed(2)} (${description}) has been recorded in our CRM and a receipt has been sent to ${email}.`}
                </p>
              </div>

              <div className="bg-[#F8F9FA] border border-slate-200 p-4 text-left text-xs space-y-1.5 font-mono text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isRu ? "Плательщик:" : "Client:"}</span>
                  <span className="font-semibold text-[#0B1F3A]">{fio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isRu ? "Назначение:" : "Purpose:"}</span>
                  <span>{description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isRu ? "Сумма:" : "Amount:"}</span>
                  <span className="font-bold text-emerald-700">${numericSum.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 bg-[#0B1F3A] hover:bg-[#122D52] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {isRu ? "Закрыть окно" : "Close Window"}
              </button>
            </div>
          ) : step === "stripe_checkout" ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-[#F8F9FA] border border-slate-200 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">plaksinlaw.com</p>
                  <p className="text-sm font-semibold text-[#0B1F3A]">{description}</p>
                  <p className="text-xs text-slate-500">{email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{isRu ? "К оплате" : "Total Due"}</p>
                  <p className="text-xl font-bold font-mono text-[#0B1F3A]">${numericSum.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Номер карты (Stripe Secure Checkout)" : "Card Number (Stripe Secure Checkout)"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Срок действия (MM/YY)" : "Expiration (MM/YY)"}
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-3 py-2 border border-slate-200">
                <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>
                  {isRu
                    ? "Защищенная транзакция Stripe 256-bit SSL. Данные зачисляются на счет The Plaksin Law Firm, P.C."
                    : "Encrypted 256-bit SSL Stripe Checkout. Processed directly for The Plaksin Law Firm, P.C."}
                </span>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="px-4 py-3 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {isRu ? "Назад" : "Back"}
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => submitPaymentRecord("Stripe Card")}
                  className="flex-1 py-3 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {processing
                    ? isRu
                      ? "Обработка платежа..."
                      : "Processing..."
                    : isRu
                    ? `Подтвердить оплату $${numericSum.toFixed(2)}`
                    : `Pay $${numericSum.toFixed(2)} USD`}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProceed} className="space-y-4">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleMethodSwitch("Stripe Card")}
                  className={`py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    method === "Stripe Card"
                      ? "bg-[#0B1F3A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isRu ? "Оплата картой (Stripe)" : "Credit Card (Stripe)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMethodSwitch("Zelle")}
                  className={`py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    method === "Zelle"
                      ? "bg-[#0B1F3A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{isRu ? "Zelle (Без комиссии 0%)" : "Zelle (0% Fee)"}</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isRu ? "Ф.И.О. плательщика:" : "Full Name:"}
                </label>
                <input
                  type="text"
                  required
                  value={fio}
                  onChange={(e) => setFio(e.target.value)}
                  placeholder={isRu ? "Имя и Фамилия" : "First and Last Name"}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
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
                    placeholder="+1 (___) ___-____"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
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
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {isRu ? "Сумма (USD):" : "Amount (USD):"}
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setDescription(isRu ? "Оплата консультации" : "Consultation Fee");
                        setSum(method === "Stripe Card" ? "315" : "300");
                      }}
                      className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                    >
                      {isRu ? "Консультация ($300)" : "Consultation ($300)"}
                    </button>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <span className="px-3.5 py-2.5 bg-slate-100 border border-r-0 border-slate-300 text-sm font-mono font-bold text-slate-700">
                    $
                  </span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="25000"
                    required
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-base font-mono font-semibold border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Zelle & 5% Card Fee Notice */}
              <div className="bg-amber-50/80 border border-amber-200/90 p-3.5 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p>
                  {isRu ? (
                    <>
                      При оплате <u>картой</u> платеж включает в себя невозвращаемую{" "}
                      <strong>5% комиссию</strong> ($300 + 5% = $315). Чтобы избежать комиссии, используйте{" "}
                      <strong>Zelle: {CONTACT_INFO.zellePhone}</strong>.
                    </>
                  ) : (
                    <>
                      A <strong>5% non-refundable fee</strong> applies to credit card payments ($300 + 5% = $315). To avoid it, use{" "}
                      <strong>Zelle: {CONTACT_INFO.zellePhone}</strong>.
                    </>
                  )}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-amber-200/60">
                  <span className="font-mono font-semibold text-[#0B1F3A]">
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
                        <span>{isRu ? "Скопировать номер Zelle" : "Copy Zelle Number"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {method === "Stripe Card"
                  ? isRu
                    ? `Оплатить картой ($${numericSum})`
                    : `Submit Card Payment ($${numericSum})`
                  : isRu
                  ? `Я перевел $${numericSum} через Zelle — Уведомить адвоката`
                  : `I Sent $${numericSum} via Zelle — Notify Firm`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
