'use client';
import { useEffect, useState } from 'react';
import { TabConfig } from '@/components/view/Cuestionario';
import { getQuestions } from '@/api';

export const useLoadData = () => {
  const [questions, setQuestions] = useState<TabConfig[]>();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getQuestions();
        if (data) {
          setQuestions(data);
          localStorage.setItem('questions', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, []);

  return { questions };
};
