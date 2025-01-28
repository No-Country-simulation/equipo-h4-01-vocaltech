import { FormField } from '@/components/view/NewForm';

export const useValidateField = (field: FormField, value: any): boolean => {
  if (field.validation?.required) {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && !value.trim()) return false;
    if (Array.isArray(value) && value.length === 0) return false;
  }

  switch (field.type) {
    case 'text':
    case 'textarea':
      if (field.validation?.min && value?.length < field.validation.min)
        return false;
      if (field.validation?.max && value?.length > field.validation.max)
        return false;
      if (
        field.validation?.pattern &&
        !new RegExp(field.validation.pattern).test(value)
      )
        return false;
      return true;

    case 'rating':
      return !(
        field.validation?.required &&
        (value === undefined || value < 1)
      );

    default:
      return true;
  }
};
