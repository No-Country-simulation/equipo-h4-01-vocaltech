import { TabConfig } from '../TabType/TabType';

export const initialTabs: TabConfig[] = [
  {
    id: 'Mi emprendimiento',
    title: 'Mi emprendimiento',
    fields: [
      {
        questions: [
          {
            id: 'Nombre del emprendimiento',
            text: 'Nombre del emprendimiento',
            type: 'text',
            options: [{ value: 'null', text: 'null' }],
            required: true
          },
          {
            id: 'Ubicacion',
            text: 'Ubicación',
            type: 'select',
            options: [
              { value: '1', text: 'Buenos Aires' },
              { value: '2', text: 'Córdoba' },
              { value: '3', text: 'Rosario' },
              { value: '4', text: 'Mendoza' },
              { value: '5', text: 'Otro' }
            ],
            required: true
          },
          {
            id: 'Sector al que pertenece',
            text: 'Sector al que pertenece',
            type: 'select',
            options: [
              { value: '1', text: 'Tecnología' },
              { value: '2', text: 'Comercio' },
              { value: '3', text: 'Servicios' },
              { value: '4', text: 'Industria' },
              { value: '5', text: 'Agricultura' },
              { value: '6', text: 'Otro' }
            ],
            required: true
          },
          {
            id: 'Años en el mercado',
            text: 'Años en el mercado',
            type: 'select',
            options: Array.from({ length: 20 }, (_, i) => ({
              text: `${i + 1} ${i === 0 ? 'año' : 'años'}`,
              value: (i + 1).toString()
            })).concat([{ text: 'Más de 20 años', value: '20+' }]),
            required: true
          },
          {
            id: 'Cantidad de empleados',
            text: 'Cantidad de empleados',
            type: 'select',
            options: [
              { text: '1-5', value: '1-5' },
              { text: '6-20', value: '6-20' },
              { text: '21-50', value: '21-50' },
              { text: '51-100', value: '51-100' },
              { text: 'Más de 100', value: '100+' }
            ],
            required: true
          },
          {
            id: 'Contanos un poco más sobre el emprendimiento',
            text: 'Contanos un poco más sobre el emprendimiento',
            type: 'textarea',
            options: [{ value: 'null', text: 'null' }],
            required: true
          }
        ]
      }
    ],
    completed: false,
    disabled: false,
    status: 'pending'
  },
  {
    id: 'Cuestionario',
    title: 'Cuestionario',
    fields: [
      {
        sectionTitle: 'Cuestionario: comunicacion y liderazgo - p1',
        questions: [
          {
            id: '6',
            text: 'Por eso, te pregunto: ¿Por qué querés entrenar tu voz?',
            type: 'textarea',
            options: [
              {
                text: 'null',
                value: 'null'
              }
            ],
            required: true,
            placeholder: 'Hasta 1000 caracteres'
          }
        ]
      },
      {
        sectionTitle: 'Cuestionario: comunicacion y liderazgo - p2',
        questions: [
          {
            id: '7',
            text: 'Por eso, te pregunto: ¿Por qué querés entrenar tu voz?',
            type: 'textarea',
            options: [
              {
                text: 'null',
                value: 'null'
              }
            ],
            required: true,
            placeholder: 'Hasta 1000 caracteres'
          }
        ]
      }
    ],
    completed: false,
    disabled: false,
    status: 'pending'
  }
];
