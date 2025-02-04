import { ContentTabs } from '../ContentTabs/ContentTabs';
import { Tabs, TabsList } from '@/components/ui';
import { TriggerTabs } from '../TriggerTabs/TriggerTabs';
import { ContentProps } from '../TypeTabs/TypeTabs';
import { GeneratorForm } from '../../FormGenerator';

interface ContentRendererProps {
  content: ContentProps[];
}

export const ContentRenderer = ({ content }: ContentRendererProps) => {
  return (
    <>
      {Array.isArray(content) ? (
        <Tabs className="w-full" defaultValue={content[0]?.title}>
          <TabsList className="w-full justify-start rounded-none bg-transparent">
            {content.map(subContent => (
              <TriggerTabs
                key={subContent.id}
                id={subContent.id}
                title={subContent.title}
                hidden
              />
            ))}
          </TabsList>
          {content.map(subContent => (
            <ContentTabs key={subContent.id} id={subContent.id}>
              {Array.isArray(subContent.value) &&
                (console.log('subContent.value', subContent.value),
                (<GeneratorForm values={subContent.value} />))}
            </ContentTabs>
          ))}
        </Tabs>
      ) : (
        <div>
          <span className="text-2xl font-bold">{content}</span>
        </div>
      )}
    </>
  );
};
