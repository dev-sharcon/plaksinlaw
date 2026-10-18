import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Об адвокате Андрее Плаксине",
  description:
    "Андрей Плаксин, Esq. — визовый и иммиграционный адвокат в США с лицензиями штатов Нью-Йорк, Нью-Джерси и Флорида. Образование, членство в ассоциациях, публикации в СМИ.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
