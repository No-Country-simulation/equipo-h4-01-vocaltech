import {
  Input,
  Textarea,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Button
} from '@/components/ui';
import { Star } from 'lucide-react';
import { FormField } from '../TabType/TabType';

export const FieldRenderer = ({
  field,
  value,
  onChange
}: {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}) => {
  const handleChange = (newValue: any) => {
    onChange(newValue);
  };

  switch (field.type) {
    case 'text':
      return (
        <Input
          value={value || ''}
          onChange={e => handleChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'number':
      return (
        <Input
          type="number"
          value={value || ''}
          onChange={e => handleChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'textarea':
      return (
        <Textarea
          value={value || ''}
          onChange={e => handleChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );

    case 'radio':
      return (
        <RadioGroup value={value} onValueChange={handleChange}>
          {field.options?.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    case 'checkbox':
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={value?.includes(option.value)}
                onCheckedChange={checked => {
                  const newValue = checked
                    ? [...(value || []), option.value]
                    : (value || []).filter((v: string) => v !== option.value);
                  handleChange(newValue);
                }}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </div>
      );

    case 'select':
      return (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'yesno':
      return (
        <div className="flex gap-4">
          <Button
            variant={value === 'yes' ? 'default' : 'outline'}
            onClick={() => handleChange('yes')}
          >
            Sí
          </Button>
          <Button
            variant={value === 'no' ? 'default' : 'outline'}
            onClick={() => handleChange('no')}
          >
            No
          </Button>
        </div>
      );

    case 'rating':
      return (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(rating => (
            <Star
              key={rating}
              className={`h-8 w-8 cursor-pointer ${
                rating <= value
                  ? 'fill-yellow-400 stroke-yellow-400'
                  : 'fill-gray-200 stroke-gray-300'
              }`}
              onClick={() => handleChange(rating)}
            />
          ))}
        </div>
      );

    default:
      return <div>Tipo de campo no soportado</div>;
  }
};
