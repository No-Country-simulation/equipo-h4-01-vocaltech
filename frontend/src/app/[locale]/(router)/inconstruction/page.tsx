import InConstruction from '@/components/view/InContruction/InConstruction';
import LanguageChanger from '@/components/view/LanguageChanger/LanguageChanger';
import TranslationsProvider from '@/provider/TranslationsProvider/TranslationsProvider';
import ThemeChanger from '@/components/view/ThemeChanger/ThemeChanger';
import initTranslations from '@/i18n/config/i18n';

const i18nNamespaces = ['inconstruction', 'languagechanger', 'themechanger'];

async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <InConstruction />
      <LanguageChanger />
      <ThemeChanger />
    </TranslationsProvider>
  );
}

export default Home;
