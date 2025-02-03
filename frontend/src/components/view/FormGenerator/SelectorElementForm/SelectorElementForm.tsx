'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form } from '@/components/ui';
import { FormTypeField } from '../TypeForm/TypeForm';
import { useFormStore } from '@/store/from/from.store';
import { DateField } from '../ElementForm/DateField/DateField';
import { AvatarUploader } from '../ElementForm/AvatarUploader/AvatarUploader';
import type { ValueProps } from '../../TabsGenerator';
import { InputField } from '../ElementForm/InputField/InputField';

interface FormGeneratorProps {
  elements: ValueProps[];
  onSubmit?: (data: Record<string, any>) => void;
}

const createFormSchema = (elements: ValueProps[]) => {
  const schemaFields: Record<string, any> = {};
  console.log('ElementsZod', elements);
  elements.forEach((element: ValueProps) => {
    if (element.required) {
      switch (element.type) {
        case 'email':
          schemaFields[element.id] = z.string().email('Email inválido');
          break;
        case 'date':
          schemaFields[element.id] = z
            .string()
            .min(1, 'Este campo es requerido');
          break;
        case 'number':
          schemaFields[element.id] = z
            .string()
            .refine(val => !isNaN(Number(val)), {
              message: 'Por favor ingrese un número válido'
            });
          break;
        case 'radio': {
          const radioOptions =
            element.options?.map(option => option.value) || [];
          if (radioOptions.length > 0) {
            schemaFields[element.id] = z.enum([
              radioOptions[0],
              ...radioOptions.slice(1)
            ]);
          }
          break;
        }
        case 'textarea':
          schemaFields[element.id] = z
            .string()
            .min(1, 'Este campo es requerido')
            .max(1000, 'Este campo no puede superar los 1000 caracteres');
          break;
        case 'select': {
          const selectOptions =
            element.options?.map(option => option.value) || [];
          if (selectOptions.length > 0) {
            schemaFields[element.id] = z.enum([
              selectOptions[0],
              ...selectOptions.slice(1)
            ] as [string, ...string[]]);
          }
          break;
        }
        case 'text':
          schemaFields[element.id] = z
            .string()
            .min(1, 'Este campo es requerido');
          break;
        case 'audio':
          schemaFields[element.id] = z
            .any()
            .refine(val => val !== undefined, 'Este campo es requerido');
          break;
        case 'photo':
          schemaFields[element.id] = z.any().optional();
          break;
      }
    } else {
      schemaFields[element.id] = z.any().optional();
    }
  });

  return z.object(schemaFields);
};

export const SelectorElementForm = ({
  elements,
  onSubmit
}: FormGeneratorProps) => {
  console.log('ElementsSec', elements);
  const { formData, setFormData } = useFormStore();

  const form = useForm({
    resolver: zodResolver(createFormSchema(elements)),
    defaultValues: formData
  });

  const handleSubmit = (data: Record<string, any>) => {
    setFormData(data);
    onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-[800px] mx-auto bg-white p-8 rounded-lg "
      >
        <div className="space-y-4">
          {elements
            ?.filter(field => field.type !== 'photo')
            .map((field: FormTypeField) => {
              if (field.type === 'date') {
                return (
                  <DateField
                    key={field.id}
                    id={field.id}
                    text={field.text}
                    required={field.required}
                    value={
                      form.watch(field.id as keyof typeof formData) as string
                    }
                    //onChange={date => form.setValue(field.id, date.toString())}
                    onchange={date =>
                      form.setvalue(field.id, date.toisostring())
                    }
                  />
                );
              }

              return (
                <InputField
                  key={field.id}
                  id={field.id}
                  label={field.text}
                  required={field.required}
                  placeholder={field.placeholder}
                  type={field.type}
                  onChange={value => form.setValue(field.id, value)}
                />
              );
            })}

          <Button type="submit" className="w-full mt-6">
            Enviar
          </Button>
        </div>
        <div className="row-span-2">
          {elements
            ?.filter(field => field.type === 'photo')
            .map((field: FormTypeField) => (
              <AvatarUploader
                key={field.id}
                onImageChange={file => form.setValue(field.id, file)}
              />
            ))}
        </div>
      </form>
    </Form>
  );
};
