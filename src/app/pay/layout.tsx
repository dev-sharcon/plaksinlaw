import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Онлайн-оплата",
  description:
    "Оплата консультации и юридических услуг The Plaksin Law Firm, P.C.",
  alternates: { canonical: "/pay" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
