import type { Metadata } from "next";
import HomePage from "@/app/page";

export const metadata: Metadata = {
  title: "U.S. Visa and Immigration Attorney Andrey Plaksin | The Plaksin Law Firm, P.C.",
  description:
    "Andrey Plaksin is a U.S. Visa and Immigration Attorney with a focus on Family (K-1, IR-1, CR-1, I-130) and Business Immigration (O-1, L-1, E-2, EB-1A, EB-1C and EB-5) matters. Tel. +1(929)249-0070",
  alternates: {
    canonical: "https://plaksinlaw.com/eng",
  },
};

export default function EnglishHomePage() {
  return <HomePage />;
}
