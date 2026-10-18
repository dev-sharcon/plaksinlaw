"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  openInquiry: (category?: string) => void;
  openPayment: (prefill?: PaymentPrefill) => void;
  openQuiz: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  openInquiry: () => {},
  openPayment: () => {},
  openQuiz: () => {},
});

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Restore the visitor's language choice after hydration and keep <html lang> in sync.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved === "ru" || saved === "en") setLocaleState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, loc);
    } catch {}
  };
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
