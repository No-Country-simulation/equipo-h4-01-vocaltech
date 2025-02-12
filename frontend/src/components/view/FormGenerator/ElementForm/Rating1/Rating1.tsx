import { RadioGroup, RadioGroupItem } from '@/components/ui';

interface Props {
  name: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
}

export function Rating1({ name, value, onChange, min, max }: Props) {
  return (
    <RadioGroup
      onValueChange={onChange}
      value={value}
      className="flex items-center gap-4"
    >
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(num => (
        <div key={num} className="flex items-center">
          <RadioGroupItem
            value={num.toString()}
            id={`${name}-${num}`}
            className="h-4 w-4"
          />
        </div>
      ))}
    </RadioGroup>
  );
}
