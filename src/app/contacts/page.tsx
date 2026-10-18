"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/data/siteContent";
import DirectContactNotice from "@/components/DirectContactNotice";
import Turnstile, { turnstileEnabled } from "@/components/Turnstile";
import { postCrm, crmErrorMessage } from "@/lib/crmClient";

export default function ContactsPage() {
  const { locale, openPayment } = useSite();
  const isRu = locale === "ru";

  const [officeMap, setOfficeMap] = useState<"ny" | "miami">("ny");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [demo, setDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !phone) return;
    if (turnstileEnabled && !turnstileToken) {
      setError(isRu ? "Пожалуйста, подтвердите, что Вы не робот." : "Please complete the verification.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await postCrm({
        type: "CONSULTATION_INQUIRY",
        source: "contacts_page",
        clientName: name,
        phone,
        email,
        category: category || "General Consultation",
        notes: message,
        locale,
        turnstileToken,
      });
      setDemo(Boolean(res.demo));
      setSubmitted(true);
    } catch (err) {
      setError(crmErrorMessage(err, isRu));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B] mb-3">
              {isRu ? "Контактная информация" : "Contact the Firm"}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {isRu
                ? "Офисы в Нью-Йорке и Майами"
                : "New York & Miami Offices"}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isRu
                ? "Мы работаем с клиентами по всей территории США и за рубежом. Личные встречи проводятся по предварительной записи, дистанционные консультации — по телефону, Zoom, WhatsApp или Telegram."
                : "We represent clients across all 50 U.S. states and worldwide. In-person meetings are available by appointment in New York and Miami, and remote consultations are conducted via phone, Zoom, WhatsApp, or Telegram."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Office Addresses & Direct Channels */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
                  {isRu ? "Прямая связь" : "Direct Contact"}
                </div>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-mono text-2xl sm:text-3xl font-bold text-[#0B1F3A] hover:text-[#0075BF] transition-colors block"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <div className="flex flex-wrap gap-4 mt-3 text-sm font-semibold">
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
                    WhatsApp ↗
                  </a>
                  <a
                    href={CONTACT_INFO.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0075BF] hover:underline"
                  >
                    Telegram (@plaksinlaw) ↗
                  </a>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-slate-700 hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Two Offices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="border border-slate-200 p-6 bg-[#F8FAFC]">
                  <div className="text-xs font-mono font-bold text-[#0075BF] uppercase mb-2">
                    {isRu ? "Офис в Нью-Йорке" : "New York Office"}
                  </div>
                  <div className="font-serif text-xl font-bold text-[#0B1F3A] mb-2">
                    Manhattan, NY
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    225 Broadway, Suite 630
                    <br />
                    New York, NY 10007
                  </p>
                  <button
                    type="button"
                    onClick={() => setOfficeMap("ny")}
                    className={`mt-4 text-xs font-semibold underline cursor-pointer ${
                      officeMap === "ny" ? "text-[#0075BF]" : "text-slate-500"
                    }`}
                  >
                    {isRu ? "Показать на карте" : "Show on Map"}
                  </button>
                </div>

                <div className="border border-slate-200 p-6 bg-[#F8FAFC]">
                  <div className="text-xs font-mono font-bold text-[#0075BF] uppercase mb-2">
                    {isRu ? "Офис в Майами" : "Miami Office"}
                  </div>
                  <div className="font-serif text-xl font-bold text-[#0B1F3A] mb-2">
                    Aventura, FL
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    20200 W Dixie Hwy, Suite 902
                    <br />
                    Aventura, FL 33180
                  </p>
                  <button
                    type="button"
                    onClick={() => setOfficeMap("miami")}
                    className={`mt-4 text-xs font-semibold underline cursor-pointer ${
                      officeMap === "miami" ? "text-[#0075BF]" : "text-slate-500"
                    }`}
                  >
                    {isRu ? "Показать на карте" : "Show on Map"}
                  </button>
                </div>
              </div>

              {/* Map */}
              <div className="border border-slate-200 bg-slate-100 h-72 overflow-hidden">
                <iframe
                  title={officeMap === "ny" ? "New York Office Map" : "Miami Office Map"}
                  src={
                    officeMap === "ny"
                      ? "https://www.google.com/maps?q=225+Broadway+Suite+630+New+York+NY+10007&output=embed"
                      : "https://www.google.com/maps?q=20200+W+Dixie+Hwy+Suite+902+Aventura+FL+33180&output=embed"
                  }
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Consultation Request Form */}
            <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 p-7 sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
                {isRu ? "Заявка на консультацию" : "Consultation Request"}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-2">
                {isRu
                  ? "Связаться с адвокатом"
                  : "Request a Consultation with Attorney Andrey Plaksin"}
              </h2>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                {isRu
                  ? "Оставьте ваши контактные данные для согласования даты и времени консультации ($300, засчитывается при заключении договора в течение 30 дней)."
                  : "Submit your contact details to schedule a consultation ($300 fee, credited in full toward your retainer agreement within 30 days)."}
              </p>

              {submitted ? (
                <div className="bg-white border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <Check className="w-5 h-5" />
                    <span>
                      {isRu
                        ? "Ваша заявка успешно отправлена."
                        : "Your inquiry has been received."}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isRu
                      ? "Мы свяжемся с вами в ближайшее рабочее время для подтверждения записи. Вы также можете сразу оплатить консультацию онлайн."
                      : "Our office will contact you shortly to confirm your appointment time. You may also complete your consultation payment online."}
                  </p>
                  {demo && <DirectContactNotice isRu={isRu} />}
                  <button
                    type="button"
                    onClick={() =>
                      openPayment({
                        fio: name,
                        phone,
                        email,
                        desc: category || "Attorney Consultation",
                        sum: "300",
                      })
                    }
                    className="px-5 py-3 bg-[#E59A23] text-[#0B1F3A] text-xs font-bold cursor-pointer"
                  >
                    {isRu ? "Перейти к оплате ($300)" : "Pay Consultation Fee ($300)"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isRu ? "Ваше имя и фамилия *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRu ? "Иван Иванов" : "John Doe"}
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isRu ? "Телефон / Мессенджер *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (___) ___-____"
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isRu ? "Интересующая виза / услуга" : "Visa Category / Matter"}
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder={
                        isRu
                          ? "Например: EB-1A, O-1, E-2, L-1, Семейное воссоединение"
                          : "e.g., EB-1A, O-1, E-2, L-1, Family Immigration"
                      }
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isRu ? "Краткое описание ситуации" : "Brief Case Summary"}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isRu
                          ? "Опишите вашу текущую ситуацию и вопросы к адвокату..."
                          : "Briefly describe your background and immigration goals..."
                      }
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-300 focus:border-[#0075BF] focus:outline-none"
                    />
                  </div>

                  <Turnstile onToken={setTurnstileToken} locale={locale} />

                  {error && (
                    <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-sm transition-colors cursor-pointer"
                  >
                    {submitting
                      ? isRu
                        ? "Отправка..."
                        : "Submitting..."
                      : isRu
                        ? "Отправить заявку на консультацию"
                        : "Submit Consultation Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
