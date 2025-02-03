export const DaPerDataMock = [
  {
    id: 'Datos Personales',
    title: 'Datos Personales',
    content: [
      {
        id: 'Datos Personales',
        title: 'Datos Personales',
        type: 'form',
        value: [
          {
            id: 'photo',
            type: 'photo',
            text: 'Cargar foto',
            required: false
          },
          {
            id: 'name',
            text: 'Nombre del emprendimiento',
            type: 'text',
            required: true
          },
          {
            id: 'lastName',
            text: 'Apellido',
            type: 'text',
            required: true
          },
          {
            id: 'email',
            text: 'Email',
            type: 'email',
            required: true
          },
          {
            id: 'birthdate',
            text: 'Fecha de nacimiento',
            type: 'date',
            required: true
          },
          {
            id: 'country',
            text: 'Pais',
            type: 'select',
            options: [
              { value: 1, text: 'Argentina' },
              { value: 2, text: 'Uruguay' },
              { value: 3, text: 'Chile' },
              { value: 4, text: 'Brasil' },
              { value: 5, text: 'Paraguay' }
            ],
            required: true
          },
          {
            id: 'province',
            text: 'Provincia',
            type: 'select',
            options: [
              { value: 1, text: 'Buenos Aires' },
              { value: 2, text: 'Córdoba' },
              { value: 3, text: 'Santa Fe' },
              { value: 4, text: 'Mendoza' },
              { value: 5, text: 'Entre Ríos' }
            ],
            required: true
          },
          {
            id: 'city',
            text: 'Ciudad',
            type: 'Select',
            options: [
              { value: 1, text: 'CABA' },
              { value: 2, text: 'La Plata' },
              { value: 3, text: 'Mar del Plata' },
              { value: 4, text: 'Rosario' },
              { value: 5, text: 'Córdoba' }
            ],
            required: true
          },
          {
            id: 'prefix',
            text: 'Prefijo',
            type: 'select',
            options: [
              { value: 1, text: '+54' },
              { value: 2, text: '+598' },
              { value: 3, text: '+56' },
              { value: 4, text: '+55' },
              { value: 5, text: '+595' }
            ],
            required: true
          },
          {
            id: 'phone',
            text: 'Teléfono',
            type: 'text',
            required: true
          },
          {
            id: 'role',
            text: 'Rol dentro del emprendimiento',
            type: 'select',
            options: [
              { value: 1, text: 'Dueño' },
              { value: 2, text: 'Socio' },
              { value: 3, text: 'Gerente' },
              { value: 4, text: 'Empleado' },
              { value: 5, text: 'Otro' }
            ],
            required: true
          }
        ]
      }
    ],
    completed: false,
    disabled: false,
    status: 'pending'
  }
];
