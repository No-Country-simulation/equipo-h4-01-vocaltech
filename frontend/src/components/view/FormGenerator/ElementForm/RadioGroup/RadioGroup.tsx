import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  label: string;
  sublabel?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const RadioGroupField = ({
  label,
  sublabel,
  options,
  value,
  onChange,
  error
}: RadioGroupFieldProps) => {
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-base">
        {label}
        {sublabel && (
          <span className="block text-sm text-muted-foreground">
            {sublabel}
          </span>
        )}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={onChange}
          value={value}
          className="space-y-2"
        >
          {options.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </FormItem>
  );
};
