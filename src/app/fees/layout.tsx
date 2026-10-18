import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fees & Payment",
  description:
    "Consultation and legal fees of The Plaksin Law Firm, P.C. Pay online by card via Stripe or by Zelle with no processing fee.",
  alternates: { canonical: "/fees" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
