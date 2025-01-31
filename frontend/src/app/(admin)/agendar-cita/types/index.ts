export type ServiceKey = 'coaching' | 'mvp';
export type TimeSlot = string;

interface DateSelectionProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    onPrev: () => void;
    onNext: () => void;
  }
  interface CalendarProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
  }
  
  // Exportamos la interfaz para que pueda ser importada donde se necesite
  export type { DateSelectionProps,CalendarProps };