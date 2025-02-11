import {
  FormField,
  StatusType,
  TabConfig
} from '@/components/view/Cuestionario';

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
  const grouped: Record<string, Record<string, FormField[]>> = {
    'Comunicación y Liderazgo': {
      'Sub Grupo 1': [],
      'Sub Grupo 2': [],
      'Sub Grupo 3': [],
      'Sub Grupo 4': []
    },
    'Construcción de MVP': {
      'Sub Grupo 1': [],
      'Sub Grupo 2': []
    }
  };

  preguntas.forEach(question => {
    const { group, id: questionId, text, options } = question;
    let sectionTitle = '';
    let questionType = '';

    // Determinar el subgrupo y el tipo de pregunta según la estructura especificada
    if (group === 'Comunicación y Liderazgo') {
      if (questionId === 1) {
        sectionTitle = 'Sub Grupo 1';
        questionType = 'textarea';
      } else if (questionId === 2) {
        sectionTitle = 'Sub Grupo 2';
        questionType = 'radio';
      } else if (questionId === 3 || questionId === 4) {
        sectionTitle = 'Sub Grupo 2';
        questionType = 'rating1';
      } else if (questionId === 5 || questionId === 6 || questionId === 7) {
        sectionTitle = 'Sub Grupo 3';
        questionType = 'radio';
      } else if (questionId === 8 || questionId === 9 || questionId === 10) {
        sectionTitle = 'Sub Grupo 4';
        questionType = 'rating2';
      }
    } else if (group === 'Construcción de MVP') {
      if (questionId === 11) {
        sectionTitle = 'Sub Grupo 1';
        questionType = 'radio';
      } else if (
        questionId === 12 ||
        questionId === 13 ||
        questionId === 14 ||
        questionId === 15
      ) {
        sectionTitle = 'Sub Grupo 2';
        questionType = 'radio';
      }
    }

    grouped[group][sectionTitle].push({
      id: questionId,
      text,
      group,
      question_type: questionType,
      options: options.map(opt => ({
        id: opt.id,
        question: opt.question,
        text: opt.text
      })),
      required: true
    });
  });

  return Object.entries(grouped).map(([groupName, subGroups], index) => ({
    id: `${id}_${index + 1}`, // Asegura que cada id sea único
    title: groupName,
    fields: Object.entries(subGroups).map(([sectionTitle, questions]) => ({
      sectionTitle,
      questions
    })),
    completed: false,
    disabled: false,
    status: StatusType.Pending
  }));
};
