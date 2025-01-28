'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18n/config/i18nConfig';

import { LangEsIcon, LangUsIcon } from '@/components/icons';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';

export function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const getLanguage = () => {
    return currentLocale === 'en' ? (
      <span className="flex items-center gap-2">
        <LangUsIcon className="h-4 w-4" />
        English
      </span>
    ) : (
      <span className="flex items-center gap-2">
        <LangEsIcon className="h-4 w-4" />
        Español
      </span>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{getLanguage()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleChange('en')}
          className="flex items-center gap-2"
        >
          <LangUsIcon className="h-4 w-4" />
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange('es')}
          className="flex items-center gap-2"
        >
          <LangEsIcon className="h-4 w-4" />
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
