'use client';
import { useState, useEffect } from 'react';

export const useFieldStyles = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [borderColor, setBorderColor] = useState('#F75F57');

  useEffect(() => {
    setBorderColor(value.trim() ? '#040041' : '#F75F57');
  }, [value]);

  return {
    value,
    borderColor,
    onChange: (newValue: string) => setValue(newValue)
  };
};
