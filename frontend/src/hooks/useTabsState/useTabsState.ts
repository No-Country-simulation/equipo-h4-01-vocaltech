'use client';
import { useState, useCallback, useEffect } from 'react';
import { useInitialTabs } from '../useInitialTabs/useInitialTabs';
import { StatusType, TabConfig } from '@/components/view/Cuestionario';

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
        status: index === 0 ? StatusType.Pending : StatusType.Disabled,
        icon: tab.icon || 'MinusCircle',
        color: tab.color || '#6B7280'
      }));
      setTabs(initializedTabs);
    }
  }, [initialTabs]);

  const validateTab = useCallback((tabIndex: number, isValid: boolean) => {
    setTabs(prevTabs =>
      prevTabs?.map((tab, index) =>
        index === tabIndex
          ? {
              ...tab,
              status: isValid ? StatusType.Valid : StatusType.Invalid,
              completed: isValid
            }
          : tab
      )
    );
  }, []);

  const handleTabChange = useCallback((newTab: number) => {
    setActiveTab(newTab);
    setTabs(prevTabs =>
      prevTabs?.map((tab, index) => ({
        ...tab,
        disabled: index !== newTab,
        status: index === newTab ? StatusType.Pending : StatusType.Disabled
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
