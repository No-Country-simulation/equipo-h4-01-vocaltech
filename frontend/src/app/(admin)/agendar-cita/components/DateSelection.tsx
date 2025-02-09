import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, addMonths, isBefore, isSameDay, subDays, addDays } from "date-fns";
import type { DateSelectionProps, CalendarProps } from "../types";

const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calculamos fechas de forma eficiente con `useMemo`
  const { days, firstDayOffset } = useMemo(() => {
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);
    const offset = (firstDay.getDay() + 6) % 7;

    // Días del mes anterior
    const prevDays = Array.from({ length: offset }, (_, i) => subDays(firstDay, offset - i));

    // Días del mes actual
    const monthDays = Array.from({ length: lastDay.getDate() }, (_, i) => addDays(firstDay, i));

    // Días del mes siguiente
    const nextDays = Array.from({ length: 42 - (prevDays.length + monthDays.length) }, (_, i) => addDays(lastDay, i + 1));

    return { days: [...prevDays, ...monthDays, ...nextDays], firstDayOffset: offset };
  }, [currentDate]);

  const changeMonth = (increment: number) => setCurrentDate(addMonths(currentDate, increment));

  const isDisabled = (date: Date) => isBefore(date, new Date());

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-200 rounded-full transition">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-200 rounded-full transition">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => !isDisabled(date) && onDateChange(date)}
            disabled={isDisabled(date)}
            className={`p-2 text-center rounded-full transition-colors
              ${isDisabled(date) ? "text-gray-400 cursor-not-allowed" : isSameDay(date, selectedDate) ? "bg-lavender text-white" : "hover:bg-gray-200 text-gray-700"}`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export const DateSelection: React.FC<DateSelectionProps> = ({ selectedDate, onDateChange, onPrev, onNext }) => (
  <div className="card-container">
    <h2 className="heading-primary">Selecciona una fecha</h2>
    <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
    <div className="flex gap-4 mt-6">
      <button onClick={onPrev} className="btn-secondary">
        ← Atrás
      </button>
      <button onClick={onNext} disabled={!selectedDate} className="btn-secondary border-lavender">
        Siguiente →
      </button>
    </div>
  </div>
);
