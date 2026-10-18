import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected immigration case results of The Plaksin Law Firm, P.C.: O-1, EB-1A, L-1, E-2 and other U.S. visa and green card matters.",
  alternates: { canonical: "/cases" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
