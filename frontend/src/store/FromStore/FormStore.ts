import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FormState {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>()(
  devtools(
    persist(
      set => ({
        formData: {},
        setFormData: data => set({ formData: data }),
        resetForm: () => set({ formData: {} })
      }),
      {
        name: 'form-storage'
      }
    )
  )
);
