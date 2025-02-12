import { RadioGroup, RadioGroupItem } from '@/components/ui';

interface Option {
  id: string | number;
  text: string;
}

interface Rating2Props {
  name: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
}

export function Rating2({ name, value, onChange, options }: Rating2Props) {
  return (
    <div className="space-y-2">
      <RadioGroup
        onValueChange={val => onChange(Number(val))}
        value={String(value)}
        className="flex justify-between items-center gap-2"
      >
        {options.map(option => (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <RadioGroupItem
              value={String(option.id)}
              id={`${name}-${option.id}`}
              className="h-4 w-4"
            />
            <label
              htmlFor={`${name}-${option.id}`}
              className="text-sm text-gray-600"
            >
              {option.text.split(' ')[0]}
            </label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Nunca</span>
        <span>Siempre</span>
      </div>
    </div>
  );
}
