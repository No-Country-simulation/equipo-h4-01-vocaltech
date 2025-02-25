"use client";

import React, { useState } from "react";
import { ServiceSelection } from "./ServiceSelection";
import { DateSelection } from "./DateSelection";
import { TimeSelection } from "./TimeSelection";
import { Confirmation } from "./Confirmation";
import { ConfirmationCard } from "./ConfirmationCard";
import { ServiceKey, TimeSlot } from "../types/index";
import { useRouter } from "next/navigation";
import { useAgendarCita } from "@/hooks/useCitas"; // Importa el hook

const StepsDate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<TimeSlot>("09:00");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();

  const { agendarCita, loading, error } = useAgendarCita(); // Usa el hook

  const handleServiceChange = (service: ServiceKey) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePrevStep = () => setCurrentStep(currentStep - 1);
  const handleReturn = () => router.push("/mis-reuniones");

  const handleCancel = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
    setSelectedServices([]);
    setSelectedDate(new Date());
    setSelectedTime("09:00");
  };

  const handleReschedule = () => {
    setIsConfirmed(false);
    setCurrentStep(2);
  };

  const handleConfirm = async () => {
    const citaData = {
      fecha: selectedDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      hora_inicio: `${selectedTime}:00`, // Agrega segundos
      hora_fin: `${parseInt(selectedTime.split(":")[0]) + 1}:00:00`, // Fin +1 hora
      motivo: `${selectedServices}`,
      estado: "AG",
      lead: 1, // Deberías obtener esto dinámicamente
      especialista: 2, // También debe obtenerse dinámicamente
    };

    try {
      await agendarCita(citaData);
      setIsConfirmed(true);
    } catch (err) {
      console.error("No se pudo agendar la cita:", err);
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ConfirmationCard
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen pb-32 bg-gray-100">
      <div className="w-1/2">
        {currentStep === 1 && (
          <ServiceSelection
            selectedServices={selectedServices}
            onServiceChange={handleServiceChange}
            onPrev={handleReturn}
            onNext={handleNextStep}
          />
        )}
        {currentStep === 2 && (
          <DateSelection
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}
        {currentStep === 3 && (
          <TimeSelection
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}
        {currentStep === 4 && (
          <Confirmation
            selectedServices={selectedServices}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onPrev={handlePrevStep}
            onConfirm={handleConfirm}
          />
        )}
        {loading && <p className="text-blue-500 mt-2">Agendando cita...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default StepsDate;
