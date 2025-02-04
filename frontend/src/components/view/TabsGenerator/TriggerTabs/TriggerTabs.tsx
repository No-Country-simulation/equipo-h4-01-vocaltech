import { TabsTrigger } from '@/components/ui';
import { LabelTab } from '../LabelTab/LabelTab';
import { TabsProps } from '../TypeTabs/TypeTabs';

interface TiggreProps {
  tab: TabsProps;
  hidden?: boolean;
}

export const TriggerTabs = ({ tab, hidden = false }: TiggreProps) => {
  const { id, title, icon, color, disabled, status } = tab;
  return (
    <TabsTrigger
      value={id}
      className="data-[state=active]:bg-transparent flex-1 flex justify-between border-b-2 data-[state=inactive]:border-fuchsia-300"
    >
      <LabelTab
        icon={icon}
        color={color}
        title={title}
        disabled={disabled}
        status={status}
        hidden={hidden}
      />
    </TabsTrigger>
  );
};
