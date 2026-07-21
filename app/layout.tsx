import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pharos Security | Cyber Security Advisory for New Zealand SMEs",
  description:
    "Pharos Security helps New Zealand SMEs understand cyber risk, strengthen practical controls, prepare for incidents, and build safer everyday habits without jargon or scare tactics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-charcoal">
        {children}
      </body>
    </html>
  );
}
