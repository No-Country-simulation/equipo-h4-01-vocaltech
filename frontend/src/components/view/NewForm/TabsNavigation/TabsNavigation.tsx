import { TabsList, TabsTrigger } from '@/components/ui';
import { TabsNavigationProps } from '../TabType/TabType';
import { TabLabel } from '../TabLabel/TabLabel';

export const TabsNavigation = ({
  tabs,
  activeTab,
  setActiveTab
}: TabsNavigationProps) => (
  <TabsList className="flex w-full pointer-events-none">
    {tabs.map((tab, index) => (
      <TabsTrigger
        key={tab.id}
        value={tab.id}
        className="data-[state=active]:bg-transparent"
        disabled={tab.disabled}
        onClick={() => !tab.disabled && setActiveTab(index)}
      >
        <TabLabel
          icon={tab.icon}
          color={tab.color}
          title={tab.title}
          disabled={tab.disabled}
          status={tab.status}
        />
      </TabsTrigger>
    ))}
  </TabsList>
);
