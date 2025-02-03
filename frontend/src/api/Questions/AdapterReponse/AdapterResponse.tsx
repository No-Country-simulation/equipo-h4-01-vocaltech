export interface ResponseData {
  user: number;
  responses: {
    [key: string]: string | number; // Claves como string, valores mixtos
  };
}

// adapter.ts
export const AdapterResponse = (
  userId: number,
  formData: { [key: string]: any }
): ResponseData => {
  return {
    user: Number(userId),
    responses: Object.entries(formData).reduce(
      (acc, [key, value]) => {
        // Convertir a número solo si es un string numérico
        acc[key] =
          typeof value === 'string'
            ? !isNaN(Number(value)) && value.trim() !== ''
              ? Number(value) // Conversión a número
              : value.trim() // String limpio
            : Number(value); // Asegurar número si no es string

        return acc;
      },
      {} as { [key: string]: string | number }
    )
  };
};
