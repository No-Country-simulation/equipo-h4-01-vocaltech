import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RadioOption {
  label: string;
  value: number;
}

interface Radio2Props {
  label: string;
  sublabel?: string;
  options: RadioOption[];
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const Radio2 = ({
  label,
  sublabel,
  options,
  value,
  onChange,
  error
}: Radio2Props) => {
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-accent text-2xl font-bold">
        {label}
        {sublabel && (
          <span className="block text-sm text-primary">{sublabel}</span>
        )}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={val => onChange(Number(val))}
          value={value.toString()} // Convertimos el valor a string
          className="space-y-2"
        >
          {options.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value.toString()}
                id={option.value.toString()}
              />
              <Label htmlFor={option.value.toString()}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </FormItem>
  );
};
