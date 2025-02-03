import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RatingFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

export const RatingField = ({
  label,
  value,
  onChange,
  error,
  min = 1,
  max = 5,
  minLabel = 'Nada',
  maxLabel = 'Mucho'
}: RatingFieldProps) => {
  return (
    <FormItem className="space-y-4">
      <FormLabel className="text-base">{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={onChange}
          value={value}
          className="flex justify-between"
        >
          {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(
            rating => (
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
                {rating === min && (
                  <span className="text-sm text-muted-foreground">
                    {minLabel}
                  </span>
                )}
                {rating === max && (
                  <span className="text-sm text-muted-foreground">
                    {maxLabel}
                  </span>
                )}
              </div>
            )
          )}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </FormItem>
  );
};
