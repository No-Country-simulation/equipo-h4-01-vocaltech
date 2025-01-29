import { FooterContainer } from '../../Footer';
import { HeaderContainer } from '../../Header';
import { FormTabs } from '../FormTabs/FormTabs';

export const FormNewContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer />
      <div className="container mx-auto p-4">
        <FormTabs />
      </div>
      <FooterContainer />
    </div>
  );
};
