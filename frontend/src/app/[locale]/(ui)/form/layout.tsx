import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import i18nConfig from '@/i18n/config/i18nConfig';
import { dir } from 'i18next';
import ThemeProvider from '@/provider/ThemeProvider/ThemeProvider';
import TranslationsProvider from '@/provider/TranslationsProvider/TranslationsProvider';
import initTranslations from '@/i18n/config/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const metadata: Metadata = {
  title: 'Vocal Tech - In construction',
  description: 'Transmití tus ideas, transformá con tu voz'
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const i18nNamespaces = ['inconstruction', 'languagechanger', 'themechanger'];

export default async function RootLayout(
  props: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const { locale } = await props.params;
  const { children } = props;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
