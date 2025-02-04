import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://equipo-h4-01-vocaltech.onrender.com";

export const useAgendarCita = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agendarCita = async (citaData: any) => {
    setLoading(true);
    setError(null);
    console.log(JSON.stringify(citaData));
    try {
      const response = await fetch(`${API_URL}/api/citas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(citaData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtener el mensaje de error detallado
        console.log("Detalles del error:", errorData);
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorData.detail || errorData.message || 'No details available'}`);
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message || "Error al agendar la cita");
      console.log("Error al agendar la cita:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { agendarCita, loading, error };
};
