import { TabsList, TabsTrigger } from '@/components/ui';
import { TabsNavigationProps } from '../TabType/TabType';
import { TabLabel } from '../TabLabel/TabLabel';

export const TabsNavigation = ({
  title,
  tabs,
  hidden,
  setActiveTab
}: TabsNavigationProps) => (
  <TabsList className="flex justify-between w-full bg-transparent pointer-events-none">
    {tabs.map((tab, index) => (
      <TabsTrigger
        key={tab.id}
        value={tab.id}
        className="data-[state=active]:bg-transparent rounded-none px-0 py-0  borber-nome flex-1 flex justify-center "
        disabled={tab.disabled}
        hidden={hidden}
        onClick={() => !tab.disabled && setActiveTab(index)}
      >
        <TabLabel
          icon={tab.icon}
          color={tab.color}
          title={title !== '' ? title : tab.id}
          disabled={tab.disabled}
          status={tab.status}
          hidden={hidden}
        />
      </TabsTrigger>
    ))}
  </TabsList>
);
