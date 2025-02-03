'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PhoneFieldProps {
  id: string;
  label: string;
  required?: boolean;
}

const COUNTRY_CODES = [
  { value: '+54', label: '🇦🇷 +54', flag: 'AR' },
  { value: '+55', label: '🇧🇷 +55', flag: 'BR' },
  { value: '+56', label: '🇨🇱 +56', flag: 'CL' },
  { value: '+57', label: '🇨🇴 +57', flag: 'CO' },
  { value: '+52', label: '🇲🇽 +52', flag: 'MX' },
  { value: '+51', label: '🇵🇪 +51', flag: 'PE' },
  { value: '+598', label: '🇺🇾 +598', flag: 'UY' },
  { value: '+58', label: '🇻🇪 +58', flag: 'VE' }
];

export function PhoneField({ id, label, required = false }: PhoneFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={id} className="text-sm font-normal text-[#344054]">
            {label}
            {required && <span className="text-black">*</span>}
          </Label>
          <div className="flex gap-2">
            <Select
              onValueChange={value => form.setValue(`${id}_code`, value)}
              defaultValue="+54"
            >
              <FormControl>
                <SelectTrigger className="w-[120px] border-[#D0D5DD] bg-white shadow-sm">
                  <SelectValue placeholder="Código" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {COUNTRY_CODES.map(code => (
                  <SelectItem key={code.value} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormControl>
              <Input
                {...field}
                id={id}
                type="tel"
                className="flex-1 border-[#D0D5DD] shadow-sm placeholder:text-[#667085]"
                placeholder="Ingrese su número"
              />
            </FormControl>
          </div>
          <FormMessage className="text-[#F04438]" />
        </FormItem>
      )}
    />
  );
}
