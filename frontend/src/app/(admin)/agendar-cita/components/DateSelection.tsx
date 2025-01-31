import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DateSelectionProps, CalendarProps } from '../types';

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Array de nombres de días
  const weekDays = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
  
  // Array de nombres de meses
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Obtener el primer día del mes
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Obtener el último día del mes
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Obtener los días del mes anterior que se mostrarán
  const startingDayOfWeek = firstDayOfMonth.getDay() || 7;
  const previousMonthDays = Array.from({ length: startingDayOfWeek - 1 }, (_, i) => {
    const day = new Date(firstDayOfMonth);
    day.setDate(firstDayOfMonth.getDate() - (startingDayOfWeek - 1) + i);
    return day;
  });

  // Obtener los días del mes actual
  const currentMonthDays = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => {
      const day = new Date(firstDayOfMonth);
      day.setDate(i + 1);
      return day;
    }
  );

  // Obtener los días del mes siguiente que se mostrarán
  const remainingDays = 42 - (previousMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
    const day = new Date(lastDayOfMonth);
    day.setDate(lastDayOfMonth.getDate() + i + 1);
    return day;
  });

  // Función para cambiar de mes
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Comprobar si una fecha está deshabilitada (anterior a hoy)
  const isDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Función para formatear la fecha al formato requerido (YYYY-MM-DD)
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Comprobar si una fecha está seleccionada
  const isSelected = (date: Date) => {
    return formatDate(date) === selectedDate;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Cabecera del calendario */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-lavender rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-lavender rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {previousMonthDays.map(date => (
          <button
            key={date.toISOString()}
            disabled={true}
            className="p-2 text-center text-gray-400"
          >
            {date.getDate()}
          </button>
        ))}
        {currentMonthDays.map(date => (
          <button
            key={date.toISOString()}
            onClick={() => !isDisabled(date) && onDateChange(formatDate(date))}
            disabled={isDisabled(date)}
            className={`p-2 text-center rounded-full transition-colors
              ${isDisabled(date) 
                ? 'text-gray-400 cursor-not-allowed' 
                : isSelected(date)
                  ? 'bg-aqua text-white'
                  : 'hover:bg-lavender text-gray-700'
              }`}
          >
            {date.getDate()}
          </button>
        ))}
        {nextMonthDays.map(date => (
          <button
            key={date.toISOString()}
            disabled={true}
            className="p-2 text-center text-gray-400"
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

// Actualización del componente DateSelection
export const DateSelection: React.FC<DateSelectionProps> = ({
  selectedDate,
  onDateChange,
  onPrev,
  onNext,
}) => (
  <div className="card-container">
    <h2 className="heading-primary">
      Selecciona una fecha
    </h2>
    <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
    <div className="flex gap-4 mt-6">
      <button onClick={onPrev} className="btn-secondary">
        ← Atrás
      </button>
      <button
        onClick={onNext}
        disabled={!selectedDate}
        className="btn-primary"
      >
        Siguiente →
      </button>
    </div>
  </div>
);