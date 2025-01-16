import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import type { Metadata } from "next";
import "./Styles/globals.css";
import { useTranslation } from 'react-i18next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Vocal Tech",
  description: "Transmití tus ideas, transformá con tu voz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
