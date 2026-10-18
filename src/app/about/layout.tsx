import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Attorney Andrey Plaksin",
  description:
    "Andrey I. Plaksin, Esq. \u2014 U.S. visa and immigration attorney licensed in New York, New Jersey and Florida. Education, bar admissions, memberships and press.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
