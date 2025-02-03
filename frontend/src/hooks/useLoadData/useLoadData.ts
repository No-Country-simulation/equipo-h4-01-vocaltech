import { getQuestions } from '@/api';
import { useEffect, useState } from 'react';

export const useLoadData = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const allQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response);
        localStorage.setItem('questions', JSON.stringify(response));
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    allQuestions();
  }, []);

  return { questions };
};
