'use client';

import { toast } from 'sonner';
import { SelectorElementForm } from '../SelectorElementForm/SelectorElementForm';
import { ValueProps } from '../../TabsGenerator';
import { FormField } from '../../Cuestionario';

interface GeneratorFormProps {
  values: FormField[];
}

export const GeneratorForm = ({ values }: GeneratorFormProps) => {
  console.log('Values', values);
  const handleSubmit = (formData: Record<string, any>) => {
    console.log('Form data:', formData);
    toast.success('Formulario enviado con éxito');
  };

  return <SelectorElementForm elements={values} onSubmit={handleSubmit} />;
};
