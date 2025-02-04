import { TabsList, TabsTrigger } from '@/components/ui';
import { TabsNavigationProps } from '../TabType/TabType';
import { TabLabel } from '../TabLabel/TabLabel';

export const TabsNavigation = ({
  tabs,
  hidden,
  setActiveTab
}: TabsNavigationProps) => (
  <TabsList className="flex justify-start w-full bg-transparent pointer-events-none">
    {tabs.map((tab, index) => (
      <TabsTrigger
        key={tab.id}
        value={tab.title}
        className="data-[state=active]:bg-transparent flex-1 flex justify-Start"
        disabled={tab.disabled}
        onClick={() => !tab.disabled && setActiveTab(index)}
      >
        <TabLabel
          icon={tab.icon}
          color={tab.color}
          title={tab.title}
          disabled={tab.disabled}
          status={tab.status}
          hidden={hidden}
        />
      </TabsTrigger>
    ))}
  </TabsList>
);
