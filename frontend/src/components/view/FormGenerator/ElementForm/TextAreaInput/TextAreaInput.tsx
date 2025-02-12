'use client';

import { Label } from '@/components/ui';
import { useController, Control } from 'react-hook-form';
import { useState, useRef } from 'react';

interface TextAreaProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export const TextAreaInput = ({
  control,
  name,
  label,
  required = false,
  placeholder = ''
}: TextAreaProps) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting }
  } = useController({
    name,
    control,
    rules: required ? { required: 'Este campo es obligatorio' } : undefined
  });

  const [isEmpty, setIsEmpty] = useState(!field.value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(event);
    setIsEmpty(event.target.value.trim() === '');
  };

  const handleBlur = () => {
    field.onBlur(); // Fuerza la validación
    if (error && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={name} className="text-xl font-normal text-accent">
        {label}
        {required && <span className="text-primary">*</span>}
      </Label>
      <div className="relative">
        <textarea
          {...field}
          id={name}
          ref={textAreaRef}
          placeholder=""
          className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting} // Deshabilita el campo mientras se envía el formulario
        />
        {isEmpty && placeholder && (
          <span
            className={`absolute right-3 text-gray-400 pointer-events-none transition-all ${
              error ? 'bottom-8' : 'bottom-2'
            }`}
          >
            {placeholder}
          </span>
        )}
        {error && (
          <div className="text-sm text-red-500 mt-1">{error.message}</div>
        )}
      </div>
    </div>
  );
};
