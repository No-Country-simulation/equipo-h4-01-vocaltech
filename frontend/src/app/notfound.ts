import { notFound } from 'next/navigation';

export default function RootLayout({ children, params: { locale } }) {
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }
  return (
    <html lang= { locale } >
    <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased` }
      >
    { children }
    </body>
    </html>
  );
}
