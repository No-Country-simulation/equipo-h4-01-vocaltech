import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FormData {
  businessName: string;
  location: string;
  sector: string;
  yearsInMarket: string;
  employeeCount: string;
  additionalInfo: string;
  audioUrl: string | null;
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  setAudioUrl: (url: string | null) => void;
  resetForm: () => void;
}

const initialState: FormData = {
  businessName: '',
  location: '',
  sector: '',
  yearsInMarket: '',
  employeeCount: '',
  additionalInfo: '',
  audioUrl: null
};

export const useFormStore = create<FormStore>()(
  persist(
    set => ({
      formData: initialState,
      setFormData: (data: Partial<FormData>) =>
        set(state => ({
          ...state,
          formData: { ...state.formData, ...data }
        })),
      setAudioUrl: (url: string | null) =>
        set(state => ({
          ...state,
          formData: { ...state.formData, audioUrl: url }
        })),
      resetForm: () =>
        set(state => ({
          ...state,
          formData: initialState
        }))
    }),
    {
      name: 'business-form-storage'
    }
  )
);
