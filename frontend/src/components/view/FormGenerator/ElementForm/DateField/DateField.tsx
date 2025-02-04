import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { es } from 'date-fns/locale';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';

interface DateFieldProps {
  id: string;
  text: string;
  required?: boolean;
}

export function DateField({ id, text, required }: DateFieldProps) {
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
                    !field.value && 'text-[#667085]'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? format(new Date(field.value), 'PPP', { locale: es })
                    : 'Seleccione una fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={date =>
                    field.onChange(date ? date.toISOString() : '')
                  }
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
