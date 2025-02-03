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
        user: 1,
        responses: {
          '1': 'Quiero mejorar mi dicción y proyección de voz.',
          '2': 1,
          '3': 4,
          '4': 3,
          '5': 15,
          '6': 18,
          '7': 21,
          '8': 2,
          '9': 3,
          '10': 5,
          '11': 37,
          '12': 41,
          '13': 45,
          '14': 47,
          '15': 50
        }
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
