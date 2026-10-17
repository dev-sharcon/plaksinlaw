"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Copy, Check, ChevronDown } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import { SITE_CONTENT, CONTACT_INFO } from "@/data/siteContent";

export default function FeesPage() {
  const router = useRouter();
  const { locale, openInquiry } = useSite();
  const isRu = locale === "ru";

  const content = SITE_CONTENT[locale];
  const principles = content.participationSection.principles;
  const stages = content.participationSection.workSteps;
  const faqs = content.faqSection.items;

  // Inline payment form state
  const [payMethod, setPayMethod] = useState<"card" | "zelle">("card");
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [sum, setSum] = useState("300");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const numericSum = Math.max(0, parseFloat(sum) || 0);
  const feeAmount = +(numericSum * 0.05).toFixed(2);
  const totalCardAmount = +(numericSum + feeAmount).toFixed(2);

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(CONTACT_INFO.zellePhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fio || !phone || !email || !desc || numericSum <= 0) return;
    setSubmitting(true);
    try {
      await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_payment",
          clientName: fio,
          phone,
          email,
          description: desc,
          baseAmountUsd: numericSum,
          feeAmountUsd: feeAmount,
          totalAmountUsd: totalCardAmount,
          method: "Stripe Card",
          locale,
        }),
      });
    } catch {
      // fallback
    }
    const params = new URLSearchParams({
      fio,
      phone,
      email,
      desc,
      sum: numericSum.toFixed(2),
      fee: feeAmount.toFixed(2),
      total: totalCardAmount.toFixed(2),
      lang: locale,
    });
    router.push(`/pay?${params.toString()}`);
  };

  return (
    <SiteLayout>
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B] mb-3">
              {content.participationSection.eyebrow}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {content.participationSection.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {content.participationSection.lead}
            </p>
          </div>
        </div>
      </section>

      {/* 1. Six Fee Principles */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {isRu ? "Принципы формирования стоимости" : "Fee Structure"}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {isRu
                ? "Фиксированная стоимость и прозрачные условия договора"
                : "Flat-Fee Representation & Transparent Retainer Terms"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div
                key={p.num}
                className="border border-slate-200 p-7 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[#0075BF] mb-3">
                    {p.num}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-2.5 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Online Payment Form (Stripe + Zelle) */}
      <section id="payment" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left explanation */}
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF]">
                {isRu ? "Онлайн-оплата услуг" : "Online Payment"}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                {isRu
                  ? "Оплатить консультацию или услуги по договору"
                  : "Pay Consultation Fee or Legal Retainer"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isRu
                  ? "Вы можете оплатить первичную консультацию ($300) или этап сопровождения по договору любой банковской картой через защищённый шлюз Stripe либо переводом Zelle без комиссии."
                  : "You may pay for an initial consultation ($300) or an invoice installment using any credit/debit card via Stripe or by Zelle transfer with zero processing fee."}
              </p>

              <div className="bg-white border border-slate-200 p-6 space-y-3 text-xs text-slate-700">
                <div className="font-bold text-[#0B1F3A] uppercase tracking-wider">
                  {isRu ? "Важная информация:" : "Important Payment Notice:"}
                </div>
                <p>
                  {isRu
                    ? "• При оплате банковской картой (Stripe) автоматически добавляется невозвратная комиссия платёжной системы в размере 5%."
                    : "• Payments by credit/debit card (Stripe) include a mandatory non-refundable 5% payment processor fee."}
                </p>
                <p>
                  {isRu
                    ? "• Оплата через Zelle по номеру (212) 203-7533 (получатель: The Plaksin Law Firm, P.C.) производится без комиссии (0%)."
                    : "• Payments via Zelle to (212) 203-7533 (Recipient: The Plaksin Law Firm, P.C.) carry 0% fee."}
                </p>
                <p>
                  {isRu
                    ? "• При заключении договора на полное сопровождение стоимость консультации ($300) полностью засчитывается в стоимость договора."
                    : "• If you retain our firm for full representation, the $300 consultation fee is credited in full toward your retainer."}
                </p>
              </div>
            </div>

            {/* Right Payment Box */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-7 sm:p-10">
              {/* Method Switcher */}
              <div className="grid grid-cols-2 border border-slate-200 mb-8">
                <button
                  type="button"
                  onClick={() => setPayMethod("card")}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    payMethod === "card"
                      ? "bg-[#0B1F3A] text-white"
                      : "bg-slate-50 text-slate-600 hover:text-[#0B1F3A]"
                  }`}
                >
                  {isRu ? "Банковская карта (Stripe)" : "Credit / Debit Card (Stripe)"}
                </button>
                <button
                  type="button"
                  onClick={() => setPayMethod("zelle")}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    payMethod === "zelle"
                      ? "bg-[#0B1F3A] text-white"
                      : "bg-slate-50 text-slate-600 hover:text-[#0B1F3A]"
                  }`}
                >
                  {isRu ? "Перевод Zelle (0% комиссия)" : "Zelle Transfer (0% Fee)"}
                </button>
              </div>

              {payMethod === "card" ? (
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isRu ? "ФИО плательщика *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={fio}
                      onChange={(e) => setFio(e.target.value)}
                      placeholder={isRu ? "Иван Иванов" : "John Doe"}
                      className="w-full px-4 py-3 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isRu ? "Контактный телефон *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (___) ___-____"
                        className="w-full px-4 py-3 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full px-4 py-3 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isRu ? "Назначение платежа *" : "Payment Description *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder={
                          isRu
                            ? "Консультация / Оплата по договору"
                            : "Attorney Consultation / Legal Retainer"
                        }
                        className="w-full px-4 py-3 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isRu ? "Сумма ($ USD) *" : "Amount ($ USD) *"}
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                        className="w-full px-4 py-3 text-sm font-mono font-bold border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Quick presets */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      {
                        label: isRu ? "$300 — Консультация" : "$300 — Consultation",
                        val: "300",
                        d: isRu
                          ? "Первичная консультация с адвокатом"
                          : "Initial Attorney Consultation",
                      },
                      {
                        label: isRu ? "$2,500 — Этап договора" : "$2,500 — Retainer Installment",
                        val: "2500",
                        d: isRu
                          ? "Оплата этапа по договору"
                          : "Retainer Agreement Installment",
                      },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => {
                          setSum(preset.val);
                          if (!desc) setDesc(preset.d);
                        }}
                        className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Calculation Summary */}
                  <div className="bg-[#F8FAFC] border border-slate-200 p-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>{isRu ? "Сумма услуг:" : "Base Amount:"}</span>
                      <span className="font-mono">${numericSum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>
                        {isRu
                          ? "Невозвратная комиссия платёжной системы (5%):"
                          : "Non-refundable card processing fee (5%):"}
                      </span>
                      <span className="font-mono">+${feeAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#0B1F3A] pt-2 border-t border-slate-200">
                      <span>{isRu ? "Итого к списанию:" : "Total Charge:"}</span>
                      <span className="font-mono">${totalCardAmount.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {isRu
                        ? `Перейти к оплате картой ($${totalCardAmount.toFixed(2)})`
                        : `Proceed to Secure Card Checkout ($${totalCardAmount.toFixed(2)})`}
                    </span>
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-[#F8FAFC] border border-slate-200 p-6 space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {isRu ? "Реквизиты для перевода через Zelle" : "Zelle Transfer Details"}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <div className="text-xs text-slate-500">
                          {isRu ? "Номер телефона Zelle:" : "Zelle Phone Number:"}
                        </div>
                        <div className="font-mono text-2xl font-bold text-[#0B1F3A]">
                          {CONTACT_INFO.zellePhone}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyZelle}
                        className="px-4 py-2.5 bg-white border border-slate-300 hover:border-[#0B1F3A] text-xs font-semibold text-[#0B1F3A] inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>{isRu ? "Скопировано" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>{isRu ? "Скопировать номер" : "Copy Number"}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block">
                          {isRu ? "Получатель:" : "Recipient Name:"}
                        </span>
                        <span className="font-bold text-[#0B1F3A]">
                          The Plaksin Law Firm, P.C.
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          {isRu ? "Комиссия:" : "Processing Fee:"}
                        </span>
                        <span className="font-bold text-emerald-700">
                          {isRu ? "0% (без комиссии)" : "0% (No Fee)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isRu
                      ? "В комментарии (Memo) к переводу Zelle обязательно укажите вашу фамилию и имя латиницей. После отправки перевода пришлите подтверждение в WhatsApp или Telegram для мгновенного зачисления."
                      : "Please include your full name in the Zelle memo field. After sending the transfer, share the confirmation screenshot via WhatsApp or Telegram to confirm your booking."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Five Work Stages */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {isRu ? "Порядок работы" : "Step-by-Step Process"}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {content.participationSection.workTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {stages.map((st) => (
              <div
                key={st.step}
                className="border border-slate-200 p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[#0075BF] mb-3">
                    {st.step}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-2 leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {content.faqSection.eyebrow}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {content.faqSection.title}
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-lg font-bold text-[#0B1F3A]">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-[#0B1F3A]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => openInquiry()}
              className="px-7 py-3.5 bg-[#0B1F3A] hover:bg-[#162d4c] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isRu ? "Задать вопрос адвокату" : "Ask the Attorney a Question"}
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
