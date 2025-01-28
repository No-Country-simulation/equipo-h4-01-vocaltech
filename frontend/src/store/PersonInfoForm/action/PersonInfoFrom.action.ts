import { PersonInfoFormInterface } from '@/interface';

export type PersonInfoFormAction = {
  setPersonInfo: (personInfo: PersonInfoFormInterface) => void;
  clearPersonInfo: () => void;
  getPersonInfo: () => PersonInfoFormInterface | undefined;
};
