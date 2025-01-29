import { FooterContainer } from '../../Footer';
import { FormContent } from '../FormContent/FormContent';
import { FormTitle } from '../FormTitle/FormTitle';

export const FormContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <FormTitle />
      <FormContent />
      <FooterContainer />
    </div>
  );
};
