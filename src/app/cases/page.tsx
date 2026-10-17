"use client";

import React, { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import { SITE_CONTENT, CONTACT_INFO } from "@/data/siteContent";

export default function CasesPage() {
  const { locale, openInquiry } = useSite();
  const isRu = locale === "ru";
  const casesSection = SITE_CONTENT[locale].casesSection;
  const cases = casesSection.cases;

  const [filter, setFilter] = useState<string>("ALL");

  const badges = ["ALL", ...Array.from(new Set(cases.map((c) => c.badge)))];
  const filteredCases =
    filter === "ALL" ? cases : cases.filter((c) => c.badge === filter);

  return (
    <SiteLayout>
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B] mb-3">
              {casesSection.eyebrow}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {casesSection.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {casesSection.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setFilter(b)}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                  filter === b
                    ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#0B1F3A]"
                }`}
              >
                {b === "ALL" ? (isRu ? "Все кейсы (6)" : "All Cases (6)") : b}
              </button>
            ))}
          </div>

          <a
            href={CONTACT_INFO.avvoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#0075BF] hover:text-[#0B1F3A] inline-flex items-center gap-1"
          >
            <span>
              {isRu
                ? "Читать отзывы клиентов на Avvo (10.0 ★)"
                : "Read Verified Client Reviews on Avvo (10.0 ★)"}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Cases List */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filteredCases.map((c) => (
            <article
              key={c.id}
              className="border border-slate-200 bg-white p-7 sm:p-10"
            >
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-[#0B1F3A] text-white">
                    {c.number}
                  </span>
                  {c.visaTypes.map((vt) => (
                    <span
                      key={vt}
                      className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-100 text-[#0B1F3A] border border-slate-200"
                    >
                      {vt}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#0075BF]">
                  {c.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-6 mb-6">
                {c.title}
              </h2>

              {/* Structured 3-column breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Client & Situation */}
                <div className="lg:col-span-4 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {isRu ? "Клиент" : "Client Profile"}
                    </div>
                    <p className="text-sm font-semibold text-[#0B1F3A]">
                      {c.clientRole}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {casesSection.situationLabel}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {c.situation}
                    </p>
                  </div>
                </div>

                {/* Legal Work Performed */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {casesSection.solutionLabel}
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
                    {c.solution.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#0075BF] mt-0.5">
                          •
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="lg:col-span-3 bg-[#F8FAFC] border border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>{casesSection.outcomeLabel}</span>
                    </div>
                    <p className="text-sm font-medium text-[#0B1F3A] leading-relaxed">
                      {c.outcome}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openInquiry(`${c.number} — ${c.title}`)}
                    className="mt-5 w-full py-2.5 bg-[#0B1F3A] hover:bg-[#162d4c] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {casesSection.inquireSimilar}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
