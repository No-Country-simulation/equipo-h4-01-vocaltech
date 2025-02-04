/*import { ContentTabs } from '../ContentTabs/ContentTabs';
import { Tabs, TabsList } from '@/components/ui';
import { TriggerTabs } from '../TriggerTabs/TriggerTabs';
import { ContentProps } from '../TypeTabs/TypeTabs';
import { GeneratorForm } from '../../FormGenerator';
import { SectionProps } from '../../Cuestionario';
interface ContentRendererProps {
  fields: SectionProps[];
}

export const ContentRenderer = ({ fields }: ContentRendererProps) => {
  {
    return (
    <>
      {Array.isArray(fields) ? (
        <Tabs className="w-full" defaultValue={fields[0]?.sectionTitle}>
          <TabsList className="w-full justify-start rounded-none bg-transparent">
            {fields.map((section) => (
              <TriggerTabs 
                
              hidden /> e e
            ))}
          </TabsList>
          {fields.map(section => (
            <ContentTabs key={section.sectionTitle} id={section.sectionTitle}>
              {section.questions.map(question => (
                <GeneratorForm key={question.id} values={question} />
              ))}
            </ContentTabs>
          ))}
              ) : (
        <div>
          <span className="text-2xl font-bold">{content}</span>
        </div>
      )}
    </>
  );
  }
};*/
