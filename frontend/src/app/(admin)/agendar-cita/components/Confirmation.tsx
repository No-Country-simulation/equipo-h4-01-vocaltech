import React from 'react';
import { ServiceKey } from '../types';
import { SERVICES } from '../constants';

interface ConfirmationProps {
  selectedServices: ServiceKey[];
  selectedDate: Date;
  selectedTime: string;
  onPrev: () => void;
  onConfirm: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  selectedServices,
  selectedDate,
  selectedTime,
  onPrev,
  onConfirm,
}) => (
  <div className="card-container">
    <h2 className="heading-primary">
      Confirma tu cita
    </h2>
    <div className="space-y-4 w-full max-w-md">
      <p className="text-lg">
        <span className="font-semibold">Servicios:</span>{' '}
        {selectedServices.map(service => SERVICES[service]).join(', ')}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Fecha:</span>{' '}
        {new Date(selectedDate).toLocaleDateString('es-ES')}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Hora:</span> {selectedTime}
      </p>
    </div>
    <div className="flex gap-4 mt-6">
      <button onClick={onPrev} className="btn-secondary">
        ← Atrás
      </button>
      <button onClick={onConfirm} className="btn-confirm">
        Confirmar cita
      </button>
    </div>
  </div>
);