'use client';

import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Label } from '@/components/ui';
import 'react-international-phone/style.css';
import {
  PhoneInput,
  defaultCountries,
  parseCountry
} from 'react-international-phone';

const countries = defaultCountries.filter(country => {
  const { iso2 } = parseCountry(country);
  return ['ar', 'ec', 'mx'].includes(iso2);
});

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const PhonePrefixInput = () => {
  const [phone, setPhone] = useState('');
  const isValid = isPhoneValid(phone);

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium text-gray-700">
        Teléfono móvil*
      </Label>
      <div className="flex gap-2 items-center border rounded-md p-2 w-full">
        <PhoneInput
          defaultCountry="ar"
          value={phone}
          countries={countries}
          required={true}
          placeholder="Número de teléfono."
          disableDialCodeAndPrefix={true}
          showDisabledDialCodeAndPrefix={true}
          disableFocusAfterCountrySelect={false}
          onChange={phone => setPhone(phone)}
        />
      </div>
      {!isValid && <div style={{ color: 'red' }}>Phone is not valid</div>}
    </div>
  );
};
