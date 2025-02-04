import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { PersonInfoFormInterface } from '@/interface';
import { immer } from 'zustand/middleware/immer';
import {
  PersonInfoFormState,
  PersonInfoFormAction,
  PersonInfoFormInitial
} from '@/store/PersonInfoForm';
import { customLocalStorage } from '@/store/storage';

export type PersonInfoFormType = PersonInfoFormState & PersonInfoFormAction;

const PersonInfoFormApi: StateCreator<
  PersonInfoFormType,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never]
  ]
> = (set, get) => ({
  personInfo: PersonInfoFormInitial.personInfo,
  setPersonInfo: (personInfo: PersonInfoFormInterface) =>
    set(() => ({ personInfo })),
  clearPersonInfo: () => set(() => ({ personInfo: undefined })),
  getPersonInfo: () => get().personInfo
});

export const usePersonInfoFormStore = create<PersonInfoFormType>()(
  devtools(
    persist(immer(PersonInfoFormApi), {
      name: 'personInfoForm',
      storage: customLocalStorage
    })
  )
);
