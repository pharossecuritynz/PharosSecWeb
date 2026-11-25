import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pharos Security | Independent Cyber Security for New Zealand Small Businesses",
  description:
    "Independent cyber security reviews for New Zealand small businesses. Find and fix the familiar weaknesses attackers exploit, with a clear, prioritised plan. No products sold, works alongside your existing IT provider.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pharos Security | Independent Cyber Security for New Zealand Small Businesses",
    description:
      "Independent cyber security reviews and practical guidance for New Zealand small businesses. No products sold, works alongside your existing IT provider.",
    locale: "en_NZ",
    type: "website",
    siteName: "Pharos Security",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${libreFranklin.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-charcoal">
        {children}
      </body>
    </html>
  );
}
