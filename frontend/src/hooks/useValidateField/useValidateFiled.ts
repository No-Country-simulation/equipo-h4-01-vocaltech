import { FormField } from '@/components/view/Cuestionario';
import { z } from 'zod';

const schema = z.object({
  text: z.string().min(1, 'Text is required'),
  number: z.number().min(1, 'Number must be greater than 0'),
  textarea: z.string().min(1, 'Textarea is required'),
  select: z.string().min(1, 'Select is required'),
  yesno: z.boolean(),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  photo: z.string().url('Photo must be a valid URL'),
  audio: z.string().url('Audio must be a valid URL'),
  radio: z.string().min(1, 'Radio selection is required'),
  avatar: z.string().url('Avatar must be a valid URL')
});

export const useValidateField = (
  field: FormField,
  value: unknown
): string | null => {
  try {
    switch (field.question_type) {
      case 'text':
        schema.shape.text.parse(value);
        break;
      case 'number':
        schema.shape.number.parse(value);
        break;
      case 'textarea':
        schema.shape.textarea.parse(value);
        break;
      case 'select':
        schema.shape.select.parse(value);
        break;
      case 'yesno':
        schema.shape.yesno.parse(value);
        break;
      case 'rating':
        schema.shape.rating.parse(value);
        break;
      case 'photo':
        schema.shape.photo.parse(value);
        break;
      case 'audio':
        schema.shape.audio.parse(value);
        break;
      case 'radio':
        schema.shape.radio.parse(value);
        break;
      case 'avatar':
        schema.shape.avatar.parse(value);
        break;
      default:
        return null;
    }
    return null; // Sin error
  } catch (e) {
    return (e as z.ZodError).issues[0]?.message || 'Invalid field';
  }
};
