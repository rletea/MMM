import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Marketing Manager (MMM) | Ikigai & Business Viability Marketing Platform",
  description:
    "AI-powered CMO and marketing platform that onboards business owners through an Ikigai diagnostic, calculates a Business Viability Index (BVI), generates positioning strategies, and produces 30-day multi-channel campaigns.",
  keywords: [
    "marketing manager",
    "ikigai marketing",
    "business viability index",
    "content strategy",
    "multi-channel marketing",
    "social media calendar",
    "b2b marketing strategy",
  ],
  authors: [{ name: "Alex Vance" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
