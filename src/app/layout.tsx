import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1F3A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://plaksinlaw.com"),
  title: {
    default: "Визовый и иммиграционный адвокат в США Андрей Плаксин | The Plaksin Law Firm, P.C.",
    template: "%s | The Plaksin Law Firm, P.C.",
  },
  description:
    "Андрей Плаксин — визовый и иммиграционный адвокат в США: визы O-1, L-1, E-2, H-1B, грин-карты EB-1A, EB-2 NIW, EB-1C, EB-5, семейная иммиграция. Офисы в Нью-Йорке и Майами: +1 (929) 249-0070.",
  keywords: [
    "US immigration attorney",
    "Andrey Plaksin attorney",
    "The Plaksin Law Firm",
    "O-1 visa lawyer New York",
    "EB-1A green card attorney",
    "EB-2 NIW lawyer",
    "EB-1C multinational manager",
    "E-2 investor visa lawyer",
    "L-1 visa attorney",
    "иммиграционный адвокат в сша",
    "андрей плаксин",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ru: "/",
      en: "/eng",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    url: "https://plaksinlaw.com/",
    siteName: "The Plaksin Law Firm, P.C.",
    title: "Визовый и иммиграционный адвокат в США Андрей Плаксин | Нью-Йорк и Флорида",
    description:
      "Личное ведение дел адвокатом Андреем Плаксиным: бизнес-иммиграция, визы O-1, L-1, E-2, грин-карты EB-1A, EB-1C, EB-5. Лицензии штатов Нью-Йорк, Нью-Джерси и Флорида.",
    images: [
      {
        url: "/img/attorney-portrait.png",
        width: 355,
        height: 440,
        alt: "Attorney Andrey Plaksin — The Plaksin Law Firm, P.C.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  other: {
    "geo.placename": "225 Broadway #630, New York, NY 10007, USA",
    "geo.position": "40.7119640;-74.0085270",
    "geo.region": "US-NY",
    ICBM: "40.7119640, -74.0085270",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "Attorney"],
      "@id": "https://plaksinlaw.com/#firm",
      name: "The Plaksin Law Firm, P.C.",
      alternateName: "Адвокатское бюро Андрея Плаксина",
      url: "https://plaksinlaw.com",
      image: "https://plaksinlaw.com/img/attorney-portrait.png",
      telephone: "+1-929-249-0070",
      email: "info@plaksinlaw.com",
      priceRange: "$$$",
      founder: {
        "@type": "Person",
        name: "Andrey I. Plaksin, Esq.",
        jobTitle: "Principal Immigration Attorney",
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "State University of New York, School of Law",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "City University of New York, School of Business",
          },
        ],
        knowsLanguage: ["en", "ru"],
      },
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "225 Broadway, Suite 630",
          addressLocality: "New York",
          addressRegion: "NY",
          postalCode: "10007",
          addressCountry: "US",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "20200 W Dixie Hwy, Suite 902",
          addressLocality: "Aventura",
          addressRegion: "FL",
          postalCode: "33180",
          addressCountry: "US",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.711964,
        longitude: -74.008527,
      },
    },
  ],
};

import { LanguageProvider } from "@/context/LanguageContext";
import Analytics from "@/components/Analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-[#0075BF] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
