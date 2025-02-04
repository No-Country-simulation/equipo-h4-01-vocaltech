import { useFormContext } from 'react-hook-form';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui';

interface SelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}

export function SelectField({
  id,
  label,
  required = false,
  placeholder,
  options
}: SelectFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={id} className="text-sm font-normal">
            {label}
            {required && <span className="text-black">*</span>}
          </Label>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className="w-full border border-gray-300 bg-white"
                id={id}
              >
                <SelectValue placeholder={placeholder || 'Seleccionar...'} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
