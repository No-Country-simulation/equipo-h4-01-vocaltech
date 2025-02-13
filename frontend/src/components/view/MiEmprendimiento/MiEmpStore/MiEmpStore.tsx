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
  audioFileName: string | null;
  audioDuration: number | null;
  audioType: string | null;
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  setAudioUrl: (url: string | null) => void;
  setAudioFileName: (fileName: string | null) => void;
  setAudioDuration: (duration: number | null) => void;
  setAudioType: (type: string | null) => void;
  resetAudio: () => void;
  resetForm: () => void;
}

const initialState: FormData = {
  businessName: '',
  location: '',
  sector: '',
  yearsInMarket: '',
  employeeCount: '',
  additionalInfo: '',
  audioUrl: null,
  audioFileName: null,
  audioDuration: null,
  audioType: null
};

export const useFormStore = create<FormStore>()(
  persist(
    set => ({
      formData: initialState,
      setFormData: data =>
        set(state => ({
          formData: { ...state.formData, ...data }
        })),
      setAudioUrl: url =>
        set(state => ({
          formData: { ...state.formData, audioUrl: url }
        })),
      setAudioFileName: fileName =>
        set(state => ({
          formData: { ...state.formData, audioFileName: fileName }
        })),
      setAudioDuration: duration =>
        set(state => ({
          formData: { ...state.formData, audioDuration: duration }
        })),
      setAudioType: type =>
        set(state => ({
          formData: { ...state.formData, audioType: type }
        })),
      resetAudio: () =>
        set(state => ({
          formData: {
            ...state.formData,
            audioUrl: null,
            audioFileName: null,
            audioDuration: null,
            audioType: null
          }
        })),
      resetForm: () => set({ formData: initialState })
    }),
    {
      name: 'mi-empremdimiento-storage'
    }
  )
);
