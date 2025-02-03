import React from 'react';
import { CalendarDays, CircleX } from 'lucide-react';

interface ConfirmationCardProps {
  selectedDate: Date;
  selectedTime: string;
  onCancel: () => void;
  onReschedule: () => void;
}

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  selectedDate,
  selectedTime,
  onCancel,
  onReschedule,
}) => (
  <div className="card-container">
      <div className="text-sm text-deepblue mb-4">
        {new Date().toLocaleString('es-AR', { 
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })} hs. EMPRENDIMIENTO: "ALTAVIA"
      </div>
      <h2 className="heading-primary">
        Reunión programada para el
        <br /> {new Date(selectedDate).toLocaleDateString('es-ES', { 
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
        <br /> {selectedTime} hs (ARG)
      </h2>
      <div className="mt-4 flex justify-center">
        <button className="btn-action bg-aqua">
          Link para ingresar a la reunión
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={onCancel} className="btn-action">
          <CircleX /> Cancelar cita
        </button>
        <button onClick={onReschedule} className="btn-action">
          <CalendarDays /> Reprogramar cita
        </button>
      </div>
  </div>
);