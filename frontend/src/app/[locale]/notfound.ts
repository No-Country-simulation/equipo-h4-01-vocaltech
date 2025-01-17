import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

const IN_CONSTRUCTION_PAGE = '/inconstruction';

const i18nConfig = {
  locales: ['en', 'es'] // Asegúrate de definir los locales soportados
};

const geistSans = {
  variable: 'font-sans'
};

const geistMono = {
  variable: 'font-mono'
};

export default function RootLayout(props: {
  children: ReactNode,
  params: { locale: string }
}) {
  const router = useRouter();

  useEffect(() => {
    if (!i18nConfig.locales.includes(locale)) {
      alert('Idioma no traducido. Redirigiendo a la página en construcción...');
      setTimeout(() => {
        router.push(IN_CONSTRUCTION_PAGE);
      }, 5000);
    }
  }, [locale, router]);

  if (!i18nConfig.locales.includes(locale)) {
    return null;
  }
  return (
    <html lang= { locale } dir = { dir(locale) } >
      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased` }
      >
    { children }
    </body>
    </html>
);
} 
