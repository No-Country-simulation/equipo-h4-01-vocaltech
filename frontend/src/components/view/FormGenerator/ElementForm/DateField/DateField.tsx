import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button,
  Label,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui';
import { es } from 'date-fns/locale';

interface DateFieldProps {
  id: string;
  text: string;
  required?: boolean;
  value: string;
  onChange: (date: Date) => void;
}

export function DateField({
  id,
  text,
  required,
  value,
  onChange
}: DateFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={id} className="text-sm font-normal text-[#344054]">
            {text}
            {required && <span className="text-black">*</span>}
          </Label>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal mt-1.5 border-[#D0D5DD] shadow-sm',
                    !value && 'text-[#667085]'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value
                    ? format(new Date(value), 'PPP', { locale: es })
                    : 'Seleccione una fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={date => onChange(date ? date : new Date())}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="text-[#F04438]" />
        </FormItem>
      )}
    />
  );
}
