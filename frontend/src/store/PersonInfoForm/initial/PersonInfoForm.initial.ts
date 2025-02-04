import { PersonInfoFormState } from '@/store';

export const PersonInfoFormInitial: PersonInfoFormState = {
  personInfo: {
    avatar: '',
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    pais: '',
    provincia: '',
    ciudad: '',
    codigoPais: '',
    telefono: '',
    referencia: ''
  }
};
