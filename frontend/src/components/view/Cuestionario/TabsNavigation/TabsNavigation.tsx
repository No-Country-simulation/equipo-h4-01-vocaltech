import { FC } from 'react';
import { TabsList, TabsTrigger } from '@/components/ui';
import { TabConfig, StatusType } from '../TabType/TabType';
import { TabLabel } from '../TabLabel/TabLabel';

interface TabsNavigationProps {
  title: string;
  tabs: TabConfig[];
  hidden: boolean;
  currentTab: number; // Añadido currentTab
  setActiveTab: (newTab: number) => void;
  tabStatus: StatusType[]; // Use the enum here
}

export const TabsNavigation: FC<TabsNavigationProps> = ({
  title,
  tabs,
  hidden,
  currentTab, // Añadido currentTab
  setActiveTab,
  tabStatus
}) => (
  <TabsList className="flex justify-between w-full bg-transparent pointer-events-none">
    {tabs.map((tab, index) => (
      <TabsTrigger
        key={tab.id}
        value={tab.id}
        className={`data-[state=active]:bg-transparent rounded-none px-0 py-0 border-none flex-1 flex justify-center ${tabStatus[index]} ${currentTab === index ? 'active' : ''}`} // Añadido currentTab
        disabled={tab.disabled}
        hidden={hidden}
        onClick={() => !tab.disabled && setActiveTab(index)}
      >
        <TabLabel
          icon={tab.icon}
          color={tab.color}
          title={title || tab.id} // Simplificado
          disabled={tab.disabled}
          status={tabStatus[index]} // Pass the status to TabLabel
          hidden={hidden}
        />
      </TabsTrigger>
    ))}
  </TabsList>
);
