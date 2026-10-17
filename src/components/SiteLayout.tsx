"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  CreditCard,
  FileText,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/siteContent";
import { useSite } from "@/context/LanguageContext";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, setLocale, openInquiry, openPayment } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isRu = locale === "ru";

  const navLinks = [
    { href: "/", label: isRu ? "Главная" : "Home" },
    { href: "/practice", label: isRu ? "Услуги и визы" : "Practice Areas" },
    { href: "/about", label: isRu ? "Об адвокате" : "About Attorney" },
    { href: "/cases", label: isRu ? "Кейсы" : "Case Studies" },
    { href: "/fees", label: isRu ? "Стоимость и оплата" : "Fees & Payment" },
    { href: "/contacts", label: isRu ? "Контакты" : "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col pb-16 lg:pb-0">
      {/* Clean Single-Row Minimalist Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <Link href="/" className="shrink-0 group">
            <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0B1F3A] leading-none">
              THE PLAKSIN LAW FIRM, P.C.
            </div>
            <div className="text-[11px] text-[#0075BF] font-medium tracking-wide mt-1">
              {isRu ? "Визовый и иммиграционный адвокат в США" : "U.S. Visa & Immigration Attorney"}
            </div>
          </Link>

          {/* Desktop Navigation — Single line, never wraps */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname === "/eng"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm whitespace-nowrap py-1 transition-colors border-b-2 ${
                    isActive
                      ? "border-[#0075BF] text-[#0B1F3A] font-semibold"
                      : "border-transparent text-slate-600 hover:text-[#0B1F3A] font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3.5 shrink-0">
            <div className="text-right hidden xl:block pr-1">
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-sm font-semibold text-[#0B1F3A] hover:text-[#0075BF] whitespace-nowrap block"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              <div className="flex items-center justify-end gap-2.5 text-[11px] text-slate-500">
                <a
                  href={CONTACT_INFO.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0075BF]"
                >
                  Telegram
                </a>
                <span>•</span>
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLocale(isRu ? "en" : "ru")}
              className="px-2.5 py-2 border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              {isRu ? "EN" : "RU"}
            </button>

            <button
              type="button"
              onClick={() => openPayment()}
              className="px-4 py-2.5 border border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              {isRu ? "Оплатить" : "Pay"}
            </button>

            <button
              type="button"
              onClick={() => openInquiry()}
              className="px-4 py-2.5 bg-[#E59A23] hover:bg-[#d48b17] text-[#0B1F3A] text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
            >
              {isRu ? "Консультация" : "Consultation"}
            </button>
          </div>

          {/* Mobile Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setLocale(isRu ? "en" : "ru")}
              className="px-2.5 py-1.5 border border-slate-200 text-xs font-semibold text-slate-700"
            >
              {isRu ? "EN" : "RU"}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#0B1F3A] border border-slate-200"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 shadow-lg">
            <nav className="flex flex-col divide-y divide-slate-100">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 text-sm ${
                      isActive ? "font-bold text-[#0075BF]" : "font-medium text-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://legal-crm-demo.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="py-3 text-sm font-medium text-slate-500 flex items-center justify-between"
              >
                <span>{isRu ? "CRM-система" : "Legal CRM"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2.5 border border-slate-200 text-xs">
                <a href={CONTACT_INFO.phoneHref} className="font-bold text-[#0B1F3A] text-sm">
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <div className="flex gap-3 font-semibold">
                  <a href={CONTACT_INFO.telegramHref} target="_blank" rel="noreferrer" className="text-[#0075BF]">
                    Telegram
                  </a>
                  <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noreferrer" className="text-emerald-700">
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openPayment();
                  }}
                  className="py-3 border border-[#0B1F3A] text-[#0B1F3A] text-xs font-semibold"
                >
                  {isRu ? "Оплатить услуги" : "Make a Payment"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openInquiry();
                  }}
                  className="py-3 bg-[#E59A23] text-[#0B1F3A] text-xs font-bold"
                >
                  {isRu ? "Оставить заявку" : "Book Consultation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Calm, Authoritative Footer */}
      <footer className="bg-[#0B1F3A] text-slate-300 border-t border-[#1E3A5F]">
        {/* Subtle Anti-Scam Notice in Footer */}
        <div className="bg-[#081629] border-b border-[#1E3A5F] py-3 px-4 text-center text-xs text-slate-300">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#F2A93B] font-semibold mr-1.5">
              {isRu ? "Безопасность платежей:" : "Payment Security:"}
            </span>
            {isRu
              ? "Перед оплатой убедитесь, что связываетесь с нашей фирмой только через контактные данные, указанные на plaksinlaw.com."
              : "Before making a payment, ensure that you are contacting our firm only through the contact information provided on plaksinlaw.com."}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E3A5F]">
            {/* Col 1: Firm Info */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-serif text-xl font-bold text-white">
                THE PLAKSIN LAW FIRM, P.C.
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {isRu
                  ? "Американская юридическая фирма под руководством адвоката Андрея Плаксина (лицензии штатов Нью-Йорк, Нью-Джерси и Флорида). Полное сопровождение визовых и иммиграционных дел."
                  : "U.S. Immigration Law Firm led by Attorney Andrey Plaksin, Esq. (admitted in New York, New Jersey, and Florida)."}
              </p>
              <div className="pt-2 text-sm font-semibold text-white">
                <a href={CONTACT_INFO.phoneHref} className="hover:text-[#F2A93B]">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-4 text-xs font-medium text-sky-300">
                <a href={CONTACT_INFO.telegramHref} target="_blank" rel="noreferrer" className="hover:underline">
                  Telegram
                </a>
                <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noreferrer" className="hover:underline">
                  WhatsApp
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="lg:col-span-3 space-y-2.5 text-xs">
              <div className="text-white font-semibold uppercase tracking-wider mb-3">
                {isRu ? "Разделы сайта" : "Navigation"}
              </div>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-300 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://legal-crm-demo.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F2A93B] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isRu ? "CRM-система" : "Legal CRM"}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Offices */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <div className="text-white font-semibold uppercase tracking-wider">
                  {isRu ? "Офис в Нью-Йорке" : "New York Office"}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  225 Broadway, Suite 630
                  <br />
                  New York, NY 10007
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="text-white font-semibold uppercase tracking-wider">
                  {isRu ? "Офис в Майами" : "Miami Office"}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  20200 W Dixie Hwy, Suite 902
                  <br />
                  Aventura, FL 33180
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© The Plaksin Law Firm, P.C., 2026. {isRu ? "Все права защищены." : "All rights reserved."}</p>
            <p className="max-w-xl sm:text-right">
              {isRu
                ? "Материалы сайта носят информационный характер и не являются юридической консультацией."
                : "Attorney Advertising. Prior results do not guarantee a similar outcome."}
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0B1F3A] border-t border-[#1E3A5F] grid grid-cols-4 text-white text-[11px] font-medium">
        <a
          href={CONTACT_INFO.phoneHref}
          className="py-2.5 flex flex-col items-center justify-center gap-1 border-r border-[#1E3A5F]"
        >
          <Phone className="w-4 h-4 text-[#F2A93B]" />
          <span>{isRu ? "Звонок" : "Call"}</span>
        </a>
        <a
          href={CONTACT_INFO.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 flex flex-col items-center justify-center gap-1 border-r border-[#1E3A5F]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => openPayment()}
          className="py-2.5 flex flex-col items-center justify-center gap-1 border-r border-[#1E3A5F]"
        >
          <CreditCard className="w-4 h-4 text-sky-300" />
          <span>{isRu ? "Оплата" : "Pay"}</span>
        </button>
        <button
          type="button"
          onClick={() => openInquiry()}
          className="py-2.5 flex flex-col items-center justify-center gap-1 bg-[#E59A23] text-[#0B1F3A] font-bold"
        >
          <FileText className="w-4 h-4" />
          <span>{isRu ? "Заявка" : "Inquire"}</span>
        </button>
      </div>
    </div>
  );
}
