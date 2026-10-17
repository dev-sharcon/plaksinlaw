"use client";

import React, { useState } from "react";
import { X, ArrowUpRight, Check } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";
import {
  SITE_CONTENT,
  CERTIFICATES_DATA,
  PRESS_LINKS,
  CONTACT_INFO,
} from "@/data/siteContent";

export default function AboutPage() {
  const { locale, openInquiry } = useSite();
  const isRu = locale === "ru";
  const content = SITE_CONTENT[locale];
  const about = content.aboutSection;

  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    img: string;
  } | null>(null);

  return (
    <SiteLayout>
      {/* Page Header + Attorney Biography */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Portrait Column */}
            <div className="lg:col-span-4">
              <div className="bg-[#122B4D] border border-[#244673] p-3 max-w-[355px]">
                <img
                  src="/foto.png"
                  alt={
                    isRu
                      ? "Адвокат Андрей Плаксин"
                      : "Attorney Andrey Plaksin, Esq."
                  }
                  width={355}
                  height={440}
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div className="mt-4 space-y-1 text-xs text-slate-300">
                <div className="font-serif text-xl font-bold text-white">
                  {about.title}
                </div>
                <div>
                  {isRu
                    ? "Управляющий партнёр The Plaksin Law Firm, P.C."
                    : "Managing Principal, The Plaksin Law Firm, P.C."}
                </div>
                <div className="text-[#F2A93B] pt-1">
                  {isRu
                    ? "Лицензии штатов: Нью-Йорк, Нью-Джерси, Флорида"
                    : "Admitted to Practice: New York, New Jersey, Florida"}
                </div>
              </div>
            </div>

            {/* Bio & Education Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B]">
                {about.eyebrow}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {isRu
                  ? "Андрей Плаксин — иммиграционный адвокат в США"
                  : "Andrey Plaksin — U.S. Visa & Immigration Attorney"}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {about.subtitle}
              </p>

              {/* Education Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1E3A5F]">
                {about.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="bg-[#122B4D] border border-[#244673] p-6"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-[#F2A93B] mb-2">
                      {edu.honors}
                    </div>
                    <div className="font-serif text-xl font-bold text-white">
                      {edu.degree}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {edu.school}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bar Admissions List */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#F2A93B]">
                  {about.licensesTitle}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {about.licensesList.map((lic) => (
                    <li key={lic} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#F2A93B] shrink-0 mt-0.5" />
                      <span>{lic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="px-6 py-3.5 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] text-xs font-bold transition-colors cursor-pointer"
                >
                  {isRu ? "Записаться на консультацию" : "Schedule a Consultation"}
                </button>
                <a
                  href={CONTACT_INFO.avvoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 border border-slate-500 hover:border-white text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Avvo 10.0 Superb</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Firm Advantages */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {isRu ? "Подход к работе" : "Our Approach"}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {about.advantagesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {about.advantages.map((adv) => (
              <div
                key={adv.num}
                className="border border-slate-200 p-8 bg-white"
              >
                <div className="font-mono text-xs font-bold text-[#0075BF] mb-2">
                  {adv.num}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] leading-snug mb-3">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {adv.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diplomas, Bar Licenses & Certificates */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF] mb-2">
              {isRu ? "Квалификация и лицензии" : "Credentials & Admissions"}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
              {isRu
                ? "Дипломы, адвокатские лицензии и членство в ассоциациях"
                : "State Bar Admissions & Professional Memberships"}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {isRu
                ? "Нажмите на документ для увеличения."
                : "Click on any credential to view a larger image."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {CERTIFICATES_DATA.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() =>
                  setSelectedCert({ title: cert.title, img: cert.img })
                }
                className="group bg-white border border-slate-200 p-4 text-left hover:border-[#0B1F3A] transition-colors flex flex-col justify-between cursor-pointer"
              >
                <div className="aspect-[3/4] bg-slate-50 flex items-center justify-center overflow-hidden mb-3 border border-slate-100">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#0075BF] uppercase">
                    {cert.year}
                  </div>
                  <div className="text-xs font-medium text-slate-800 leading-snug mt-0.5">
                    {cert.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Ratings */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Ratings */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF]">
                {content.awardsSection.eyebrow}
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                {content.awardsSection.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {content.awardsSection.subtitle}
              </p>
              <div className="space-y-4 pt-2">
                <a
                  href={CONTACT_INFO.avvoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-slate-200 p-5 hover:border-[#0B1F3A] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-[#0B1F3A]">
                      {content.awardsSection.avvoRatingTitle}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#0075BF]" />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {content.awardsSection.avvoReviewsTitle}
                  </p>
                </a>

                <a
                  href={CONTACT_INFO.superLawyersUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-slate-200 p-5 hover:border-[#0B1F3A] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-[#0B1F3A]">
                      Super Lawyers — Rising Stars
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#0075BF]" />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {isRu
                      ? "Включён в число 2.5% лучших практикующих юристов региона New York Metro."
                      : "Selected to Rising Stars (top 2.5% of practicing attorneys in the New York Metro area)."}
                  </p>
                </a>
              </div>
            </div>

            {/* Press Publications */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0075BF]">
                {isRu ? "Публикации в СМИ" : "Media Commentary"}
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                {isRu
                  ? "Экспертные комментарии Андрея Плаксина"
                  : "Attorney Andrey Plaksin in the Press"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {PRESS_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-slate-200 p-5 hover:border-[#0B1F3A] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#0075BF] uppercase">
                        {item.name}
                      </div>
                      <div className="font-serif text-lg font-bold text-[#0B1F3A] mt-1">
                        {item.topic}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-4 inline-flex items-center gap-1">
                      <span>{isRu ? "Читать материал" : "Read Article"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Certificate */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white max-w-lg w-full p-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A]">
                {selectedCert.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center bg-slate-50 p-4">
              <img
                src={selectedCert.img}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
