'use client';
import { useState, useCallback, useMemo } from 'react';
import { Button, Tabs, TabsContent, Separator } from '@/components/ui';
import { TabsNavigation } from '../TabsNavigation/TabsNavigation';
import { useTabsState, useFormSubmission, useValidateField } from '@/hooks';
import { ProgressCircles } from '../../Nav';
import { AudioRecorder, DialogConfirmation, DialogSuccess } from '../../Common';
import { SectionProps } from '../TabType/TabType';
import { postQuestions } from '@/api/Questions/post/QuestionsPro';
import { FormProvider, useForm } from 'react-hook-form';
import { SectionRender } from '../SectionRender/SectionRender';
import { StatusType } from '../TabType/TabType';

interface FormData {
  [key: string]: any;
}

export const FormTabs = () => {
  const { activeTab, tabs = [], setActiveTab, validateTab } = useTabsState();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [tabStatus, setTabStatus] = useState<StatusType[]>(
    tabs.map(() => StatusType.Pending)
  );

  const methods = useForm<FormData>({
    defaultValues: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: ''
    }
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
      methods.setValue(fieldId as keyof typeof formData, value, {
        shouldValidate: true,
        shouldDirty: true
      });
      console.debug('Field changed:', fieldId, 'Value:', value);
      console.debug('FormData:', newData);

      const currentTabData = tabs[activeTab];
      const isValid = currentTabData?.fields?.every((field: any) =>
        field.questions.every((question: any) =>
          useValidateField(question, newData[question.id])
        )
      );

      validateTab(activeTab, isValid);

      const newTabStatus = [...tabStatus];
      if (isValid) {
        newTabStatus[activeTab] = StatusType.Valid;
      } else if (Object.values(newData).some(value => value !== '')) {
        newTabStatus[activeTab] = StatusType.Invalid;
      } else {
        newTabStatus[activeTab] = StatusType.Pending;
      }
      setTabStatus(newTabStatus);
    },
    [formData, activeTab, tabs, validateTab, methods, tabStatus]
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

  const handleSubmitForm = useCallback(async () => {
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
          field.questions.every(
            (question: any) =>
              formData[question.id] !== undefined &&
              formData[question.id] !== ''
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

  const formName = 'Cuestionario';

  console.debug('allTabsValid:', allTabsValid);
  console.debug('isSectionComplete:', isSectionComplete);
  console.debug('isSubmitting:', isSubmitting);

  return (
    <div className="border-2 border-accent borber-opacity-20 rounded-xl p-6 m-4 lg:p-8 lg:m-8 overflow-hidden">
      <Tabs value={tabs[activeTab]?.id || ''}>
        <TabsNavigation
          title=""
          tabs={tabs}
          currentTab={activeTab} // Cambiado de activeTab a currentTab
          setActiveTab={setActiveTab}
          tabStatus={tabStatus}
          hidden={false}
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
                <h2 className="text-xl font-semibold">
                  {tabs[activeTab]?.fields?.[activeSection]?.sectionTitle
                    ? tabs[activeTab]?.fields?.[activeSection]?.sectionTitle
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')
                    : tab.title}
                </h2>
                {tab.title === formName && (
                  <ProgressCircles
                    totalSteps={tab.fields?.length || 0}
                    currentStep={activeSection + 1}
                  />
                )}
              </div>
              <Separator className="boober-1 border-accent" />
              <p className="flex justify-end text-sm text-muted-foreground mt-2">
                Tiempo estimado de respuesta: 15 min.
              </p>
              {tab.title === formName ? (
                <div>
                  <Tabs value={tab.fields?.[activeSection]?.sectionTitle || ''}>
                    <TabsNavigation
                      tabs={
                        tab.fields?.map((field: any, index: number) => ({
                          ...field,
                          id: index.toString(),
                          title: field.sectionTitle || ''
                        })) || []
                      }
                      title=""
                      hidden
                      currentTab={activeSection} // Cambiado de activeTab a currentTab
                      setActiveTab={setActiveSection}
                      tabStatus={tabStatus} // Pass the tabStatus to TabsNavigation
                    />
                    {tab.fields?.map((field: SectionProps, idx: number) => (
                      <TabsContent
                        key={idx}
                        value={field.sectionTitle || ''}
                        forceMount
                        hidden={activeSection !== idx}
                      >
                        <div className="w-full">
                          <FormProvider {...methods}>
                            <form
                              onSubmit={methods.handleSubmit(handleSubmitForm)}
                              className="space-y-4 p-4 w-full"
                            >
                              <SectionRender
                                section={field as SectionProps}
                                methods={methods}
                                onFieldChange={handleFieldChange}
                              />
                            </form>
                          </FormProvider>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-6">
                  <span className="text-2xl font-bold text-primary">
                    {tabs[activeTab]?.fields?.[activeSection]?.sectionTitle}
                  </span>
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
                {!(activeTab === 0 && activeSection === 0) && (
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('prev')}
                    disabled={
                      (activeTab === 0 && activeSection === 0) ||
                      !isSectionComplete
                    }
                  >
                    Anterior
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  {!isLastStep ? (
                    <Button
                      onClick={() => handleNavigation('next')}
                      disabled={!isSectionComplete}
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
        onConfirm={handleSubmitForm}
        onCancel={handleCancel}
      />
      <DialogSuccess open={showSuccess} onClose={handleSuccessClose} />
    </div>
  );
};
