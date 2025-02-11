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
          setQuestions(Array.isArray(data) ? data : [data]);
          localStorage.setItem(
            'questions',
            JSON.stringify(Array.isArray(data) ? data : [data])
          );
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, []);

  return { questions };
};
