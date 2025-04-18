import axios from 'axios';
import { API_URL_PROD, QUEST_PRE } from '@/api/Root/root';
import {
  adaptadorQuestions,
  InputQuestion
} from '../AdapterQuestions/AdapterQuestion';

export const getQuestions = async () => {
  try {
    const response = await axios.get<InputQuestion[]>(
      `${API_URL_PROD}/${QUEST_PRE}/`
    );
    console.debug(response.data);
    const adapterResponse = adaptadorQuestions(
      response.data,
      'Cuestionario',
      'Cuestionario'
    );
    console.debug(JSON.stringify(adapterResponse, null, 2));
    return adapterResponse;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};
