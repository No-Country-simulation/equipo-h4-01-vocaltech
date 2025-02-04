import axios from 'axios';
import { API_URL_PROD } from '@/api/Root/root';
export const getHealthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL_PROD}/`);
    console.debug(response);
    return response;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};
