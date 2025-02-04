'use client';
import { Input } from '@/components/ui';
import { useFieldStyles } from '@/hooks';

export const FieldWithValidation = ({
  placeholder,
  question_type // <- Aquí se recibe la prop
}: {
  placeholder: string;
  question_type?: string; // <- Se define correctamente
}) => {
  const { value, borderColor, onChange } = useFieldStyles('');

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={question_type || 'text'} // <- Se usa correctamente
      style={{ borderColor }}
      className="transition-colors duration-300"
    />
  );
};
