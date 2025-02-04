import { FormField, TabConfig } from '@/components/view/Cuestionario';

export interface InputQuestion {
  id: number;
  text: string;
  options: OptionsValue[];
  group: string;
  question_type: string;
}
export interface OptionsValue {
  id: number;
  question: number;
  text: string;
}

export const adaptadorQuestions = (
  preguntas: InputQuestion[],
  id: string,
  title: string
): TabConfig[] => {
  const grouped = preguntas.reduce(
    (acc, question) => {
      const groupName = question.group;
      acc[groupName] = acc[groupName] || [];
      acc[groupName].push({
        id: question.id,
        text: question.text,
        group: question.group,
        question_type: question.question_type,
        options: question.options,
        required: false // Ajustar según necesidad
      });
      return acc;
    },
    {} as Record<string, FormField[]>
  );

  return [
    {
      id,
      title,
      fields: Object.entries(grouped).map(([groupName, questions]) => ({
        sectionTitle: groupName,
        questions
      })),
      completed: false,
      disabled: false,
      status: 'pending'
    }
  ];
};
