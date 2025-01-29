import { TabConfig } from '../TabType/TabType';

export const initialTabs: TabConfig[] = [
  {
    id: 'Mi emprendimiento',
    title: 'Mi emprendimiento',
    fields: [
      {
        questions: [
          {
            id: 'businessName',
            label: 'Nombre del emprendimiento',
            type: 'text',
            validation: { required: true }
          },
          {
            id: 'location',
            label: 'Ubicación',
            type: 'text',
            validation: { required: true }
          },
          {
            id: 'sector',
            label: 'Sector al que pertenece',
            type: 'text',
            validation: { required: true }
          },
          {
            id: 'yearsInMarket',
            label: 'Años en el mercado',
            type: 'number',
            validation: { required: true }
          },
          {
            id: 'employeeCount',
            label: 'Cantidad de empleados',
            type: 'number',
            validation: { required: true }
          },
          {
            id: 'additionalInfo',
            label: 'Contanos un poco más sobre el emprendimiento',
            type: 'textarea',
            validation: { required: true, maxLength: 1000 }
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
