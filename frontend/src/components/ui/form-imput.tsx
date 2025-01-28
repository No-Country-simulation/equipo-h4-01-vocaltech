import { ChangeEvent, FC } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string; // Añadir la propiedad placeholder
}

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '' // Valor por defecto para placeholder
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder} // Añadir el atributo placeholder
    />
    <p>Previsualización: {value}</p> {/* Añadir previsualización */}
  </div>
);
