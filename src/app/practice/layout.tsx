import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги и визы: O-1, L-1, E-2, EB-1A, EB-2 NIW, EB-5",
  description:
    "Бизнес- и семейная иммиграция в США: визы O-1, L-1, E-2, H-1B, грин-карты EB-1A, EB-1C, EB-2 NIW, EB-5, визы K-1, IR-1/CR-1 и петиции I-130.",
  alternates: { canonical: "/practice" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
