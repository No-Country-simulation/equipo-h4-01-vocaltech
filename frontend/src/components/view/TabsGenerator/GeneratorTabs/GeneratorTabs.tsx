import { Tabs, TabsList } from '@/components/ui';
import { TriggerTabs } from '../TriggerTabs/TriggerTabs';
import { ContentTabs } from '../ContentTabs/ContentTabs';
import { TabConfig } from '../../Cuestionario';

interface GeneratorTabsProps {
  data: TabConfig[];
}

export const GeneratorTabs = ({ data }: GeneratorTabsProps) => {
  return (
    <Tabs
      className="border-2 border-accent rounded-xl w-full p-4"
      defaultValue={data[0]?.id}
    >
      <TabsList className="flex justify-between w-full bg-transparent pointer-events-none">
        {data.map(tad => (
          <TriggerTabs tab={tad} />
        ))}
      </TabsList>
      {data.map(({ title }) => (
        <ContentTabs value={title}>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          </div>
          {/*<ContentRenderer fileds={fields} />*/}
        </ContentTabs>
      ))}
    </Tabs>
  );
};
