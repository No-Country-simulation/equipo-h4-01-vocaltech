'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

const countryFlags: Record<string, string> = {
  '+1': '🇺🇸',
  '+54': '🇦🇷',
  '+34': '🇪🇸'
};

interface PhonePrefixInputProps {
  control: any;
  name: string;
  label: string;
  error?: string;
}

export const PhonePrefixInput = ({
  control,
  name,
  label,
  error
}: PhonePrefixInputProps) => {
  const [prefix, setPrefix] = useState('+54');

  return (
    <FormField>
      <FormItem className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="flex gap-2">
            <Controller
              name={`${name}.prefix`}
              control={control}
              defaultValue={prefix}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                    setPrefix(value);
                  }}
                >
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
              )}
            />
            <Controller
              name={`${name}.number`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Número telefónico" />
              )}
            />
          </div>
        </FormControl>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </FormItem>
    </FormField>
  );
};
