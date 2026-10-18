import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Television",
  description:
    "TV appearances of U.S. immigration attorney Andrey Plaksin on RTVI, Russia 24 and Vesti 24.",
  alternates: { canonical: "/media" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
