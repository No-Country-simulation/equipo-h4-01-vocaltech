'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Globe, Flag } from 'lucide-react'; // Agregamos los íconos necesarios
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Preferences() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-64 p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">Preferences</h2>

      {/* Selector de Tema */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <div className="flex items-center space-x-2">
            <Button
              variant={theme === 'system' ? 'secondary' : 'ghost'}
              className="p-2"
              onClick={() => setTheme('system')}
            >
              <Monitor className="h-5 w-5" />
            </Button>
            <Button
              variant={theme === 'light' ? 'secondary' : 'ghost'}
              className="p-2"
              onClick={() => setTheme('light')}
            >
              <Sun className="h-5 w-5" />
            </Button>
            <Button
              variant={theme === 'dark' ? 'secondary' : 'ghost'}
              className="p-2"
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Selector de Idioma */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Language</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-sm flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage('English')}
                className="flex items-center gap-2"
              >
                <Flag className="h-4 w-4 text-blue-500" />
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('Spanish')}
                className="flex items-center gap-2"
              >
                <Flag className="h-4 w-4 text-red-500" />
                Spanish
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('French')}
                className="flex items-center gap-2"
              >
                <Flag className="h-4 w-4 text-blue-700" />
                French
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
