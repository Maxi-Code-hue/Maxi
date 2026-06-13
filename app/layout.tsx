import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maxi Coffee — Specialty Coffee, done right",
  description:
    "Single-origin specialty coffee, freshly roasted. Track your brews and discover new beans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
