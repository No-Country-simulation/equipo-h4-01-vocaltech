import { Suspense } from 'react';
import { FormTabs } from '../FormTabs/FormTabs';
import { LoadingSkeleton } from '../../LoadingSkeleton/LoadingSkeleton';

export const FormContainer = () => {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <FormTabs />
      </Suspense>
    </div>
  );
};
