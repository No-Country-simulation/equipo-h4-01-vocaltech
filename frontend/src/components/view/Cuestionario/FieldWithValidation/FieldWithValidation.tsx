'use client';
import { Input } from '@/components/ui';
import { useFieldStyles } from '@/hooks';

export const FieldWithValidation = ({
  placeholder,
  type = 'text'
}: {
  placeholder: string;
  type?: string;
}) => {
  const { value, borderColor, onChange } = useFieldStyles('');

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      style={{ borderColor }}
      className="transition-colors duration-300"
    />
  );
};
