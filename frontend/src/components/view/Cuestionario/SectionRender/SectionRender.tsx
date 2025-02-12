import { FormField, SectionProps } from '../TabType/TabType';
import {
  MvpDescription,
  VoiceDescription
} from '@/components/view/FormGenerator';
import { UseFormReturn } from 'react-hook-form';
import { FormSelectElement } from '../FormSelectElement/FormSelectElement';

interface Props {
  section: SectionProps;
  methods: UseFormReturn<any>; // Recibe el form de react-hook-form
}

export const SectionRender = ({ section, methods }: Props) => {
  if (!section || !section.sectionTitle) {
    return <div>Section not found</div>;
  }

  const sectionSwitch = section.sectionTitle.split(' ').slice(-1)[0];
  console.debug('sectionSwitch', sectionSwitch);

  const renderQuestions = (questions: FormField[]) =>
    questions.map((question: FormField) => (
      <FormSelectElement
        key={question.id}
        question={question}
        methods={methods}
      />
    ));

  switch (sectionSwitch) {
    case '1':
      return (
        <div className="space-y-4">
          <VoiceDescription />
          {renderQuestions(section.questions)}
        </div>
      );
    case '2':
      const npregunta = section.questions.length;
      console.debug('npregunta', npregunta);
      section.questions[0].text.startsWith('1-')
        ? section.questions[0].text
        : (section.questions[0].text = '1- ' + section.questions[0].text);
      const scale = {
        min: 1,
        max: 5,
        minLabel: 'Nada',
        maxLabel: 'Mucho'
      };
      return (
        <div className="flex flex-col space-y-4 gap-4 pb-4">
          <FormSelectElement
            key={section.questions[0].id}
            question={section.questions[0]}
            methods={methods}
          />
          <div className="w-full space-y-8">
            <h2 className="text-2xl font-medium text-primary">
              <span className="font-bold">
                2- ¿Del uno al cinco, siendo uno “nada” y cinco “mucho” cómo
                puntuarías los distintos desafíos que enfrentas en el día a día
                como líder en tu emprendimiento?
              </span>
            </h2>
            <div className="flex items-start justify-between gap-4 pb-2 border-b border-gray-200">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold text-primary">
                    {'Mi Voz: '}
                  </span>
                  <span className="text-primary">
                    {section.questions[1].text}
                  </span>
                </p>
              </div>
              <FormSelectElement
                key={section.questions[1].id}
                question={section.questions[1]}
                methods={methods}
              />
            </div>
            <div className="flex items-start justify-between gap-4 pb-2 border-b border-gray-200">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold text-primary">
                    {'Comunicación interna: '}
                  </span>
                  <span className="text-primary">
                    {section.questions[2].text}
                  </span>
                </p>
              </div>
              <FormSelectElement
                key={section.questions[2].id}
                question={section.questions[2]}
                methods={methods}
              />
            </div>
            <div className="flex justify-end gap-4 pt-1 pr-1">
              {Array.from({ length: scale.max }, (_, i) => i + 1).map(num => (
                <div
                  key={num}
                  className="flex flex-col items-center w-4 text-sm text-gray-600"
                >
                  <span>{num}</span>
                  {num === 1 && (
                    <span className="absolute mt-6 text-xs text-gray-500">
                      {scale.minLabel}
                    </span>
                  )}
                  {num === scale.max && (
                    <span className="absolute mt-6 text-xs text-gray-500">
                      {scale.maxLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case '3':
      return (
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-medium text-primary pb-4">
            <span className="font-bold">
              3- Sobre la comunicación personal:
            </span>
          </h2>
          <div className="space-y-4">{renderQuestions(section.questions)}</div>
        </div>
      );
    case '4':
      return (
        <div className="w-full space-y-8">
          <h2 className="text-2xl font-medium text-primary">
            <span className="font-bold">
              4- Sobre mi vínculo con el resto del equipo:
            </span>
          </h2>
          <div className="space-y-4">
            {section.questions.map((question: FormField) => (
              <div key={question.id}>
                <p className="text-primary font-bold text-lg ">
                  {question.text}
                </p>
                <div className="pt-4 pb-4">
                  <FormSelectElement question={question} methods={methods} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case '5':
      section.questions[0].text.startsWith('Y')
        ? section.questions[0].text
        : (section.questions[0].text = 'Y vos ' + section.questions[0].text);

      return (
        <div className="felx ">
          <div className="space-y-4 pb-4">
            <MvpDescription />
          </div>
          <div className="space-y-4">{renderQuestions(section.questions)}</div>
        </div>
      );
    case '6':
      return (
        <div className="flex flex-col gap-8">
          {section.questions.map((question: FormField, index: number) => {
            question.text = question.text.startsWith(`${index + 1}-`)
              ? question.text
              : `${index + 1}- ${question.text}`;

            return (
              <div key={question.id}>
                <FormSelectElement question={question} methods={methods} />
              </div>
            );
          })}
        </div>
      );
    default:
      return <div>Section not found</div>;
  }
};
