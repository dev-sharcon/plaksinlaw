"use client";

import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { CONTACT_INFO, Locale } from "@/data/siteContent";
import DirectContactNotice from "@/components/DirectContactNotice";
import Turnstile, { turnstileEnabled } from "@/components/Turnstile";
import { postCrm, crmErrorMessage } from "@/lib/crmClient";

interface VisaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export default function VisaQuizModal({ isOpen, onClose, locale }: VisaQuizModalProps) {
  const isRu = locale === "ru";
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [profile, setProfile] = useState("");
  const [refusals, setRefusals] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [demo, setDemo] = useState(false);

  if (!isOpen) return null;

  const getRecommendedCategory = () => {
    if (profile.includes("Инвестор") || profile.includes("Investor")) {
      return "E-2 / EB-5 (Инвестиционная иммиграция)";
    }
    if (profile.includes("Собственник бизнеса") || profile.includes("Business Owner")) {
      return "L-1A / EB-1C (Международные руководители)";
    }
    if (profile.includes("Талант") || profile.includes("Extraordinary")) {
      return "O-1 / EB-1A / EB-2 NIW (Выдающиеся способности)";
    }
    if (refusals.includes("Да") || refusals.includes("Yes")) {
      return "Правовая стратегия после отказа 214(b) / 221(g)";
    }
    return "Индивидуальный подбор визовой категории США";
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !phone.trim()) return;
    if (turnstileEnabled && !turnstileToken) {
      setError(isRu ? "Пожалуйста, подтвердите, что Вы не робот." : "Please complete the verification.");
      return;
    }
    setSubmitting(true);
    const rec = getRecommendedCategory();
    const summary = `Цель: ${goal} | Профиль: ${profile} | Отказы ранее: ${refusals}`;
    try {
      const res = await postCrm({
        action: "create_lead",
        locale,
        turnstileToken,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        visaCategory: rec,
        source: "visa_quiz",
        notes: `Результат экспресс-теста на сайте: ${summary}`,
      });
      setDemo(Boolean(res.demo));
      setDone(true);
    } catch (err) {
      setError(crmErrorMessage(err, isRu));
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setDone(false);
    onClose();
  };

  const goals = isRu
    ? [
        "Постоянный переезд в США (Грин-карта / ПМЖ)",
        "Открытие или покупка бизнеса в США (L-1 / E-2)",
        "Рабочая виза для талантливых специалистов (O-1 / H-1B)",
        "Семейная иммиграция / Виза невесты или супруга",
        "Преодоление отказа 214(b) или сложная турвиза B1/B2",
      ]
    : [
        "Permanent Relocation to the U.S. (Green Card)",
        "Launch or Acquire a U.S. Business (L-1 / E-2)",
        "Work Visa for Extraordinary Talent / Professionals (O-1 / H-1B)",
        "Family Reunification or Marriage Visa (I-130 / K-1)",
        "Overcoming Prior 214(b) Refusal or Complex B1/B2",
      ];

  const profiles = isRu
    ? [
        "Собственник бизнеса / Топ-менеджер компании",
        "Инвестор (готовность инвестировать от $80k до $800k+)",
        "Талантливый специалист (IT, наука, искусство, спорт, медиа)",
        "Дипломированный специалист / Выпускник вуза",
        "Родственник / Супруг(а) гражданина или резидента США",
      ]
    : [
        "Business Owner / Senior Corporate Executive",
        "Investor (Capital available from $80k to $800k+)",
        "Extraordinary Ability (Tech, Science, Arts, Athletics, Media)",
        "Degreed Professional / University Graduate",
        "Spouse or Relative of a U.S. Citizen / LPR",
      ];

  const refusalOptions = isRu
    ? [
        "Нет, отказов в визе США не было",
        "Был 1 отказ по статье 214(b)",
        "Было несколько отказов или административная проверка 221(g)",
        "Уже нахожусь в США, требуется смена статуса",
      ]
    : [
        "No prior U.S. visa refusals",
        "One prior refusal under INA § 214(b)",
        "Multiple refusals or 221(g) administrative processing",
        "Currently inside the U.S., seeking Change/Adjustment of Status",
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/80 backdrop-blur-[2px] p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white border border-slate-300 shadow-2xl my-auto">
        <div className="flex items-center justify-between bg-[#0B1F3A] text-white px-6 py-4 border-b border-[#1E3A5F]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#F2A93B] font-semibold">
              {isRu ? `ШАГ ${done ? 4 : step} ИЗ 4 • ДИАГНОСТИКА КЕЙСА` : `STEP ${done ? 4 : step} OF 4 • CASE ASSESSMENT`}
            </p>
            <h3 className="font-serif text-xl font-semibold tracking-tight mt-0.5">
              {isRu ? "Оценка шансов на визу и грин-карту" : "U.S. Visa & Green Card Eligibility Assessment"}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close quiz modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {done ? (
            <div className="space-y-5 text-center py-2">
              <div className="w-12 h-12 mx-auto bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0075BF]">
                  {isRu ? "Предварительная рекомендация" : "Preliminary Classification Match"}
                </p>
                <h4 className="font-serif text-2xl font-semibold text-[#0B1F3A]">
                  {getRecommendedCategory()}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isRu
                    ? "Это предварительная оценка. Точную стратегию адвокат Андрей Плаксин определит на консультации."
                    : "This is a preliminary assessment. Attorney Andrey Plaksin will define the exact strategy at your consultation."}
                </p>
              </div>
              {demo && <DirectContactNotice isRu={isRu} />}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={CONTACT_INFO.testUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 text-xs font-semibold text-slate-700 hover:border-[#0B1F3A]"
                >
                  <span>{isRu ? "Полный тест на usavisatest.com" : "Full test on usavisatest.com"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  {isRu ? "Готово" : "Done"}
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-[#0B1F3A]">
                {isRu ? "1. Какова Ваша основная цель в США?" : "1. What is your primary objective in the United States?"}
              </h4>
              <div className="space-y-2">
                {goals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setGoal(item);
                      setStep(2);
                    }}
                    className="w-full text-left px-4 py-3 border border-slate-200 hover:border-[#0075BF] hover:bg-[#0075BF]/5 text-sm font-medium text-slate-800 flex items-center justify-between transition-colors"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 text-[#0075BF] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-[#0B1F3A]">
                {isRu ? "2. Какой профессиональный профиль описывает Вас точнее всего?" : "2. Which profile best describes your background?"}
              </h4>
              <div className="space-y-2">
                {profiles.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setProfile(item);
                      setStep(3);
                    }}
                    className="w-full text-left px-4 py-3 border border-slate-200 hover:border-[#0075BF] hover:bg-[#0075BF]/5 text-sm font-medium text-slate-800 flex items-center justify-between transition-colors"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 text-[#0075BF] shrink-0" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                {isRu ? "← Назад к шагу 1" : "← Back to Step 1"}
              </button>
            </div>
          ) : step === 3 ? (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-[#0B1F3A]">
                {isRu ? "3. Были ли у Вас ранее отказы в визах США?" : "3. Have you ever experienced a U.S. visa refusal?"}
              </h4>
              <div className="space-y-2">
                {refusalOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setRefusals(item);
                      setStep(4);
                    }}
                    className="w-full text-left px-4 py-3 border border-slate-200 hover:border-[#0075BF] hover:bg-[#0075BF]/5 text-sm font-medium text-slate-800 flex items-center justify-between transition-colors"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4 text-[#0075BF] shrink-0" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                {isRu ? "← Назад к шагу 2" : "← Back to Step 2"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleComplete} className="space-y-4">
              <div className="bg-[#F8F9FA] border-l-4 border-[#0075BF] p-3.5 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-[#0B1F3A]">
                  {isRu ? "Предварительно подходящая категория:" : "Recommended Classification:"}{" "}
                  <span className="text-[#0075BF]">{getRecommendedCategory()}</span>
                </p>
                <p className="text-slate-500">
                  {isRu
                    ? "Оставьте контакты, чтобы получить заключение и зафиксировать результаты в системе адвоката."
                    : "Enter your contact details to save your evaluation and receive attorney feedback."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isRu ? "Ваше имя *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRu ? "Телефон (WhatsApp / Telegram) *" : "Phone (WhatsApp / Telegram) *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#0075BF] focus:outline-none text-slate-900"
                  />
                </div>
              </div>

              <Turnstile onToken={setTurnstileToken} locale={locale} />

              {error && (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-3 border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  {isRu ? "Назад" : "Back"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-6 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider"
                >
                  {submitting
                    ? isRu
                      ? "Сохранение..."
                      : "Saving..."
                    : isRu
                    ? "Получить оценку и передать адвокату"
                    : "Save Assessment & Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
