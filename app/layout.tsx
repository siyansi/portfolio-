import type { Metadata } from "next";
import { Geist, Geist_Mono ,Teko } from "next/font/google";
import { SmoothScroll } from "@/lib/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Teko for the blocky, mechanical sci-fi header font
const teko = Teko({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Michael D Barnabas - Brand Manager & Digital Marketer",
  description:
    "Portfolio of Michael D Barnabas: 7+ years of brand building, cinematic content, and performance marketing. Founder of CreativeLance Marketing, Coimbatore.",
  openGraph: {
    title: "Michael D Barnabas - Brand Manager & Digital Marketer",
    description:
      "Portfolio of Michael D Barnabas: 7+ years of brand building, cinematic content, and performance marketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}