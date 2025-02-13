'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea
} from '@/components/ui';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFormStore } from '../MiEmpStore/MiEmpStore';
import { AudioRecorder } from '../AudioRecorder/AudioRecorder';

const formSchema = z.object({
  businessName: z.string().min(1, 'El nombre es requerido'),
  location: z.string().min(1, 'La ubicación es requerida'),
  sector: z.string().min(1, 'El sector es requerido'),
  yearsInMarket: z.string().min(1, 'Los años en el mercado son requeridos'),
  employeeCount: z.string().min(1, 'La cantidad de empleados es requerida'),
  additionalInfo: z.string().max(1000, 'Máximo 1000 caracteres')
});

const sectors = [
  'Tecnología',
  'Comercio',
  'Servicios',
  'Industria',
  'Agricultura',
  'Otro'
];
const locations = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Otro'];

export function MiEmpForm() {
  const { formData, setFormData } = useFormStore();
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormData(values);
    // Here you would typically send the form data to your backend
    console.log('Form submitted', { ...values, audio: formData.audioUrl });
  };

  useEffect(() => {
    const subscription = form.watch(value => {
      if (
        Object.keys(value).some(
          key => value[key as keyof typeof value] !== undefined
        )
      ) {
        setFormData(value as z.infer<typeof formSchema>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setFormData]);

  useEffect(() => {
    const isValid = form.formState.isValid && !!formData.audioUrl;
    setIsFormValid(isValid);
  }, [form.formState.isValid, formData.audioUrl]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Mi emprendimiento</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del emprendimiento*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccionar ubicación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector al que pertenece*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccionar sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="yearsInMarket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Años en el mercado*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccionar años" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} {i === 0 ? 'año' : 'años'}
                        </SelectItem>
                      ))}
                      <SelectItem value="20+">Más de 20 años</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de empleados*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Seleccionar cantidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-20">6-20</SelectItem>
                      <SelectItem value="21-50">21-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="100+">Más de 100</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contanos un poco más sobre el emprendimiento*
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[120px] resize-none rounded-md"
                    maxLength={1000}
                    placeholder="Escribe aquí..."
                  />
                </FormControl>
                <div className="flex justify-end">
                  <span className="text-sm text-muted-foreground">
                    {field.value?.length || 0}/1000
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <AudioRecorder />
            <p className="text-sm text-muted-foreground text-center">
              También podés comentarnos un poco sobre vos y sobre tu
              emprendimiento en un audio de máx. 1 min. grabado en el momento o
              subido desde tu notebook o celular.
            </p>
            {!formData.audioUrl && (
              <Alert variant="destructive">
                <AlertDescription>
                  Es necesario incluir un audio para completar el formulario.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <Button type="submit" className="h-12 px-8" disabled={!isFormValid}>
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
