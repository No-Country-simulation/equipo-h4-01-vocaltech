'use client';

import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Button, FormInput, FormSelect } from '@/components/ui';
import { PlusCircle } from 'lucide-react';
import { usePersonInfoFormStore } from '@/store/PersonInfoForm';

export const FromPersonInfo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    pais: '',
    provincia: '',
    ciudad: '',
    codigoPais: '',
    telefono: '',
    referencia: ''
  });

  const setPerson = usePersonInfoFormStore(state => state.setPersonInfo);
  const person = usePersonInfoFormStore(state => state.personInfo);

  useEffect(() => {
    if (person) {
      setFormData(person);
    }
  }, [person]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Datos personales</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#E8F5F3]"
        >
          <PlusCircle className="h-6 w-6 text-[#40B8A5]" />
        </Button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder={person.nombre || 'Nombre'}
            required
          />
          <FormInput
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="E-Mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            label="País de residencia"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            options={[
              { value: 'argentina', label: 'Argentina' },
              { value: 'chile', label: 'Chile' },
              { value: 'mexico', label: 'México' }
            ]}
            required
          />
          <FormSelect
            label="Provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            options={[
              { value: 'buenosaires', label: 'Buenos Aires' },
              { value: 'cordoba', label: 'Córdoba' },
              { value: 'santafe', label: 'Santa Fe' }
            ]}
            required
          />
          <FormSelect
            label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            options={[
              { value: 'caba', label: 'CABA' },
              { value: 'rosario', label: 'Rosario' },
              { value: 'cordoba', label: 'Córdoba' }
            ]}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex space-x-2">
            <FormSelect
              label="Código de país"
              name="codigoPais"
              value={formData.codigoPais}
              onChange={handleChange}
              options={[
                { value: '+54', label: '+54' },
                { value: '+56', label: '+56' },
                { value: '+52', label: '+52' }
              ]}
            />
            <FormInput
              label="Teléfono móvil"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <FormSelect
            label="Ref. dentro del espermatozoides"
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            options={[
              { value: 'doctor1', label: 'Dr. García' },
              { value: 'doctor2', label: 'Dra. López' },
              { value: 'doctor3', label: 'Dr. Martínez' }
            ]}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#7F56D9] hover:bg-[#7F56D9]/90"
        >
          Continuar
        </Button>
      </form>
    </div>
  );
};
