import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стоимость и оплата",
  description:
    "Стоимость консультации и юридических услуг The Plaksin Law Firm, P.C. Оплата банковской картой или переводом Zelle без комиссии.",
  alternates: { canonical: "/fees" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
