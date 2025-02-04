import { Tabs, TabsList } from '@/components/ui';
import { TriggerTabs } from '../TriggerTabs/TriggerTabs';
import { ContentRenderer } from '../ContentRenderer/ContentRenderer';
import { ContentTabs } from '../ContentTabs/ContentTabs';
import { TabsProps } from '../TypeTabs/TypeTabs';

interface GeneratorTabsProps {
  data: TabsProps[];
}

export const GeneratorTabs = ({ data }: GeneratorTabsProps) => {
  return (
    <Tabs
      className="border-2 border-accent rounded-xl w-full p-4"
      defaultValue={data[0]?.id}
    >
      <TabsList className="flex justify-between w-full bg-transparent pointer-events-none">
        {data.map(tad => (
          <TriggerTabs
            id={id}
            title={title}
            color={color}
            icon={icon}
            disabled={disabled}
            status={status}
          />
        ))}
      </TabsList>
      {data.map(({ id, title, content }) => (
        <ContentTabs id={id}>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          </div>
          <ContentRenderer content={content} />
        </ContentTabs>
      ))}
    </Tabs>
  );
};
