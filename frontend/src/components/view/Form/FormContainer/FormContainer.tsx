import { FooterContainer } from '../../Footer';
import { HeaderContainer } from '../../Header';
import { FormContent } from '../FormContent/FormContent';
import { FormTitle } from '../FormTitle/FormTitle';

export const FormContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer />
      <FormTitle />
      <FormContent />
      <FooterContainer />
    </div>
  );
};
