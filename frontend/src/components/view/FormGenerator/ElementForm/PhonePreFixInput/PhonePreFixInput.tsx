'use client';

import { useController, Control } from 'react-hook-form';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';
import {
  PhoneInput,
  defaultCountries,
  parseCountry
} from 'react-international-phone';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui';
import { useRef, useEffect } from 'react';

const countries = defaultCountries.filter(country => {
  const { iso2 } = parseCountry(country);
  return ['ar', 'ec', 'co'].includes(iso2);
});

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    if (!phone || typeof phone !== 'string') return false; // Asegura que phone sea string
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

interface PhonePrefixInputProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
}

export const PhonePrefixInput = ({
  control,
  name,
  label,
  required = false
}: PhonePrefixInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    field: numberField,
    fieldState: { error: numberError },
    formState: { isSubmitted }
  } = useController({
    name: `${name}`,
    control,
    rules: {
      required: required ? 'El número de teléfono es obligatorio' : false,
      validate: value =>
        isPhoneValid(value?.toString() || '') || 'Número de teléfono no válido'
    }
  });

  useEffect(() => {
    if (numberError && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [numberError]);

  return (
    <div className="space-y-2">
      <FormLabel>
        {label}
        {required && <span className="text-primary">*</span>}
      </FormLabel>
      <div className="flex gap-2 items-center">
        <FormItem className="flex-1">
          <FormControl>
            <PhoneInput
              defaultCountry="ar"
              value={numberField.value?.toString() || ''}
              countries={countries}
              placeholder="Número de teléfono"
              disableDialCodeAndPrefix
              showDisabledDialCodeAndPrefix
              disableFocusAfterCountrySelect={false}
              onChange={numberField.onChange}
              onBlur={() => {
                numberField.onBlur();
                if (numberError && inputRef.current) {
                  setTimeout(() => inputRef.current?.focus(), 0);
                }
              }}
              inputRef={inputRef}
            />
          </FormControl>
          {(numberError || isSubmitted) && (
            <FormMessage>{numberError?.message}</FormMessage>
          )}
        </FormItem>
      </div>
    </div>
  );
};
