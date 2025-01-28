'use client';
import { useState, useCallback } from 'react';
import { useConfetti } from '../useConfetti/useConfetti';

export const useFormSubmission = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fireConfetti = useConfetti();

  const handleFinalize = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const handleConfirm = useCallback(
    async (data: any) => {
      try {
        setIsSubmitting(true);
        console.log('Enviando:', data);
        setShowSuccess(true);
        fireConfetti('fireworks');
      } catch (error) {
        console.error('Error en envío:', error);
      } finally {
        setIsSubmitting(false);
        setShowConfirmation(false);
      }
    },
    [fireConfetti]
  );

  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return {
    showConfirmation,
    showSuccess,
    isSubmitting,
    handleFinalize,
    handleConfirm,
    handleCancel,
    handleSuccessClose
  };
};
