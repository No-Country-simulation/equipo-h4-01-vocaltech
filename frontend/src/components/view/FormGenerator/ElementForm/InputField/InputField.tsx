import { Label, Input } from '@/components/ui';

interface InputFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const InputField = ({
  id,
  label,
  required = false,
  type = 'text',
  placeholder,
  onChange
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-normal">
        {label}
        {required && <span className="text-black">*</span>}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
