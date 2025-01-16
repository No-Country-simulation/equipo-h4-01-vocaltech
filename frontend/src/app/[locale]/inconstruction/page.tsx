import InConstruction from '@/components/view/InContruction/InConstruction';
import LanguageChanger from '@/components/view/LanguageChander/LanguageChanger';
import TranslationsProvider from '@/provider/TranslationsProvider/TranslationsProvider';
import initTranslations from '@/i18n/config/i18n';

const i18nNamespaces = ['inconstruction'];

async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <InConstruction />
      <LanguageChanger />
    </TranslationsProvider>
  );
}

export default Home;
