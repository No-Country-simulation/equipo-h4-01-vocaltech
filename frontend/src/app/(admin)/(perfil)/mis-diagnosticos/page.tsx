import React from 'react';
import { Eye, Check, X } from 'lucide-react';

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  const diagnostics = [
    {
      id: 1,
      date: '04/09/23 19:22 hs.',
      name: 'Diagnóstico "Altavia"',
      steps: [
        { name: 'Formulario completado', status: 'complete' },
        { name: 'Diagnóstico obtenido', status: 'complete' },
        { name: 'Cita agendada', status: 'complete' },
        { name: 'Reunión concretada', status: 'complete', date: '21/12/23' }
      ]
    },
    {
      id: 2,
      date: '13/01/25 19:22 hs.',
      name: 'Diagnóstico "Altavia"',
      steps: [
        { name: 'Formulario completado', status: 'complete' },
        { name: 'Diagnóstico obtenido', status: 'complete' },
        { name: 'Cita agendada', status: 'incomplete' },
        { name: 'Reunión concretada', status: 'incomplete' }
      ]
    }
  ];

  return (
        <div className="col-span-9 text-deepblue">
          {diagnostics.map((diagnostic) => (
            <div key={diagnostic.id} className="mb-6 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-base/10 mb-1">{diagnostic.date}</p>
                  <h2 className="text-3xl/10 font-bold">{diagnostic.name}</h2>
                </div>
                <button className="bg-aqua px-4 py-2 rounded flex items-center gap-2 hover:bg-lavender">
                  <Eye className="w-4 h-4" />
                  Ver diagnóstico
                </button>
              </div>

              <div className="flex items-center">
                {diagnostic.steps.map((step, index) => (
                  <React.Fragment key={step.name}>
                    <div className="flex flex-col items-center flex-1 font-medium text-base">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                        ${step.status === 'complete' ? 'bg-deepblue text-white' : 'bg-red-200'}`}>
                        {step.status === 'complete' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-center">{step.name}</p>
                      {step.date && (
                        <p className="mt-1">{step.date}</p>
                      )}
                    </div>
                    {index < diagnostic.steps.length - 1 && (
                      <div className={`h-0.5 flex-1 mt-4 
                        ${step.status === 'complete' && diagnostic.steps[index + 1].status === 'complete' 
                          ? 'bg-deepblue' 
                          : 'bg-gray-200'}`} 
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

<button className="
        text-2xl
        rounded-lg 
        font-bold 
        bg-aqua 
        hover:bg-white 
        border-aqua border-2 
        text-deepblue 
        w-1/2
        p-[1/4]
        m-[5%]
        ">
            Quiero obtener mi diagnóstico
          </button>
        </div>
  );
};