'use client';
import { Input, Button, Tabs, TabsContent } from '@/components/ui';
import { TabConfig } from '../TabType/TabType';
import { useFormSubmission, useTabNavigation, useTabsState } from '@/hooks';
import { TabsNavigation } from '../TabsNavigation/TabsNavigation';
import { PhonePrefixInput } from '../PhonePrefixInput/PhonePrefixInput';
import { useRouter } from 'next/navigation';
import { DialogConfirmation } from '../DialogConfirmation/DialogConfirmation';
import { DialogSuccess } from '../DialogSuccess/DialogSuccess';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const FormTabs = ({ tabs: initialTabs = [] }: { tabs: TabConfig[] }) => {
  const router = useRouter();
  const {
    activeTab,
    tabsState,
    setActiveTab,
    setTabsState,
    clearTabState,
    isLoading
  } = useTabsState(initialTabs);

  const { isLastTab, updateTabsState } = useTabNavigation(
    tabsState,
    setTabsState
  );

  const {
    showConfirmation,
    showSuccess,
    isSubmitting,
    handleFinalize,
    handleConfirm,
    handleCancel,
    handleSuccessClose
  } = useFormSubmission();

  // Cargar estado inicial
  useEffect(() => {
    if (!isLoading && tabsState.length === 0) {
      setTabsState(initialTabs);
    }
  }, [isLoading, initialTabs, tabsState.length, setTabsState]);

  const handleNext = () => {
    if (!isLastTab(activeTab)) {
      const newActive = activeTab + 1;
      updateTabsState(newActive, 'forward');
      setActiveTab(newActive);
    } else {
      setTabsState(prev =>
        prev.map((tab, index) =>
          index === activeTab ? { ...tab, completed: true } : tab
        )
      );
      handleFinalize();
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      const newActive = activeTab - 1;
      setTabsState(prev =>
        prev.map((tab, index) =>
          index === activeTab ? { ...tab, completed: false } : tab
        )
      );
      updateTabsState(newActive, 'backward');
      setActiveTab(newActive);
    }
  };

  const handleCancelConfirmation = () => {
    handleCancel();
    setTabsState(prev =>
      prev.map((tab, index) =>
        index === prev.length - 1 ? { ...tab, completed: false } : tab
      )
    );
  };

  const resetForm = () => {
    clearTabState();
    handleSuccessClose();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="border-2 border-border rounded-xl p-6 m-4 lg:p-8 lg:m-8 relative overflow-hidden">
      <DialogConfirmation
        open={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirmation}
        disabled={isSubmitting}
      />

      <DialogSuccess open={showSuccess} onClose={resetForm} />

      <Tabs
        value={tabsState[activeTab]?.id}
        className="relative"
        activationMode="manual"
      >
        <TabsNavigation
          tabsState={tabsState}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {tabsState.map((tab, index) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            forceMount
            hidden={activeTab !== index}
            className="focus-visible:outline-none"
          >
            <div className="space-y-4 p-4">
              <h2 className="text-xl font-semibold pb-2 border-b-2 border-primary w-fit">
                {tab.title}
              </h2>

              <div className="space-y-6">
                {tab.fields.includes('telefono') && <PhonePrefixInput />}
                {tab.fields.includes('nombre') && (
                  <Input
                    placeholder="Nombre completo"
                    className="bg-background"
                  />
                )}
                {tab.fields.includes('email') && (
                  <Input
                    placeholder="Correo electrónico"
                    type="email"
                    className="bg-background"
                  />
                )}
                {tab.fields.includes('direccion') && (
                  <Input
                    placeholder="Dirección completa"
                    className="bg-background"
                  />
                )}
              </div>

              <div className="flex justify-between mt-8 gap-4">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={activeTab === 0}
                  className="gap-1"
                >
                  ← Volver
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="gap-1"
                >
                  {isLastTab(activeTab) ? (
                    <>
                      {isSubmitting && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Finalizar
                    </>
                  ) : (
                    'Continuar →'
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
