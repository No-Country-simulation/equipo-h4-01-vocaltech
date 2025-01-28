import { FormCard } from '../FormCard/FormCard';
import { TabsContent } from '@/components/ui/tabs';
import { FormNavigation } from '../FormNavigation/FromNavigation';
import { FromPersonInfo } from '../FormPersonInfo/FormPersonInfo';

export const FormContent = () => {
  return (
    <FormCard>
      <FormNavigation>
        <TabsContent value="personal" className="p-6">
          <div className="p-6">
            <p className="text-gray-500">Datos Personales.</p>
          </div>
          <FromPersonInfo />
        </TabsContent>
        <TabsContent value="experience">
          <div className="p-6">
            <p className="text-gray-500">Contenido de Mi experiencia/CV.</p>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="p-6">
            <p className="text-gray-500">Contenido de Educación.</p>
          </div>
        </TabsContent>
        <TabsContent value="more">
          <div className="p-6">
            <p className="text-gray-500">Contenido de Más de un ítem.</p>
          </div>
        </TabsContent>
      </FormNavigation>
    </FormCard>
  );
};
