"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import { SITE_CONTENT, CONTACT_INFO } from "@/data/siteContent";

export default function PracticePage() {
  const { locale, openInquiry, openQuiz } = useSite();
  const isRu = locale === "ru";
  const content = SITE_CONTENT[locale];
  const categories = content.practiceSection.categories;

  const [expandedKey, setExpandedKey] = useState<string | null>(
    `${categories[0]?.id}-${categories[0]?.items[0]?.code}-${categories[0]?.items[0]?.name}`
  );

  return (
    <SiteLayout>
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B] mb-3">
              {content.practiceSection.eyebrow}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {content.practiceSection.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {content.practiceSection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Category Jump Bar */}
      <div className="bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 bg-white border border-slate-200 hover:border-[#0B1F3A] text-xs font-semibold text-[#0B1F3A] transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openQuiz()}
            className="text-xs font-semibold text-[#0075BF] hover:text-[#0B1F3A] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{content.quizSection.startInlineBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Detailed Categories */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {categories.map((cat, idx) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#0075BF] uppercase tracking-wider mb-1">
                    0{idx + 1} / {cat.code}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1F3A]">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{cat.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => openInquiry(cat.title)}
                  className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#162d4c] text-white text-xs font-semibold transition-colors self-start md:self-auto cursor-pointer"
                >
                  {isRu ? "Записаться на консультацию" : "Consult on This Category"}
                </button>
              </div>

              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {cat.items.map((item) => {
                  const uniqueKey = `${cat.id}-${item.code}-${item.name}`;
                  const isOpen = expandedKey === uniqueKey;
                  return (
                    <div key={uniqueKey} className="bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedKey(isOpen ? null : uniqueKey)
                        }
                        className="w-full py-5 px-2 sm:px-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#F1F5F9] text-[#0B1F3A] border border-slate-200 shrink-0 min-w-[110px] text-center">
                            {item.code}
                          </span>
                          <div>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F3A]">
                              {item.name}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5 font-mono">
                              {item.timeline}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#0B1F3A]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-6 pb-6 pt-3 bg-[#F8FAFC] border-t border-slate-100">
                          <div className="max-w-4xl space-y-4">
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {item.summary}
                            </p>
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  openInquiry(`${item.code} — ${item.name}`)
                                }
                                className="px-4 py-2 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] text-xs font-bold transition-colors cursor-pointer"
                              >
                                {content.practiceSection.inquireAction}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Eligibility CTA */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              {content.quizSection.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {content.quizSection.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openInquiry()}
              className="px-6 py-3.5 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] text-xs font-bold transition-colors cursor-pointer"
            >
              {isRu ? "Записаться на консультацию" : "Book Consultation"}
            </button>
            <a
              href={CONTACT_INFO.testUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-xs font-semibold transition-colors"
            >
              usavisatest.com ↗
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
