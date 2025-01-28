import { TabConfig } from '@/components/view/NewForm';
import { Dispatch, SetStateAction, useCallback } from 'react';

export const useTabNavigation = (
  tabsState: TabConfig[],
  setTabsState: Dispatch<SetStateAction<TabConfig[]>>
) => {
  const isLastTab = useCallback(
    (activeTab: number) => activeTab === tabsState.length - 1,
    [tabsState.length]
  );

  const updateTabsState = useCallback(
    (newActive: number, direction: 'forward' | 'backward') => {
      setTabsState(prev =>
        prev.map((tab, index) => ({
          ...tab,
          completed:
            direction === 'forward'
              ? index < newActive || tab.completed // Al avanzar, marca los anteriores
              : index >= newActive
                ? false
                : tab.completed, // Al retroceder, desmarca desde el actual
          disabled: index !== newActive
        }))
      );
    },
    [setTabsState]
  );

  return { isLastTab, updateTabsState };
};
