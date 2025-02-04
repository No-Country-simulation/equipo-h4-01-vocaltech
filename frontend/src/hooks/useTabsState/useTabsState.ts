'use client';
import { useState, useCallback, useEffect } from 'react';
import { TabConfig } from '@/components/view/Cuestionario';
import { useInitialTabs } from '../useInitialTabs/useInitialTabs';

// Solo se ejecuta cuando initialTabs cambia
export const useTabsState = () => {
  const { initialTabs } = useInitialTabs();
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<TabConfig[]>();

  useEffect(() => {
    if (initialTabs.length > 0) {
      const initializedTabs = initialTabs.map((tab, index) => ({
        ...tab,
        disabled: index !== 0,
        status: index === 0 ? 'pending' : 'disabled',
        icon: tab.icon || 'default-icon',
        color: tab.color || '#6B7280'
      }));
      setTabs(initializedTabs);
    }
  }, [initialTabs]);
  const validateTab = useCallback((tabIndex: number, isValid: boolean) => {
    setTabs(prevTabs =>
      prevTabs.map((tab, index) =>
        index === tabIndex
          ? {
              ...tab,
              status: isValid ? 'valid' : 'invalid',
              completed: isValid
            }
          : tab
      )
    );
  }, []);

  const handleTabChange = useCallback((newTab: number) => {
    setActiveTab(newTab);
    setTabs(prevTabs =>
      prevTabs.map((tab, index) => ({
        ...tab,
        disabled: index !== newTab,
        status: index === newTab ? 'pending' : 'disabled'
      }))
    );
  }, []);

  return {
    activeTab,
    tabs,
    setActiveTab: handleTabChange,
    validateTab
  };
};
