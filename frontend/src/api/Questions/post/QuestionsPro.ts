import axios from 'axios';
import { API_URL_PROD, QUEST_PRO } from '@/api/Root/root';
import {
  AdapterResponse,
  ResponseData
} from '../AdapterReponse/AdapterResponse';

export const postQuestions = async (questions: any) => {
  try {
    const questionAdatper = AdapterResponse(1, questions);
    console.log('pilas', JSON.stringify(questionAdatper, null, 2));
    const response = await axios.post<ResponseData>(
      `${API_URL_PROD}/${QUEST_PRO}/`,
      {
        ...questionAdatper
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ocurrio un error al registrar la entrada');
  }
};
