import { FormField } from '@/components/view/Cuestionario';
import { z } from 'zod';

export const useValidateField = (field: FormField, value: any): boolean => {
  try {
    switch (field.question_type) {
      case 'text':
      case 'number':
      case 'textarea':
      case 'select':
      case 'yesno':
      case 'rating':
      case 'photo':
      case 'audio':
      default:
        return true;
    }
    return true;
  } catch (e) {
    return false;
  }
};
