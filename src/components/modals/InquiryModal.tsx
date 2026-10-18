"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, Send, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { CONTACT_INFO, Locale } from "@/data/siteContent";
import Turnstile, { turnstileEnabled } from "@/components/Turnstile";
import { postCrm, crmErrorMessage } from "@/lib/crmClient";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  preselectedCategory?: string;
  onOpenPayment?: (prefill: { fio: string; phone: string; email: string; desc: string }) => void;
}

export default function InquiryModal({
  isOpen,
  onClose,
  locale,
  preselectedCategory,
  onOpenPayment,
}: InquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visaCategory, setVisaCategory] = useState(preselectedCategory || "");
  const [notes, setNotes] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedCategory) {
      setVisaCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  if (!isOpen) return null;

  const isRu = locale === "ru";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setError(
        isRu
          ? "Пожалуйста, заполните имя, телефон и электронную почту."
          : "Please provide your full name, telephone number, and email."
      );
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setError(
        isRu
          ? "Пожалуйста, подтвердите, что Вы не робот."
          : "Please complete the verification before submitting."
      );
      return;
    }

    setSubmitting(true);
    try {
      await postCrm({
        action: "create_lead",
        locale,
        turnstileToken,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        visaCategory:
          visaCategory.trim() ||
          (isRu ? "Первичная консультация ($300)" : "Initial Consultation ($300)"),
        uscisForm: "Initial Assessment",
        source: "website_inquiry",
        notes:
          notes.trim() ||
          (isRu
            ? "Заявка на предварительную консультацию через форму на сайте."
            : "Consultation inquiry submitted via website modal."),
      });
      setSubmitted(true);
    } catch (err) {
      setError(crmErrorMessage(err, isRu));
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
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
      <div className="relative w-full max-w-2xl bg-white border border-slate-300 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0B1F3A] text-white px-6 py-4 border-b border-[#1E3A5F]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#F2A93B] font-semibold">
              THE PLAKSIN LAW FIRM, P.C.
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">
              {isRu ? "Запись на консультацию адвоката" : "Schedule an Attorney Consultation"}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 mx-auto bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-semibold text-[#0B1F3A]">
                  {isRu ? "Ваша заявка успешно принята" : "Your Inquiry Has Been Received"}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isRu
                    ? "Данные переданы в систему адвокатского бюро Андрея Плаксина. Мы свяжемся с Вами в ближайшее рабочее время для согласования точного слота консультации."
                    : "Your request has been logged into The Plaksin Law Firm CRM. Our office will contact you shortly to confirm your consultation slot."}
                </p>
              </div>

              {onOpenPayment && (
                <div className="bg-[#F8F9FA] border border-slate-200 p-5 text-left max-w-lg mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0075BF] mb-1">
                    {isRu ? "Ускоренное бронирование времени" : "Immediate Slot Confirmation"}
                  </p>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {isRu
                      ? "Вы можете сразу перейти к оплате первичной консультации ($300 через Zelle или $315 картой с учетом 5% комиссии), чтобы закрепить приоритетное время."
                      : "You may proceed directly to pay the consultation fee ($300 via Zelle or $315 by card including the 5% fee) to lock in a priority slot."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const prefill = {
                        fio: fullName,
                        phone,
                        email,
                        desc: isRu ? "Оплата консультации" : "Consultation Fee",
                      };
                      resetAndClose();
                      onOpenPayment(prefill);
                    }}
                    className="w-full py-3 px-4 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>
                      {isRu ? "Перейти к оплате консультации ($300)" : "Proceed to Consultation Payment ($300)"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={resetAndClose}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 underline"
              >
                {isRu ? "Вернуться на сайт" : "Return to website"}
              </button>
            </div>
          ) : (
            <>
              {/* Personal letter from Andrey Plaksin */}
              <div className="bg-[#F8F9FA] border-l-4 border-[#0075BF] p-4 sm:p-5 mb-6 text-sm text-slate-700 space-y-2.5 leading-relaxed">
                <p className="font-semibold text-[#0B1F3A]">
                  {isRu ? "Приветствую Вас!" : "Greetings!"}
                </p>
                <p>
                  {isRu
                    ? "Моя работа всегда начинается с предварительной консультации клиента, в ходе которой я рассказываю обо всех возможных вариантах работы над делом и озвучиваю все риски, связанные с этими вариантами."
                    : "My work always begins with an initial consultation, during which I discuss all possible options in my client's case and evaluate all associated risks and benefits."}
                </p>
                <p>
                  {isRu ? (
                    <>
                      Консультация длится <strong>45 минут</strong> (через Zoom, Telegram, WhatsApp или по телефону), ее стоимость составляет{" "}
                      <strong className="text-[#0B1F3A]">300 USD</strong>. Оплата моего времени означает для меня серьёзность намерений клиента и{" "}
                      <span className="underline decoration-[#0075BF]/50">
                        всегда входит в стоимость дальнейших услуг
                      </span>
                      , если Вы решите поручить мне ведение Вашего дела.
                    </>
                  ) : (
                    <>
                      <strong>The cost of my consultation is 300 USD</strong> (conducted remotely via Zoom, Telegram, WhatsApp, or phone). Payment confirms the seriousness of your inquiry and{" "}
                      <span className="underline decoration-[#0075BF]/50">
                        is always included in the cost of future legal services
                      </span>{" "}
                      if you retain me as your attorney.
                    </>
                  )}
                </p>
                <p className="text-xs font-medium text-slate-500 pt-1 italic">
                  {isRu ? "С уважением, адвокат Андрей Плаксин, Esq." : "Sincerely, Andrey Plaksin, Esq."}
                </p>
              </div>

              {/* Direct Messengers Block */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  {isRu
                    ? "Быстрая запись напрямую через мессенджеры или по телефону:"
                    : "Quick booking via direct messengers or telephone:"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-300 hover:border-[#0B1F3A] text-xs font-semibold text-[#0B1F3A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0075BF]" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                  <a
                    href={CONTACT_INFO.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-300 hover:border-[#0075BF] bg-[#0075BF]/5 text-xs font-semibold text-[#005A9C] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-300 hover:border-emerald-600 bg-emerald-50/60 text-xs font-semibold text-emerald-800 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {isRu
                      ? "Или оставьте контактные данные, и мы свяжемся с Вами:"
                      : "Or provide your contact information below so we may contact you:"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Ваше имя и фамилия *" : "Your Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isRu ? "Например: Иван Петров" : "e.g. John Smith"}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Телефон (WhatsApp / Telegram) *" : "Phone (WhatsApp / Telegram) *"}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Электронная почта (Email) *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isRu ? "Интересующая категория визы" : "Visa / Matter Category"}
                    </label>
                    <select
                      value={visaCategory}
                      onChange={(e) => setVisaCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                    >
                      <option value="">
                        {isRu ? "— Выберите направление (необязательно) —" : "— Select category (optional) —"}
                      </option>
                      <option value="O-1 / EB-1A / EB-2 NIW (Таланты и карьера)">
                        {isRu ? "Виза O-1 / Грин-карта EB-1A / EB-2 NIW" : "O-1 Visa / EB-1A / EB-2 NIW Green Card"}
                      </option>
                      <option value="L-1A / EB-1C (Бизнес и руководители)">
                        {isRu ? "Виза L-1A / Грин-карта EB-1C (Руководители)" : "L-1A / EB-1C Multinational Executive"}
                      </option>
                      <option value="E-2 / EB-5 (Инвестиции в США)">
                        {isRu ? "Виза инвестора E-2 / Программа EB-5" : "E-2 Investor Visa / EB-5 Program"}
                      </option>
                      <option value="Family / Marriage Green Card (CR-1, IR-1, K-1)">
                        {isRu ? "Брак и воссоединение семьи (CR-1 / K-1 / I-130)" : "Marriage & Family Immigration (I-130 / K-1)"}
                      </option>
                      <option value="H-1B / F-1 / P-1 (Работа, учеба, спорт)">
                        {isRu ? "Рабочая H-1B / Студенческая F-1 / Спортивная P-1" : "H-1B Work / F-1 Student / P-1 Athlete"}
                      </option>
                      <option value="214(b) / 212(a) / 221(g) / RFE (Сложные случаи и отказы)">
                        {isRu ? "Отказ 214(b) / 221(g) / Запрос доказательств RFE" : "214(b) Refusal / 221(g) / USCIS RFE"}
                      </option>
                      <option value="Asylum / VAWA / N-400 Citizenship">
                        {isRu ? "Убежище (I-589) / VAWA / Гражданство США (N-400)" : "Asylum (I-589) / VAWA / Naturalization (N-400)"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Краткое описание ситуации (по желанию)" : "Brief Case Summary (optional)"}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      isRu
                        ? "Например: планирую переезд по O-1/EB-1A или открытие филиала компании в США..."
                        : "Briefly describe your goals or current visa status..."
                    }
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900 bg-white"
                  />
                </div>

                <Turnstile onToken={setTurnstileToken} locale={locale} />

                {error && (
                  <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {submitting
                      ? isRu
                        ? "Отправка..."
                        : "Submitting..."
                      : isRu
                      ? "Оставить заявку"
                      : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
