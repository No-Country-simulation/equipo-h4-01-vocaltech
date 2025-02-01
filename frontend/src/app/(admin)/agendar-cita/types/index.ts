import { TIME_SLOTS } from "../constants";

export type ServiceKey = "coaching" | "mvp";
export type TimeSlot = (typeof TIME_SLOTS)[number];

interface DateSelectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export type { DateSelectionProps, CalendarProps };
