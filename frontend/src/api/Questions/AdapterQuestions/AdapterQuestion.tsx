import {
  FormField,
  StatusType,
  TabConfig
} from '@/components/view/Cuestionario';

export interface InputQuestion {
  id: number;
  name: string;
  subgroups: Subgroup[];
}

export interface Subgroup {
  id: number;
  name: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: Option[]; // Opcional para preguntas abiertas
}

export interface Option {
  id: number;
  questionId: number; // Referencia a la pregunta
  text: string;
}

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'checkbox'
  | 'radio'
  | 'radiogroup'
  | 'select'
  | 'rating1'
  | 'rating2'
  | 'file'
  | 'color'
  | 'range'
  | 'tel'
  | 'url'
  | 'audio'
  | 'avatar'
  | 'video';

export const adaptadorQuestions = (
  preguntas: InputQuestion[],
  id: string
): TabConfig => {
  const grouped: Record<string, FormField[]> = {};

  preguntas.forEach(question => {
    question.subgroups.forEach(subgroup => {
      const sectionTitle = `${question.name === 'Construcción de MVP' ? 'Cuestionario: MVP funcional en 5 semanas' : question.name === 'Comunicación y Liderazgo' ? 'Cuestionario: comunicación y liderazgo' : question.name} ${subgroup.id}`; // Nombre del grupo más el ID del subgrupo

      subgroup.questions.forEach(q => {
        const { id: questionId, text, options } = q;
        let questionType = '';

        // Determinar el tipo de pregunta según la estructura especificada
        if (question.name === 'Comunicación y Liderazgo') {
          if (questionId === 1) {
            questionType = 'textarea';
          } else if (questionId === 2) {
            questionType = 'radio';
          } else if (questionId === 3 || questionId === 4) {
            questionType = 'rating1';
          } else if (questionId === 5 || questionId === 6 || questionId === 7) {
            questionType = 'radio';
          } else if (
            questionId === 8 ||
            questionId === 9 ||
            questionId === 10
          ) {
            questionType = 'rating2';
          }
        } else if (question.name === 'Construcción de MVP') {
          if (questionId === 11) {
            questionType = 'radio2';
          } else if (
            questionId === 12 ||
            questionId === 13 ||
            questionId === 14 ||
            questionId === 15
          ) {
            questionType = 'radio';
          }
        }

        // Ensure sectionTitle exists in grouped object
        if (!grouped[sectionTitle]) {
          grouped[sectionTitle] = [];
        }

        grouped[sectionTitle].push({
          id: questionId,
          text,
          group:
            question.name === 'Construcción de MVP'
              ? 'Cuestionario: MVP funcional en 5 semanas'
              : question.name === 'Comunicación y Liderazgo'
                ? 'Cuestionario: comunicación y liderazgo'
                : question.name,
          question_type: questionType,
          options:
            options?.map(opt => ({
              id: opt.id,
              question: opt.questionId,
              text: opt.text
            })) || [],
          required: true
        });
      });
    });
  });

  return {
    id: `${id}`, // Asegura que el id sea único
    title: `${id}`,
    fields: Object.entries(grouped).map(([sectionTitle, questions]) => ({
      sectionTitle,
      questions
    })),
    completed: false,
    disabled: false,
    status: StatusType.Pending
  };
};
