'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export function InConstruction() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src="/img/under_construction.png"
        alt={t('title')}
        width={500} // Ajusta según lo necesites
        height={500} // Ajusta según lo necesites
        className="object-contain"
      />
      <h1 className="text-2xl font-bold">{t('message')}</h1>
      <p className="mt-2">{t('message2')}</p>
    </div>
  );
}
