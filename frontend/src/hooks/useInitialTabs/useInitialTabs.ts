'use client';
import { useEffect, useState } from 'react';
import { useLoadData } from '../useLoadData/useLoadData';
import { TabConfig } from '@/components/view/Cuestionario';

export const useInitialTabs = () => {
  const { questions } = useLoadData();
  const [initialTabs, setInitialTabs] = useState<TabConfig[]>([]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setInitialTabs(questions);
    }
  }, [questions]);

  return { initialTabs };
};
