import { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import i18nConfig from '@/i18n/config/i18nConfig';
import { dir } from 'i18next';
import "./styles/globals.css";
import ThemeProvider from "@/provider/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: "VocalTech",
  description: "Transmití tus ideas, transformá con tu voz",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
    apple: "/img/favicon.ico",
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

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
