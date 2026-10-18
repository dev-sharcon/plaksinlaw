import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact: New York & Miami Offices",
  description:
    "Contact immigration attorney Andrey Plaksin: 225 Broadway, Suite 630, New York, NY 10007 and Aventura, FL. Tel. +1 (929) 249-0070, WhatsApp, Telegram.",
  alternates: { canonical: "/contacts" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
