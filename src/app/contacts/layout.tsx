import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты: офисы в Нью-Йорке и Майами",
  description:
    "Иммиграционный адвокат Андрей Плаксин: 225 Broadway, Suite 630, New York, NY 10007 и Авентура, Флорида. Тел. +1 (929) 249-0070, WhatsApp, Telegram.",
  alternates: { canonical: "/contacts" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
