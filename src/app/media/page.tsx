"use client";

import React from "react";
import SiteLayout from "@/components/SiteLayout";
import { useSite } from "@/context/LanguageContext";

// TV appearances migrated from the legacy /ntv/, /rtvi/, /russia24/ and /vesti24/ pages.
const VIDEOS: { youtube?: string; file?: string; channel: string; ru: string; en: string }[] = [
  { file: "/vid/ct-fullx.mp4", channel: "НТВ", ru: "Эфир телеканала НТВ", en: "NTV broadcast" },
  { youtube: "xKv6pbh1GfQ", channel: "RTVI", ru: "Эфир RTVI (США)", en: "RTVI (USA) broadcast" },
  { youtube: "vniVj-QVBZQ", channel: "Россия 24", ru: "Эфир телеканала «Россия 24»", en: "Russia 24 broadcast" },
  { youtube: "bbNmoQvysgw", channel: "Вести 24", ru: "Эфир «Вести 24»", en: "Vesti 24 broadcast" },
];

export default function MediaPage() {
  const { locale, openInquiry } = useSite();
  const isRu = locale === "ru";

  return (
    <SiteLayout>
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2A93B] mb-3">
              {isRu ? "СМИ и телевидение" : "Media & Television"}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {isRu ? "Адвокат Андрей Плаксин в эфире" : "Attorney Andrey Plaksin on Air"}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isRu
                ? "Комментарии по иммиграционному праву и визовой политике США на телевидении."
                : "Television commentary on U.S. immigration law and visa policy."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((v) => (
            <figure key={v.channel} className="border border-slate-200 bg-[#F8FAFC]">
              <div className="relative aspect-video bg-black">
                {v.youtube ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
                    title={isRu ? v.ru : v.en}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full"
                    src={v.file}
                    controls
                    preload="metadata"
                    playsInline
                  />
                )}
              </div>
              <figcaption className="px-5 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0075BF]">
                  {v.channel}
                </div>
                <div className="font-serif text-lg font-semibold text-[#0B1F3A] mt-1">
                  {isRu ? v.ru : v.en}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <button
            type="button"
            onClick={() => openInquiry()}
            className="px-8 py-4 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] font-bold text-sm transition-colors cursor-pointer"
          >
            {isRu ? "Записаться на консультацию" : "Book a Consultation"}
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
