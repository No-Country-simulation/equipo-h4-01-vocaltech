import { TabConfig } from '../TabType/TabType';

export const initialTabs: TabConfig[] = [
  {
    id: 'personal-info',
    title: 'Información Personal',
    fields: [
      {
        id: 'fullname',
        label: 'Nombre Completo',
        type: 'text',
        validation: { required: true, minLength: 3 }
      },
      {
        id: 'preferences',
        label: 'Preferencias de Contacto',
        type: 'checkbox',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'whatsapp', label: 'WhatsApp' }
        ],
        validation: { required: true }
      },
      {
        id: '1',
        label:
          '¿Tenes una idea que querés transformar en un producto digital funcional?',
        type: 'radio',
        options: [
          { value: '1', label: 'Si, tengo una idea que me gustaría validar.' },
          { value: '2', label: 'No, pero quiero conocer de se trata.' },
          {
            value: '3',
            label: 'Actualmente no, pero me interesa para un futuro.'
          },
          { value: '4', label: 'No, no es un proyecto que tenga en mente.' }
        ],
        validation: { required: true }
      }
    ],
    completed: false,
    disabled: false,
    status: 'pending'
  },
  {
    id: 'survey',
    title: 'Encuesta',
    fields: [
      {
        id: 'satisfaction',
        label: 'Nivel de Satisfacción',
        type: 'rating',
        validation: { required: true }
      },
      {
        id: 'comments',
        label: 'Comentarios Adicionales',
        type: 'textarea',
        placeholder: 'Escribe tus comentarios aquí...',
        validation: { required: true }
      }
    ],
    completed: false,
    disabled: true,
    status: 'disabled'
  },
  {
    id: 'confirmation',
    title: 'Confirmación',
    fields: [
      {
        id: 'confirm',
        label: 'Confirmar',
        type: 'checkbox',
        options: [
          {
            value: 'confirm',
            label: 'Confirmo que la información es correcta.'
          }
        ],
        validation: { required: true }
      }
    ],
    completed: false,
    disabled: true,
    status: 'disabled'
  },
  {
    id: 'success',
    title: 'Éxito',
    fields: [
      {
        id: 'success',
        type: 'yesno',
        label: '¡Gracias por completar el formulario!',
        validation: { required: true }
      }
    ],
    completed: false,
    disabled: true,
    status: 'disabled'
  }
];
