import axios from 'axios';
import { API_URL_PROD, QUEST_PRO } from '@/api/Root/root';

export const postQuestions = async (questions: any) => {
  try {
    const response = await axios.post(`${API_URL_PROD}/${QUEST_PRO}`, {
      ...questions
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ocurrio un error al registrar la entrada');
  }
};
