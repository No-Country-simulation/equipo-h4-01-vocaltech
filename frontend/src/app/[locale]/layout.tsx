import { ReactNode } from "react";
import { useTranslation } from 'react-i18next';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import i18nConfig from '@/i18n/config/i18nConfig';
import { dir } from 'i18next';
import "./styles/globals.css";
import ThemeProvider from "@/provider/ThemeProvider/ThemeProvider";

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
      <body>
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
