import React from 'react';
import { ServiceKey } from '../types';
import { SERVICES } from '../constants';

interface ServiceSelectionProps {
  selectedServices: ServiceKey[];
  onServiceChange: (service: ServiceKey) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedServices,
  onServiceChange,
  onNext,
  onPrev,
}) => (
  <div className="card-container">
    <h2 className="heading-primary">
      Quiero agendar una cita para:
    </h2>
    <div className="flex flex-col gap-4 w-full">
      {Object.entries(SERVICES).map(([key, label]) => (
        <label key={key} className="flex items-center gap-2 border rounded-sm border-lavender">
          <div className="p-3 bg-lavender border rounded-sm">
            <input
              type="checkbox"
              checked={selectedServices.includes(key as ServiceKey)}
              onChange={() => onServiceChange(key as ServiceKey)}
              className="w-4 h-4"
            />
          </div>
          {label}
        </label>
      ))}
    </div>
    <div className="flex gap-4 mt-6">
    <button onClick={onPrev} className="btn-secondary">
        ← Cancelar
      </button>
    <button
      onClick={onNext}
      disabled={selectedServices.length === 0}
      className="btn-primary"
    >
      Siguiente →
    </button>
  </div>
  </div>
);