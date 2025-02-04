import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RatingGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RatingGroup({
  label,
  value,
  onChange,
  error
}: RatingGroupProps) {
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-base">{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={onChange}
          value={value}
          className="flex justify-between"
        >
          {[1, 2, 3, 4, 5].map(rating => (
            <div key={rating} className="flex flex-col items-center gap-2">
              <RadioGroupItem
                value={rating.toString()}
                id={`rating-${rating}`}
                className="h-4 w-4"
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm text-muted-foreground"
              >
                {rating}
              </Label>
              {rating === 1 && (
                <span className="text-sm text-muted-foreground">Nunca</span>
              )}
              {rating === 5 && (
                <span className="text-sm text-muted-foreground">Siempre</span>
              )}
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </FormItem>
  );
}
