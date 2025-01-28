'use client';
import { Button, Tabs, TabsContent, Label } from '@/components/ui';
import { TabsNavigation } from '../TabsNavigation/TabsNavigation';
import { initialTabs } from '../TabsInitial/TabsInitial';
import { useState } from 'react';
import { useTabsState, useFormSubmission, useValidateField } from '@/hooks';
import { FieldRenderer } from '../FieldRenderer/FieldRenderer';
import { DialogSuccess } from '../DialogSuccess/DialogSuccess';
import { DialogConfirmation } from '../DialogConfirmation/DialogConfirmation';

export const FormTabs = () => {
  const { activeTab, tabs, setActiveTab, validateTab } =
    useTabsState(initialTabs);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const {
    showConfirmation,
    showSuccess,
    isSubmitting,
    handleFinalize,
    handleConfirm,
    handleCancel,
    handleSuccessClose
  } = useFormSubmission();

  const handleFieldChange = (fieldId: string, value: any) => {
    const newData = { ...formData, [fieldId]: value };
    setFormData(newData);

    // Validación en tiempo real
    const currentTab = tabs[activeTab];
    const isValid = currentTab.fields.every(field =>
      useValidateField(field, newData[field.id])
    );

    validateTab(activeTab, isValid);
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    const targetTab = direction === 'next' ? activeTab + 1 : activeTab - 1;
    setActiveTab(targetTab);
  };

  const handleSubmit = async () => {
    try {
      // Lógica de envío aquí
      console.log('Submitting:', formData);
      await handleConfirm(formData);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const allTabsValid = tabs.every(tab =>
    tab.fields.every(field => useValidateField(field, formData[field.id]))
  );

  return (
    <div className="border-2 border-border rounded-xl p-6 m-4 lg:p-8 lg:m-8 relative overflow-hidden">
      <Tabs value={tabs[activeTab].id}>
        <TabsNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {tabs.map((tab, index) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            forceMount
            hidden={activeTab !== index}
          >
            <div className="space-y-4 p-4">
              <h2 className="text-xl font-semibold pb-2 border-b-2 border-primary w-fit">
                {tab.title}
              </h2>

              <div className="space-y-6">
                {tab.fields.map(field => (
                  <div key={field.id} className="space-y-2">
                    <Label>{field.label}</Label>
                    <FieldRenderer
                      field={field}
                      value={formData[field.id]}
                      onChange={value => handleFieldChange(field.id, value)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                {activeTab > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('prev')}
                    disabled={!tabs[activeTab].completed || isSubmitting}
                  >
                    Anterior
                  </Button>
                )}

                <div className="flex gap-2 ml-auto">
                  {activeTab < tabs.length - 1 ? (
                    <Button
                      onClick={() => handleNavigation('next')}
                      disabled={!tabs[activeTab].completed || isSubmitting}
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFinalize}
                      disabled={!allTabsValid || isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Finalizar'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <DialogConfirmation
        open={showConfirmation}
        onConfirm={handleSubmit}
        onCancel={handleCancel}
      />

      <DialogSuccess open={showSuccess} onClose={handleSuccessClose} />
    </div>
  );
};
