export const mockDataMiEmp = {
  fields: {
    businessName: {
      label: 'Nombre del emprendimiento',
      required: true,
      type: 'text'
    },
    location: {
      label: 'Ubicación',
      required: true,
      type: 'text'
    },
    sector: {
      label: 'Sector al que pertenece',
      required: true,
      type: 'text'
    },
    yearsInMarket: {
      label: 'Años en el mercado',
      required: true,
      type: 'number'
    },
    employeeCount: {
      label: 'Cantidad de empleados',
      required: true,
      type: 'number'
    },
    additionalInfo: {
      label: 'Contanos un poco más sobre el emprendimiento',
      required: true,
      type: 'textarea',
      maxLength: 1000
    }
  },
  initialValues: {
    businessName: '',
    location: '',
    sector: '',
    yearsInMarket: '',
    employeeCount: '',
    additionalInfo: ''
  }
};
