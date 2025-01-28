'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('themechanger');

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <span className="flex items-center gap-2">
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            {t('lt')}
          </span>
        );
      case 'dark':
        return (
          <span className="flex items-center gap-2">
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            {t('dt')}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2">
            <Laptop className="h-[1.2rem] w-[1.2rem]" />
            {t('sy')}
          </span>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{getThemeIcon()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <span className="flex items-center gap-2">
            <Sun />
            {t('lt')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <span className="flex items-center gap-2">
            <Moon />
            {t('dt')}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span className="flex items-center gap-2">
            <Laptop />
            {t('sy')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
