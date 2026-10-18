import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Результаты дел адвокатского бюро The Plaksin Law Firm, P.C.: визы O-1, L-1, E-2, грин-карты EB-1A и другие иммиграционные кейсы.",
  alternates: { canonical: "/cases" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
