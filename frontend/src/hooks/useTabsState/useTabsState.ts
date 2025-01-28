'use client';
import { TabConfig } from '@/components/view/NewForm';
import { useState, useCallback } from 'react';

export const useTabsState = (initialTabs: TabConfig[]) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<TabConfig[]>(() =>
    initialTabs.map((tab, index) => ({
      ...tab,
      disabled: index !== 0,
      status: index === 0 ? 'pending' : 'disabled'
    }))
  );

  const validateTab = useCallback((tabIndex: number, isValid: boolean) => {
    setTabs(prevTabs =>
      prevTabs.map((tab, index) => {
        if (index === tabIndex) {
          return {
            ...tab,
            status: isValid ? 'valid' : 'invalid',
            completed: isValid
          };
        }
        return tab;
      })
    );
    return isValid;
  }, []);

  const updateTabState = useCallback(
    (prevTabs: TabConfig[], newTab: number) => {
      return prevTabs.map((tab, index) => {
        if (index === newTab) {
          return {
            ...tab,
            status: tab.completed ? tab.status : 'pending',
            disabled: false
          };
        }
        return {
          ...tab,
          disabled: true
        };
      });
    },
    []
  );

  const handleTabChange = useCallback(
    (newTab: number) => {
      setTabs(prevTabs => updateTabState(prevTabs, newTab));
      setActiveTab(newTab);
    },
    [updateTabState]
  );

  return {
    activeTab,
    tabs,
    setActiveTab: handleTabChange,
    validateTab
  };
};
