import type { Metadata } from "next";
import HomePage from "@/app/page";

export const metadata: Metadata = {
  title: { absolute: "U.S. Visa and Immigration Attorney Andrey Plaksin | The Plaksin Law Firm, P.C." },
  description:
    "Andrey Plaksin is a U.S. Visa and Immigration Attorney with a focus on Family (K-1, IR-1, CR-1, I-130) and Business Immigration (O-1, L-1, E-2, EB-1A, EB-1C and EB-5) matters. Tel. +1(929)249-0070",
  alternates: {
    canonical: "/eng",
    languages: {
      ru: "/",
      en: "/eng",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
    url: "/eng",
    siteName: "The Plaksin Law Firm, P.C.",
    title: "U.S. Visa & Immigration Attorney Andrey Plaksin | New York & Florida",
    description:
      "Personal representation by Attorney Andrey Plaksin for business immigration, O-1, L-1, E-2 visas, and EB-1A, EB-1C, EB-5 green cards. Licensed in NY, NJ, and FL.",
    images: [{ url: "/img/attorney-portrait.png", width: 355, height: 440, alt: "Attorney Andrey Plaksin" }],
  },
};

export default function EnglishHomePage() {
  return <HomePage />;
}
