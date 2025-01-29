import { TabConfig } from '../TabType/TabType';

export const initialTabs: TabConfig[] = [
  {
    id: 'Mi emprendimiento',
    title: 'Mi emprendimiento',
    fields: [
      {
        questions: [
          {
            id: 'email',
            label: 'Correo Electrónico',
            type: 'text',
            validation: { required: true }
          },
          {
            id: 'phone',
            label: 'Número de Teléfono',
            type: 'text',
            validation: { required: true }
          },
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
              {
                value: '1',
                label: 'Si, tengo una idea que me gustaría validar.'
              },
              { value: '2', label: 'No, pero quiero conocer de se trata.' },
              {
                value: '3',
                label: 'Actualmente no, pero me interesa para un futuro.'
              },
              { value: '4', label: 'No, no es un proyecto que tenga en mente.' }
            ],
            validation: { required: true }
          }
        ]
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
        secctionTitle: 'Sección 1',
        questions: [
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
        ]
      },
      {
        secctionTitle: 'Sección 2',
        questions: [
          {
            id: 'recommend',
            label: '¿Recomendarías nuestros servicios?',
            type: 'radio',
            options: [
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' }
            ],
            validation: { required: true }
          },
          {
            id: 'reason',
            label: '¿Por qué?',
            type: 'text',
            validation: { required: true }
          }
        ]
      },
      {
        secctionTitle: 'Sección 3',
        questions: [
          {
            id: 'improvements',
            label: '¿Qué mejorarías de nuestros servicios?',
            type: 'textarea',
            placeholder: 'Escribe tus comentarios aquí...',
            validation: { required: true }
          }
        ]
      },
      {
        secctionTitle: 'Sección 4',
        questions: [
          {
            id: 'contact',
            label: '¿Te gustaría que te contactemos?',
            type: 'checkbox',
            options: [
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' }
            ],
            validation: { required: true }
          }
        ]
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
        secctionTitle: 'Confirmación',
        questions: [
          {
            id: 'terms',
            label: 'Acepto los términos y condiciones',
            type: 'checkbox',
            options: [
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' }
            ],
            validation: { required: true }
          }
        ]
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
        secctionTitle: 'Éxito',
        questions: [
          {
            id: 'success',
            label: '¡Gracias por completar el formulario!',
            type: 'yesno',
            validation: { required: true }
          }
        ]
      }
    ],
    completed: false,
    disabled: true,
    status: 'disabled'
  }
];
