import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pharos Security | Independent Security Advisory for New Zealand SMEs",
  description:
    "Pharos Security independently checks whether your business's security is actually good enough, and gives you a clear, prioritised plan. No products sold, works alongside your existing IT support.",
  openGraph: {
    title: "Pharos Security | Independent Security Advisory for New Zealand SMEs",
    description:
      "Independent cyber security reviews and practical guidance for New Zealand small businesses. No products sold, works alongside your existing IT support.",
    locale: "en_NZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-charcoal">
        {children}
      </body>
    </html>
  );
}
