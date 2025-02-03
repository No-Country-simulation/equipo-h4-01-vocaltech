'use client';
import { useState } from 'react';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

export const PhonePrefixInput = () => {
  const [prefix, setPrefix] = useState('+54');
  const countryFlags: Record<string, string> = {
    '+1': '🇺🇸',
    '+54': '🇦🇷',
    '+34': '🇪🇸'
  };

  return (
    <div className="flex gap-2">
      <Select value={prefix} onValueChange={setPrefix}>
        <SelectTrigger className="w-[100px]">
          <SelectValue>
            {countryFlags[prefix]} {prefix}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(countryFlags).map(([code, flag]) => (
            <SelectItem key={code} value={code}>
              {flag} {code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Número telefónico" />
    </div>
  );
};
