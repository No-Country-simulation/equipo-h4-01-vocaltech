import { FormField } from '@/components/view/Cuestionario';
import { z } from 'zod';

export const useValidateField = (field: FormField, value: any): boolean => {
  try {
    switch (field.question_type) {
      case 'text':
        z.string().min(2).max(255).parse(value);
        break;
      case 'number':
        z.number().parse(value);
        break;
      case 'textarea':
        z.string().min(2).max(1000).parse(value);
        break;
      case 'radio':
      case 'checkbox':
      case 'select':
        z.string().nonempty().parse(value);
        break;
      case 'yesno':
        z.boolean().parse(value);
        break;
      case 'rating':
        z.number().min(1).max(5).parse(value);
        break;
      case 'photo':
      case 'audio':
        z.string().url().nonempty().parse(value);
        break;
      default:
        return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
