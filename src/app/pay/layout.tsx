import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Payment",
  description:
    "Secure online payment of consultation and legal fees to The Plaksin Law Firm, P.C.",
  alternates: { canonical: "/pay" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
