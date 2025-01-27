import { ReactNode, useEffect } from 'react'; 
import { useRouter } from 'next/router';

const IN_CONSTRUCTION_PAGE = '/';

const i18nConfig = {
  locales: ['en', 'es'] // Asegúrate de definir los locales soportados
};

export default function RootLayout(props: {
  children: ReactNode,
  params: { locale: string }
}) {
  const { locale } = props.params; // Extraer `locale` desde los parámetros
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

}

function dir(locale: string): 'ltr' | 'rtl' {
  // Suponiendo que solo `ar` es RTL
  return locale === 'ar' ? 'rtl' : 'ltr';
}