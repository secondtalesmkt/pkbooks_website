import type { Metadata, Viewport } from "next";
import { Lora, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif-title",
  display: "swap"
});

export const metadata: Metadata = {
  title: "PK Books | Books, Stationery & Online Printing - Valanchery",
  description: "Official online store for PK Books, Valanchery. Buy academic books, school packages, custom notebooks, and place online printing orders with live tracking.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#0057B8",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} ${lora.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-slate-50 overflow-x-hidden">{children}</body>
    </html>
  );
}
