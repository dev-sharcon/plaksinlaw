import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas: O-1, L-1, E-2, EB-1A, EB-2 NIW, EB-5",
  description:
    "Business and family immigration: O-1, L-1, E-2, H-1B visas, EB-1A, EB-1C, EB-2 NIW, EB-5 green cards, K-1, IR-1/CR-1 and I-130 petitions.",
  alternates: { canonical: "/practice" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
