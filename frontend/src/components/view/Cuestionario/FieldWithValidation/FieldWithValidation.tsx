'use client';
import { Input } from '@/components/ui';
import { useFieldStyles } from '@/hooks';

export const FieldWithValidation = ({
  placeholder,
  question_type
}: {
  placeholder: string;
  question_type?: string;
}) => {
  const { value, borderColor, onChange } = useFieldStyles('');

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={question_type}
      style={{ borderColor }}
      className="transition-colors duration-300"
    />
  );
};
