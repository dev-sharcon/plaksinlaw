import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Адвокат в эфире: СМИ и телевидение",
  description:
    "Эфиры иммиграционного адвоката Андрея Плаксина на телеканалах НТВ, RTVI, «Россия 24» и «Вести 24».",
  alternates: { canonical: "/media" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
