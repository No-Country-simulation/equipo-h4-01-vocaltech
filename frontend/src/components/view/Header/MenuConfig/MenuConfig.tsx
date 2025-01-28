'use client';

import { LanguageChanger } from '../../ToggetConfig/LanguageChanger/LanguageChanger';
import { ThemeChanger } from '../../ToggetConfig/ThemeChanger/ThemeChanger';

export const MenuConfig = () => {
  return (
    <div className="flex flex-col items-start">
      <span className="text-white text-sm">Configuración</span>
      <hr className="w-full border-gray-200 my-2" />
      <div className="flex items-center gap-4">
        <label className="text-white text-sm">Theme</label>
        <ThemeChanger />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <label className="text-white text-sm">Lenguaje</label>
        <LanguageChanger />
      </div>
    </div>
  );
};
