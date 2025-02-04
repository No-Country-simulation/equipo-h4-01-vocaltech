import { TabsTrigger } from '@/components/ui';
import { TabConfig } from '../../Cuestionario';
import { LabelTab } from '../LabelTab/LabelTab';

interface TiggreProps {
  tab: TabConfig;
  hidden?: boolean;
}

export const TriggerTabs = ({ tab, hidden = false }: TiggreProps) => {
  return (
    <TabsTrigger
      key={tab.id}
      value={tab.title}
      className="data-[state=active]:bg-transparent flex-1 flex justify-center "
      disabled={tab.disabled}
    >
      <LabelTab
        icon={tab.icon}
        color={tab.color}
        title={tab.title}
        disabled={tab.disabled}
        status={tab.status}
        hidden={hidden}
      />
    </TabsTrigger>
  );
};
