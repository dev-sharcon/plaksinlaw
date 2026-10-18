"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import {
  SITE_CONTENT,
  PRESS_LINKS,
  CONTACT_INFO,
} from "@/data/siteContent";

export default function HomePage() {
  const { locale, openInquiry, openPayment, openQuiz } = useSite();
  const isRu = locale === "ru";

  const content = SITE_CONTENT[locale];
  const categories = content.practiceSection.categories;
  const advantages = content.aboutSection.advantages;
  const featuredCases = content.casesSection.cases.slice(0, 3);

  return (
    <SiteLayout>
      {/* 1. HERO — Calm, authoritative, zero visual clutter */}
      <section className="bg-[#0B1F3A] text-white border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs uppercase tracking-[0.18em] text-[#F2A93B] font-semibold">
                {isRu
                  ? "Американская юридическая фирма • Нью-Йорк и Майами"
                  : "U.S. Immigration Law Firm • New York & Miami"}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-white">
                {content.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {content.hero.subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="px-7 py-4 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-sm transition-colors cursor-pointer text-center"
                >
                  {isRu ? "Записаться на консультацию" : "Schedule a Consultation"}
                </button>
                <Link
                  href="/practice"
                  className="px-7 py-4 border border-slate-500 hover:border-white text-white font-semibold text-sm transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <span>{isRu ? "Все визовые категории" : "Explore Practice Areas"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Clean factual credentials line */}
              <div className="pt-8 border-t border-[#1E3A5F] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                <div>
                  <div className="font-serif text-2xl font-bold text-white">J.D.</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    SUNY Law, Magna Cum Laude
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-white">NY • NJ • FL</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isRu ? "Лицензии 3 штатов США" : "Licensed in 3 U.S. States"}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-white">10.0 / 10</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isRu ? "Рейтинг Avvo Top Attorney" : "Avvo Top Immigration Lawyer"}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-white">5.0 ★</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isRu ? "90+ отзывов клиентов" : "90+ Verified Client Reviews"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Attorney Portrait (/img/attorney-portrait.png) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[355px]">
                <div className="bg-[#122B4D] border border-[#244673] p-3">
                  <img
                    src="/img/attorney-portrait.png"
                    alt={
                      isRu
                        ? "Иммиграционный адвокат США Андрей Плаксин"
                        : "U.S. Immigration Attorney Andrey Plaksin"
                    }
                    width={355}
                    height={440}
                    className="w-full h-auto block object-cover"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between border-b border-[#1E3A5F] pb-3">
                  <div>
                    <div className="font-serif text-lg font-bold text-white">
                      {isRu ? "Андрей Плаксин, Esq." : "Andrey Plaksin, Esq."}
                    </div>
                    <div className="text-xs text-slate-400">
                      {isRu
                        ? "Управляющий партнёр The Plaksin Law Firm, P.C."
                        : "Managing Principal, The Plaksin Law Firm, P.C."}
                    </div>
                  </div>
                  <Link
                    href="/about"
                    className="text-xs text-[#F2A93B] hover:underline font-medium shrink-0"
                  >
                    {isRu ? "Биография →" : "Biography →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRACTICE AREAS OVERVIEW — Clean 3-column summary */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
                {content.practiceSection.eyebrow}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                {content.practiceSection.title}
              </h2>
            </div>
            <Link
              href="/practice"
              className="text-sm font-semibold text-[#0075BF] hover:text-[#0B1F3A] inline-flex items-center gap-1.5"
            >
              <span>
                {isRu
                  ? "Подробное описание всех 23 категорий"
                  : "View all 23 visa & green card categories"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-[#0B1F3A] transition-colors"
              >
                <div>
                  <div className="text-xs font-mono font-semibold text-[#0075BF] uppercase tracking-wider mb-2">
                    {cat.code}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-6">
                    {cat.title}
                  </h3>

                  <ul className="space-y-3 mb-8">
                    {cat.items.slice(0, 6).map((item) => (
                      <li
                        key={item.code + item.name}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="font-mono text-xs font-bold text-[#0B1F3A] bg-slate-100 px-2 py-0.5 shrink-0 mt-0.5">
                          {item.code}
                        </span>
                        <span className="leading-snug">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/practice#${cat.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#0075BF] inline-flex items-center gap-1.5"
                  >
                    <span>{isRu ? "Подробнее о категории" : "Category Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openInquiry(cat.title)}
                    className="text-xs text-slate-500 hover:text-[#0B1F3A] underline cursor-pointer"
                  >
                    {isRu ? "Обсудить кейс" : "Inquire"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Assessment Strip */}
          <div className="mt-10 bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A]">
                {content.quizSection.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {content.quizSection.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openQuiz()}
                className="px-5 py-3 bg-[#0B1F3A] hover:bg-[#162d4c] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {content.quizSection.startInlineBtn}
              </button>
              <a
                href={CONTACT_INFO.testUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-slate-300 hover:border-[#0B1F3A] text-slate-800 text-xs font-semibold transition-colors"
              >
                usavisatest.com ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CLIENTS CHOOSE THE FIRM — Clean, editorial 3-column block */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {content.aboutSection.eyebrow}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {content.aboutSection.advantagesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {advantages.map((adv) => (
              <div key={adv.num} className="bg-white border border-slate-200 p-8">
                <div className="font-mono text-xs font-bold text-[#0075BF] mb-3">
                  {adv.num}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-3 leading-snug">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {adv.text}
                </p>
              </div>
            ))}
          </div>

          {/* Media mentions bar */}
          <div className="mt-12 pt-10 border-t border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {isRu
                ? "Экспертные комментарии Андрея Плаксина в СМИ:"
                : "Featured Expert Commentary in International Media:"}
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {PRESS_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-lg sm:text-xl font-bold text-slate-600 hover:text-[#0B1F3A] transition-colors"
                  title={item.topic}
                >
                  {item.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CASE STUDIES — 3 clean cards + link to /cases */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
                {content.casesSection.eyebrow}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                {content.casesSection.title}
              </h2>
            </div>
            <Link
              href="/cases"
              className="text-sm font-semibold text-[#0075BF] hover:text-[#0B1F3A] inline-flex items-center gap-1.5"
            >
              <span>
                {isRu ? "Смотреть все кейсы фирмы (6)" : "Read all 6 detailed case studies"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredCases.map((c) => (
              <div
                key={c.id}
                className="border border-slate-200 p-7 sm:p-8 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#0B1F3A] text-white">
                      {c.visaTypes.join(" • ")}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {c.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {c.situation}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-800 font-medium mb-3 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c.outcome}</span>
                  </div>
                  <Link
                    href="/cases"
                    className="text-xs font-bold uppercase tracking-wider text-[#0075BF] hover:text-[#0B1F3A] inline-flex items-center gap-1"
                  >
                    <span>{isRu ? "Читать разбор дела" : "Read Full Case"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONSULTATION & PAYMENT SUMMARY */}
      <section className="py-16 sm:py-24 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#F2A93B] font-semibold">
                {isRu ? "Запись на консультацию" : "Initial Consultation"}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {isRu
                  ? "Персональный разбор вашей ситуации с адвокатом Андреем Плаксиным"
                  : "Schedule a Direct Consultation with Attorney Andrey Plaksin"}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {isRu
                  ? "На консультации адвокат детально изучает вашу ситуацию и формирует пошаговую правовую стратегию. При заключении договора стоимость консультации ($300) полностью засчитывается в счёт оплаты договора."
                  : "During the consultation, Attorney Andrey Plaksin evaluates your background and builds a clear legal roadmap. If you retain our firm, the $300 consultation fee is credited in full toward your retainer agreement."}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="px-6 py-3.5 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-sm transition-colors cursor-pointer"
                >
                  {isRu ? "Оставить заявку" : "Request Consultation"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openPayment({
                      desc: isRu
                        ? "Первичная консультация с адвокатом"
                        : "Initial Attorney Consultation",
                      sum: "300",
                    })
                  }
                  className="px-6 py-3.5 border border-slate-500 hover:border-white text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  {isRu ? "Оплатить консультацию ($300)" : "Pay Consultation Fee ($300)"}
                </button>
                <Link
                  href="/fees"
                  className="px-6 py-3.5 text-slate-300 hover:text-white text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{isRu ? "Условия работы и этапы" : "Engagement Terms"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#122B4D] border border-[#244673] p-7 sm:p-8 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#F2A93B]">
                {isRu ? "Прямая связь с офисом" : "Direct Office Contact"}
              </div>
              <div>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-mono text-2xl sm:text-3xl font-bold text-white hover:text-[#F2A93B] transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  {isRu
                    ? "Нью-Йорк (225 Broadway #630) • Майами (20200 W Dixie Hwy #902)"
                    : "New York (225 Broadway #630) • Miami (20200 W Dixie Hwy #902)"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-[#1E3A5F] hover:bg-[#274b7a] text-white text-xs font-semibold text-center transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={CONTACT_INFO.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-[#1E3A5F] hover:bg-[#274b7a] text-white text-xs font-semibold text-center transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
