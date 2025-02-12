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
}

export const FormSelectElement = ({ question, methods }: Props) => {
  switch (question.question_type) {
    case 'textarea':
      return (
        <TextAreaInput
          control={methods.control}
          name={question.id.toString()}
          label={'Por eso, te pregunto: ' + question.text}
          placeholder="Hasta 1000 caracteres"
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
            value: option.id.toString()
          }))}
          value={methods.getValues(question.id.toString())}
          onChange={value => methods.setValue(question.id.toString(), value)}
        />
      );
    case 'radio2':
      return (
        <Radio2
          label={question.text}
          options={question.options.map(option => ({
            label: option.text,
            value: option.id.toString()
          }))}
          value={methods.getValues(question.id.toString())}
          onChange={value => methods.setValue(question.id.toString(), value)}
        />
      );
    case 'rating1':
      return (
        <Rating1
          name={question.id.toString()}
          value={methods.getValues(question.id.toString())}
          onChange={value => methods.setValue(question.id.toString(), value)}
          min={1}
          max={5}
        />
      );
    case 'rating2':
      return (
        <Rating2
          name={question.id.toString()}
          scale={{
            min: 'Nada',
            max: 'Mucho',
            steps: 5
          }}
          value={methods.getValues(question.id.toString())}
          onChange={value => methods.setValue(question.id.toString(), value)}
        />
      );

    default:
      return <p className="text-red-500">Tipo de pregunta no soportado</p>;
  }
};
