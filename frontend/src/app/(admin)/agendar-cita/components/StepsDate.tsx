"use client";

import React, { useState } from 'react';
import { ServiceSelection } from './ServiceSelection';
import { DateSelection } from './DateSelection';
import { TimeSelection } from './TimeSelection';
import { Confirmation } from './Confirmation';
import { ConfirmationCard } from './ConfirmationCard';
import { ServiceKey, TimeSlot } from '../types/index';
import { useRouter } from 'next/navigation';

const StepsDate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<TimeSlot>('09:00');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();

  const handleServiceChange = (service: ServiceKey) => {
    setSelectedServices(prevServices =>
      prevServices.includes(service)
        ? prevServices.filter(s => s !== service)
        : [...prevServices, service]
    );
  };

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePrevStep = () => setCurrentStep(currentStep - 1);
  const handleConfirm = () => setIsConfirmed(true);
  const handleReturn = () => router.push("/mis-reuniones");

  const handleCancel = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
    setSelectedServices([]);
    setSelectedDate(new Date());
    setSelectedTime('09:00');
  };

  const handleReschedule = () => {
    setIsConfirmed(false);
    setCurrentStep(2);
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
      </div>
    </div>
  );
};

export default StepsDate;