"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/data/siteContent";
import InquiryModal from "@/components/modals/InquiryModal";
import PaymentModal from "@/components/modals/PaymentModal";
import VisaQuizModal from "@/components/modals/VisaQuizModal";

const LOCALE_STORAGE_KEY = "plaksin-locale";

interface PaymentPrefill {
  fio?: string;
  phone?: string;
  email?: string;
  desc?: string;
  sum?: string;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  /** Home page URL for the current language: "/" is Russian, "/eng" is English. */
  homeHref: string;
  openInquiry: (category?: string) => void;
  openPayment: (prefill?: PaymentPrefill) => void;
  openQuiz: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ru",
  setLocale: () => {},
  homeHref: "/",
  openInquiry: () => {},
  openPayment: () => {},
  openQuiz: () => {},
});

// The home page has a fixed language per URL; other pages follow the visitor's choice (Russian by default).
const localeForPath = (path: string | null): Locale | null =>
  path === "/eng" ? "en" : path === "/" ? "ru" : null;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(localeForPath(pathname) ?? "ru");

  // On the home URLs the path decides; elsewhere restore the saved choice after hydration.
  useEffect(() => {
    const fromPath = localeForPath(pathname);
    if (fromPath) {
      setLocaleState(fromPath);
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, fromPath);
      } catch {}
      return;
    }
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved === "ru" || saved === "en") setLocaleState(saved);
    } catch {}
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, loc);
    } catch {}
    if (localeForPath(pathname)) router.push(loc === "en" ? "/eng" : "/");
  };

  const homeHref = locale === "en" ? "/eng" : "/";

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentPrefill, setPaymentPrefill] = useState<PaymentPrefill>({});
  const [quizOpen, setQuizOpen] = useState(false);

  const openInquiry = (category?: string) => {
    setInquiryCategory(category || "");
    setInquiryOpen(true);
  };

  const openPayment = (prefill?: PaymentPrefill) => {
    setPaymentPrefill(prefill || {});
    setPaymentOpen(true);
  };

  const openQuiz = () => {
    setQuizOpen(true);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        homeHref,
        openInquiry,
        openPayment,
        openQuiz,
      }}
    >
      {children}

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        locale={locale}
        preselectedCategory={inquiryCategory}
        onOpenPayment={(prefill) => openPayment(prefill)}
      />

      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        locale={locale}
        initialValues={paymentPrefill}
      />

      <VisaQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        locale={locale}
      />
    </LanguageContext.Provider>
  );
}

export function useSite() {
  return useContext(LanguageContext);
}
