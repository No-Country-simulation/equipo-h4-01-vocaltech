'use client';
import { useState, useCallback, useMemo } from 'react';
import { Button, Tabs, TabsContent, Label, Separator } from '@/components/ui';
import { TabsNavigation } from '../TabsNavigation/TabsNavigation';
import { initialTabs } from '../TabsInitial/TabsInitial';
import { useTabsState, useFormSubmission, useValidateField } from '@/hooks';
import { FieldRenderer } from '../FieldRenderer/FieldRenderer';
import { DialogSuccess } from '../DialogSuccess/DialogSuccess';
import { DialogConfirmation } from '../DialogConfirmation/DialogConfirmation';
import { BreadcrumbNav } from '../BreadcrumbNav/BreadcrumbNav';
import { ProgressCircles } from '../ProgressCircles/ProgressCircles';

export const FormTabs = () => {
  const { activeTab, tabs, setActiveTab, validateTab } =
    useTabsState(initialTabs);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [validSections, setValidSections] = useState<boolean[]>([]);

  const {
    showConfirmation,
    showSuccess,
    isSubmitting,
    handleFinalize,
    handleConfirm,
    handleCancel,
    handleSuccessClose
  } = useFormSubmission();

  const handleFieldChange = useCallback(
    (fieldId: string, value: any) => {
      const newData = { ...formData, [fieldId]: value };
      setFormData(newData);

      // Validación en tiempo real
      const currentTab = tabs[activeTab];
      const isValid = currentTab.fields.every((field: any) =>
        field.questions.every((question: any) =>
          useValidateField(question, newData[question.id])
        )
      );

      validateTab(activeTab, isValid);

      // Validación de sección
      const currentSection = tabs[activeTab].fields[activeSection];
      const isSectionValid = currentSection.questions.every((question: any) =>
        useValidateField(question, newData[question.id])
      );

      setValidSections(prev => {
        const newValidSections = [...prev];
        newValidSections[activeSection] = isSectionValid;
        return newValidSections;
      });
    },
    [formData, activeTab, activeSection, tabs, validateTab]
  );

  const handleSection = useCallback(
    (direction: number) => {
      const targetCurrent = activeSection + direction;
      setActiveSection(targetCurrent);
    },
    [activeSection]
  );

  const handleTab = useCallback(
    (direction: number) => {
      const targetTab = activeTab + direction;
      setActiveTab(targetTab);
    },
    [activeTab, setActiveTab]
  );

  const handleNavigation = useCallback(
    (direction: 'next' | 'prev') => {
      const directionValue = direction === 'next' ? 1 : -1;

      if (direction === 'prev' && activeSection > 0) {
        handleSection(directionValue);
      } else if (direction === 'prev' && activeTab > 0) {
        setActiveSection(tabs[activeTab - 1].fields.length - 1);
        handleTab(directionValue);
      } else if (
        direction === 'next' &&
        activeSection < tabs[activeTab].fields.length - 1
      ) {
        handleSection(directionValue);
      } else if (direction === 'next' && activeTab < tabs.length - 1) {
        setActiveSection(0);
        handleTab(directionValue);
      }
    },
    [activeSection, activeTab, tabs, handleSection, handleTab]
  );

  const handleSubmit = useCallback(async () => {
    try {
      // Lógica de envío aquí
      console.log('Submitting:', formData);
      await handleConfirm(formData);
    } catch (error) {
      console.error('Submission error:', error);
    }
  }, [formData, handleConfirm]);

  const allTabsValid = useMemo(
    () =>
      tabs.every(tab =>
        tab.fields.every(field =>
          field.questions.every(question =>
            useValidateField(question, formData[question.id])
          )
        )
      ),
    [tabs, formData]
  );

  return (
    <>
      <BreadcrumbNav
        tabTitle={`${tabs[activeTab].title} 
           ${
             tabs[activeTab].fields.length > 1 && activeSection < 1
               ? ` ${activeSection + 1} de ${tabs[activeTab].fields.length}`
               : ''
           }`}
        sectionTitle={
          tabs[activeTab].fields[activeSection]?.secctionTitle || ''
        }
      />
      <div className="border-2 border-accent borber-opacity-20 rounded-xl p-6 m-4 lg:p-8 lg:m-8 relative overflow-hidden">
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
                <div className="flex justify-between item-center">
                  <h2 className="text-xl font-semibold ">{tab.title}</h2>
                  {tab.title === 'Encuesta' && (
                    <ProgressCircles
                      totalSteps={tab.fields.length}
                      currentStep={activeSection + 1}
                    />
                  )}
                </div>
                <Separator className="boober-1 border-accent" />
                <p className="flex justify-end text-sm text-muted-foreground mt-2">
                  Tiempo estimado de respuesta: 15 min.
                </p>
                {tab.title === 'Encuesta' ? (
                  <div>
                    <Tabs value={tab.fields[activeSection].secctionTitle}>
                      <TabsNavigation
                        tabs={tab.fields.map((field, index) => ({
                          id: index.toString(),
                          title: field?.secctionTitle || '',
                          fields: [], // Agrega las propiedades faltantes
                          completed: false,
                          disabled: false,
                          status: 'pending'
                        }))}
                        activeTab={activeSection}
                        setActiveTab={setActiveSection}
                        hidden
                      />
                      {tab.fields.map((field, idx) => (
                        <TabsContent
                          key={field.secctionTitle}
                          value={field.secctionTitle || ''}
                          forceMount
                          hidden={activeSection !== idx}
                        >
                          <div className="space-y-2">
                            <h3>{field.secctionTitle}</h3>
                            {field.questions.map(question => (
                              <div key={question.id} className="space-y-2">
                                <Label>{question.label}</Label>
                                <FieldRenderer
                                  field={question}
                                  value={formData[question.id]}
                                  onChange={value =>
                                    handleFieldChange(question.id, value)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {tab.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <h3>{field.secctionTitle}</h3>
                        {field.questions.map(question => (
                          <div key={question.id} className="space-y-2">
                            <Label>{question.label}</Label>
                            <FieldRenderer
                              field={question}
                              value={formData[question.id]}
                              onChange={value =>
                                handleFieldChange(question.id, value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between mt-8">
                  {activeTab > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => handleNavigation('prev')}
                      disabled={
                        tabs[activeTab].title === 'Encuesta'
                          ? !validSections[activeSection] || isSubmitting
                          : !tabs[activeTab].completed || isSubmitting
                      }
                    >
                      Anterior
                    </Button>
                  )}
                  <div className="flex gap-2 ml-auto">
                    {activeTab < tabs.length - 1 ? (
                      <Button
                        onClick={() => handleNavigation('next')}
                        disabled={
                          tabs[activeTab].title === 'Encuesta'
                            ? !validSections[activeSection] || isSubmitting
                            : !tabs[activeTab].completed || isSubmitting
                        }
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
    </>
  );
};
