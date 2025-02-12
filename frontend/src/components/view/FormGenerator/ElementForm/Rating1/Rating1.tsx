import { RadioGroup, RadioGroupItem } from '@/components/ui';

interface Option {
  id: string | number;
  text: string;
}

interface Props {
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
}

export function Rating1({ value, onChange, options }: Props) {
  return (
    <RadioGroup
      onValueChange={val => onChange(Number(val))}
      value={String(value)} // Convertimos el valor a string
      className="flex items-center gap-4"
    >
      {options.map(option => (
        <div key={option.id} className="flex items-center">
          <RadioGroupItem
            value={String(option.id)} // Convertimos el id a string
            id={`${option.id}`}
            className="h-4 w-4"
          />
          {/*<label htmlFor={`${option.id}`} className="ml-2">
            {option.text}
          </label>*/}
        </div>
      ))}
    </RadioGroup>
  );
}
