import { ReactNode } from "react";
import { useTranslation } from 'react-i18next';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import i18nConfig from '@/i18n/config/i18nConfig';
import { dir } from 'i18next';
import "./Styles/globals.css";
import ThemeProvider from "@/provider/ThemeProvider/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Vocal Tech - In construction",
  description: "Transmití tus ideas, transformá con tu voz",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await props.params;
  const { children } = props;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
