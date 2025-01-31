import React from 'react';
import { TimeSlot } from '../types';
import { TIME_SLOTS } from '../constants';

interface TimeSelectionProps {
  selectedTime: TimeSlot;
  onTimeChange: (time: TimeSlot) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedTime,
  onTimeChange,
  onPrev,
  onNext,
}) => (
  <div className="card-container">
    <h2 className="heading-primary">
      Selecciona una hora
    </h2>
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      {TIME_SLOTS.map((time) => (
        <button
          key={time}
          onClick={() => onTimeChange(time)}
          className={`p-3 border rounded-sm ${
            selectedTime === time
              ? 'bg-aqua border-aqua text-white'
              : 'bg-white border-lavender hover:bg-lavender'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
    <div className="flex gap-4 mt-6">
      <button onClick={onPrev} className="btn-secondary">
        ← Atrás
      </button>
      <button
        onClick={onNext}
        disabled={!selectedTime}
        className="btn-primary"
      >
        Siguiente →
      </button>
    </div>
  </div>
);