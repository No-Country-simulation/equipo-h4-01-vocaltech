import axios from 'axios';
import { API_URL_PROD, QUEST_PRE } from '@/api/Root/root';

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL_PROD}/${QUEST_PRE}/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
/*
import axios from 'axios';
import { API_URL_PROD, QUEST_PRE } from '@/api/Root/root';

// Tipo de respuesta esperado (si usas TypeScript)
type QuestionResponse = {
  // Define la estructura esperada de tus preguntas
  questions: Array<{
    id: string;
    text: string;
    //... otros campos
  }>;
};

export const getQuestions = async (): Promise<QuestionResponse> => {
  try {
    const url = new URL(`${QUEST_PRE}/`, API_URL_PROD).toString();
    const response = await axios.get<QuestionResponse>(url);

    // Verificar status HTTP (opcional, axios ya rechaza en status 4xx/5xx)
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Validar estructura de datos (opcional, dependiendo de tu caso)
    if (!response.data?.questions) {
      throw new Error('Invalid response structure');
    }

    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to fetch questions';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    console.error('Error fetching questions:', error);
    throw new Error(errorMessage); // Propagar el error para manejo superior
  }
};*/
