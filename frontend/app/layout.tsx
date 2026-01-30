import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMOR | An Exclusive Valentine's Soirée",
  description: "Experience the pinnacle of luxury this Valentine's Day at AMOR. Join us for an evening of elegance, romance, and fine dining.",
  keywords: "Valentine's Day, Luxury Event, AMOR, Fine Dining, Romantic Event",
};

import FloatingContact from "@/components/FloatingContact";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-gold selection:text-black`}
      >
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
