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
    //console.debug('Data ->', JSON.stringify(response.data, null, 2));
    const adapterResponse = adaptadorQuestions(response.data, 'Cuestionario');
    console.debug('Respoase adpter', JSON.stringify(adapterResponse, null, 2));
    return adapterResponse;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};
