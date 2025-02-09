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
import { FormField } from '../../Cuestionario/TabType/TabType';

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

  switch (field.question_type) {
    case 'text':
      return (
        <Input
          value={value || ''}
          onChange={e => handleChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'number2':
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
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.id.toString()}
                id={option.id.toString()}
              />
              <Label className='!text-xl' htmlFor={option.id.toString()}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    case 'checkbox':
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id.toString()}
                checked={value?.includes(option.id)}
                onCheckedChange={checked => {
                  const newValue = checked
                    ? [...(value || []), option.id]
                    : (value || []).filter((v: string) => v !== option.id.toString());
                  handleChange(newValue);
                }}
              />
              <Label htmlFor={option.id.toString()}>{option.text}</Label>
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
              <SelectItem key={option.id} value={option.id.toString()}>
                {option.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'yes_no':
      return (
        <div className="flex gap-4">
          <Button
            variant={value === '1' ? 'default' : 'outline'}
            onClick={() => handleChange('1')}
          >
            Sí
          </Button>
          <Button
            variant={value === '2' ? 'default' : 'outline'}
            onClick={() => handleChange('2')}
          >
            No
          </Button>
        </div>
      );

    case 'number':
      return (
        <RadioGroup value={value} onValueChange={handleChange}>
          {field.options?.map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.id.toString()}
                id={option.id.toString()}
              />
              <Label htmlFor={option.id.toString()}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    default:
      return <div>Tipo de campo no soportado</div>;
  }
};
