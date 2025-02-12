import {
  Radio2,
  RadioGroupField,
  Rating1,
  Rating2,
  TextAreaInput
} from '@/components/view/FormGenerator';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../TabType/TabType';

interface Props {
  question: FormField;
  methods: UseFormReturn<any>;
  onFieldChange: (fieldId: string, value: any) => void;
}

export const FormSelectElement = ({
  question,
  methods,
  onFieldChange
}: Props) => {
  const handleChange = (value: any) => {
    methods.setValue(question.id.toString(), value);
    onFieldChange(question.id.toString(), value);
  };

  switch (question.question_type) {
    case 'textarea':
      return (
        <TextAreaInput
          control={methods.control}
          name={question.id.toString()}
          label={'Por eso, te pregunto: ' + question.text}
          placeholder="Hasta 1000 caracteres"
          onChange={handleChange}
          required={question.required}
        />
      );
    case 'radio':
      const sublabelMatch = question.text.match(/\(([^)]+)\)/);
      const label = sublabelMatch
        ? question.text.split('(')[0].trim()
        : question.text;
      const sublabel = sublabelMatch ? `(${sublabelMatch[1]})` : undefined;
      return (
        <RadioGroupField
          label={label}
          sublabel={sublabel}
          options={question.options.map(option => ({
            label: option.text,
            value: option.id
          }))}
          value={methods.getValues(question.id.toString())}
          onChange={handleChange}
        />
      );
    case 'radio2':
      return (
        <Radio2
          label={question.text}
          options={question.options.map(option => ({
            label: option.text,
            value: option.id
          }))}
          value={methods.getValues(question.id.toString())}
          onChange={handleChange}
        />
      );
    case 'rating1':
      return (
        <Rating1
          name={question.id.toString()}
          value={methods.getValues(question.id.toString())}
          onChange={handleChange}
          options={question.options}
        />
      );
    case 'rating2':
      return (
        <Rating2
          name={question.id.toString()}
          options={question.options}
          value={methods.getValues(question.id.toString())}
          onChange={handleChange}
        />
      );
    default:
      return <p className="text-red-500">Tipo de pregunta no soportado</p>;
  }
};
