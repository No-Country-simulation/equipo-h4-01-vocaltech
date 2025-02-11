'use client';
import { useState, useCallback, useMemo } from 'react';
import { Button, Tabs, TabsContent, Label, Separator } from '@/components/ui';
import { TabsNavigation } from '../TabsNavigation/TabsNavigation';
import { useTabsState, useFormSubmission, useValidateField } from '@/hooks';
import { ProgressCircles } from '../../Nav';
import {
  AudioRecorder,
  DialogConfirmation,
  DialogSuccess,
  FieldRenderer
} from '../../Common';
import { FormField, SectionProps } from '../TabType/TabType';
import { postQuestions } from '@/api/Questions/post/QuestionsPro';
import {
  MvpDescription,
  TextAreaInput,
  VoiceDescription
} from '../../FormGenerator';
import { useForm } from 'react-hook-form';

export const FormTabs = () => {
  const { activeTab, tabs = [], setActiveTab, validateTab } = useTabsState();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [validSections, setValidSections] = useState<boolean[]>([]);

  const methods = useForm({
    defaultValues: {
      phone: {
        description: '',
        number: ''
      }
    },
    mode: 'onBlur'
  });

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

      const currentTab = tabs[activeTab];
      const isValid = currentTab?.fields?.every((field: any) =>
        field.questions.every((question: any) =>
          useValidateField(question, newData[question.id])
        )
      );

      validateTab(activeTab, isValid);

      const currentSection = tabs[activeTab]?.fields?.[activeSection];
      const isSectionValid = currentSection?.questions?.every((question: any) =>
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
        setActiveSection(tabs[activeTab - 1]?.fields?.length - 1 || 0);
        handleTab(directionValue);
      } else if (
        direction === 'next' &&
        activeSection < (tabs[activeTab]?.fields?.length || 0) - 1
      ) {
        handleSection(directionValue);
      } else if (direction === 'next' && activeTab < tabs.length - 1) {
        setActiveSection(0);
        handleTab(directionValue);
      }
    },
    [activeSection, activeTab, tabs, handleSection, handleTab]
  );

  const handleSubmitTab = useCallback(async () => {
    try {
      console.debug('Submitting:', formData);
      const response = await postQuestions(formData);

      console.debug('Response:', response);
      localStorage.setItem('response', JSON.stringify(response));
      await handleConfirm(formData);
    } catch (error) {
      console.error('Submission error:', error);
    }
  }, [formData, handleConfirm]);

  const allTabsValid = useMemo(
    () =>
      tabs.every(tab =>
        tab.fields.every((field: any) =>
          field.questions.every((question: any) =>
            useValidateField(question, formData[question.id])
          )
        )
      ),
    [tabs, formData]
  );

  const isLastStep = useMemo(() => {
    const totalSteps = tabs.reduce(
      (acc, tab) => acc + (tab.fields?.length || 0),
      0
    );
    const currentStep =
      tabs
        .slice(0, activeTab)
        .reduce((acc, tab) => acc + (tab.fields?.length || 0), 0) +
      activeSection +
      1;
    return currentStep === totalSteps;
  }, [tabs, activeTab, activeSection]);

  const isSectionComplete = useMemo(() => {
    const currentSection = tabs[activeTab]?.fields?.[activeSection];
    return currentSection?.questions?.every(
      (question: any) =>
        formData[question.id] !== undefined && formData[question.id] !== ''
    );
  }, [tabs, activeTab, activeSection, formData]);

  console.debug('Form data:', formData);
  console.debug('Active tab:', activeTab);
  console.debug('Active section:', activeSection);
  console.debug('Valid sections:', validSections);
  console.debug('All tabs valid:', allTabsValid);
  console.debug('Is last step:', isLastStep);
  console.debug('Is section complete:', isSectionComplete);
  console.debug('Is submitting:', isSubmitting);
  console.debug('Show confirmation:', showConfirmation);
  console.debug('Show success:', showSuccess);
  console.debug('Tabs:', tabs);

  return (
    <div className="border-2 border-accent border-opacity-20 rounded-xl p-6 m-4 lg:p-8 lg:m-8 overflow-hidden">
      <Tabs value={tabs[activeTab]?.id}>
        <TabsNavigation
          title=""
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
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {tabs[activeTab]?.fields?.[activeSection]?.sectionTitle
                    ? tabs[activeTab]?.fields?.[activeSection]?.sectionTitle
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')
                    : tab.title}
                </h2>
                {tab.title === 'Cuestionario' && (
                  <ProgressCircles
                    totalSteps={tabs.reduce(
                      (acc, t) => acc + (t.fields?.length || 0),
                      0
                    )}
                    currentStep={
                      tabs
                        .slice(0, activeTab)
                        .reduce((acc, t) => acc + (t.fields?.length || 0), 0) +
                      activeSection +
                      1
                    }
                  />
                )}
              </div>
              <Separator className="border-1 border-accent" />
              <p className="flex justify-end text-sm text-muted-foreground mt-2">
                Tiempo estimado de respuesta: 15 min.
              </p>
              {tab.title === 'Cuestionario' ? (
                <div>
                  <Tabs value={tab.fields?.[activeSection]?.sectionTitle || ''}>
                    <TabsNavigation
                      tabs={
                        tab.fields?.map((field: any, index: number) => ({
                          ...field,
                          id: index.toString(),
                          title: field.sectionTitle
                        })) || []
                      }
                      title={tab.title.split(' ').slice(0, -1).join(' ')}
                      hidden
                      activeTab={activeSection}
                      setActiveTab={setActiveSection}
                    />
                    {tab.fields?.map((field: SectionProps, idx: number) => (
                      <TabsContent
                        key={idx}
                        value={field.sectionTitle || ''}
                        forceMount
                        hidden={activeSection !== idx}
                      >
                        <div className="space-y-2">
                          {field.sectionTitle ===
                            'Comunicación y Liderazgo 1' && (
                            <VoiceDescription />
                          )}
                          {field.sectionTitle === 'Construcción de MVP 5' && (
                            <MvpDescription />
                          )}
                          {field.questions.map((question: FormField) =>
                            question.question_type === 'textarea' ? (
                              <div key={question.id} className="space-y-2">
                                <TextAreaInput
                                  control={methods.control}
                                  name={question.id.toString()}
                                  label={question.text}
                                  placeholder="Hasta 1000 caracteres"
                                  required={question.required}
                                />
                              </div>
                            ) : (
                              <div key={question.id} className="space-y-2">
                                <Label className="text-2xl text-accent">
                                  {question.text}
                                </Label>
                                <FieldRenderer
                                  field={question}
                                  value={formData[question.id]}
                                  onChange={value =>
                                    handleFieldChange(
                                      question.id.toString(),
                                      value
                                    )
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-6">
                  <span className="text-sm text-muted-foreground">
                    {tab.title}
                  </span>
                  {tab.fields?.map((field: any, fieldIndex: number) => (
                    <div key={fieldIndex} className="space-y-2">
                      {field.questions.map((question: FormField) => (
                        <div key={question.id} className="space-y-2">
                          <Label>{question.text}</Label>
                          <FieldRenderer
                            field={question}
                            value={formData[question.id]}
                            onChange={value =>
                              handleFieldChange(question.id.toString(), value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {tabs[activeTab]?.title === 'Mi emprendimiento' && (
                <div className="border-t border-accent mt-8">
                  <AudioRecorder />
                  <p className="text-sm text-muted-foreground text-center">
                    También podés comentarnos un poco sobre vos y sobre tu
                    emprendimiento en un audio de máx. 1 min. grabado en el
                    momento o subido desde tu notebook o celular.
                  </p>
                </div>
              )}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('prev')}
                  disabled={
                    tabs[activeTab]?.title === 'Cuestionario'
                      ? !validSections[activeSection] ||
                        !isSectionComplete ||
                        isSubmitting
                      : !tabs[activeTab]?.completed || isSubmitting
                  }
                >
                  Anterior
                </Button>
                <div className="flex gap-2 ml-auto">
                  {!isLastStep ? (
                    <Button
                      onClick={() => handleNavigation('next')}
                      disabled={
                        tabs[activeTab]?.title === 'Cuestionario'
                          ? !validSections[activeSection] ||
                            !isSectionComplete ||
                            isSubmitting
                          : !tabs[activeTab]?.completed || isSubmitting
                      }
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFinalize}
                      disabled={
                        !allTabsValid || !isSectionComplete || isSubmitting
                      }
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
        onConfirm={handleSubmitTab}
        onCancel={handleCancel}
      />
      <DialogSuccess open={showSuccess} onClose={handleSuccessClose} />
    </div>
  );
};
