"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
const paginas = [
  {
    "id": 1,
    "url": "/empresas/coaching",
    "pasos": [
      {
        "id": 1,
        "titulo": "1. Diagnóstico inicial",
        "descripcion": "Analizamos tus habilidades actuales de comunicación y liderazgo, identificando áreas de mejora y objetivos clave.",
      },
      {
        "id": 2,
        "titulo": "2. Desarrollo de Estrategias",
        "descripcion": "Diseñamos un plan personalizado con técnicas específicas para mejorar tu comunicación verbal, no verbal y emocional.",
      },
      {
        "id": 3,
        "titulo": "3. Entrenamiento Práctico",
        "descripcion": "Implementamos simulaciones, ejercicios y casos reales para perfeccionar tus habilidades en situaciones profesionales.",
      },
      {
        "id": 4,
        "titulo": "4. Gestión de Liderazgo",
        "descripcion": "Trabajamos en tu capacidad para tomar decisiones, resolver conflictos y motivar equipos con una visión clara.",
      },
      {
        "id": 5,
        "titulo": "5. Seguimiento y Feedback",
        "descripcion": "Evaluamos tus avances y ajustamos el enfoque según tus necesidades y logros alcanzados.",
      }
    ]
  },
  {
    "id": 2,
    "url": "/emprendedores/coaching",
    "pasos": [
      {
        "id": 1,
        "titulo": "1. Diagnóstico Inicial",
        "descripcion": "Evaluamos tus habilidades actuales, identificamos desafíos específicos y definimos metas claras.",
      },
      {
        "id": 2,
        "titulo": "2. Desarrollo de Comunicación Asertiva",
        "descripcion": "Trabajamos en técnicas para transmitir mensajes claros, empáticos y efectivos en diferentes contextos.",
      },
      {
        "id": 3,
        "titulo": "3. Liderazgo Estratégico",
        "descripcion": "Diseñamos estrategias para fortalecer tu capacidad de influir, tomar decisiones clave y motivar a tu equipo.",
      },
      {
        "id": 4,
        "titulo": "4. Liderazgo Estratégico",
        "descripcion": "Diseñamos estrategias para fortalecer tu capacidad de influir, tomar decisiones clave y motivar a tu equipo.",
      },
      {
        "id": 5,
        "titulo": "5. Seguimiento y Mejora Continua",
        "descripcion": "Medimos avances, ajustamos estrategias y aseguramos la sostenibilidad de los resultados.",
      }
    ]
  },
  {
    "id": 3,
    "url": "/empresas/talento",
    "pasos": [
      {
        "id": 1,
        "titulo": "1. Definición del Perfil de Talento",
        "descripcion": "Trabajamos contigo para comprender las necesidades del puesto y las competencias específicas requeridas.",
      },
      {
        "id": 2,
        "titulo": "2. Diseño de Simulaciones",
        "descripcion": "Creamos escenarios laborales adaptados a la posición, incluyendo desafíos prácticos y evaluaciones de soft skills.",
      },
      {
        "id": 3,
        "titulo": "3. Implementación de Simulaciones",
        "descripcion": "Los participantes se enfrentan a proyectos reales o simulados que evalúan habilidades duras y blandas.",
      },
      {
        "id": 4,
        "titulo": "4. Evaluación final",
        "descripcion": "Analizamos los resultados de las simulaciones con un enfoque integral y de alineación con los valores de tu organización.",
      },
      {
        "id": 5,
        "titulo": "5. Selección del Talento Ideal",
        "descripcion": "Presentamos a los candidatos que cumplen con los criterios definidos y que demuestran un potencial sobresaliente.",
      }
    ]
  },
  {
    "id": 4,
    "url": "/emprendedores/mvp",
    "pasos": [
      {
        "id": 1,
        "titulo": "1. Diagnóstico Inicial",
        "descripcion": "Para comprender tus necesidades, objetivos, público pertinente e identificación de la precisión del servicio.",
      },
      {
        "id": 2,
        "titulo": "2. Definición del Concepto",
        "descripcion": "Desarrollo de un plan detallado para un desarrollo del MVP que contemple el tiempo estimado.",
      },
      {
        "id": 3,
        "titulo": "3. Armado de equipos competidores",
        "descripcion": "La empresa se encarga de convocar a equipos destacados para competir en el proyecto de MVP.",
      },
      {
        "id": 4,
        "titulo": "4. Reunión inicial con equipos",
        "descripcion": "Se realiza una reunión de Kick Off donde se resuelven dudas y se presenta el proyecto a los equipos.",
      },
      {
        "id": 5,
        "titulo": "5. Selección de proyecto ganador",
        "descripcion": "Se realiza una preselección y luego se elige al proyecto que más se identifique con lo buscado por el cliente.",
      }
    ]
  },
]

export default function Coaching_child_3() {
  const pathname = usePathname(); // Obtiene la URL actual

  const paginaActual = paginas.find((t) => t.url === pathname);

  if (!paginaActual) return null;
  return (
    <div>
        <h2 className="text-5xl/[106px] font-extrabold">Nuestra metodología</h2>
        <div className="mt-4 relative text-2xl/10">
          {/* Línea vertical con gradiente */}
          <div className={`absolute top-6 bottom-0 w-2 bg-gradient-to-b ${paginaActual.id === 3 || paginaActual.id === 4 ? 'from-deepblue to-magentacustom' : 'from-lavender to-aqua'}`}/>
            {/* Pasos */}
            {paginaActual.pasos.map((paso) => (
              <div className="relative flex items-start pb-6 pl-14 space-y-4" key={paso.id}>
                <div className={`absolute -left-3 top-6 z-10 flex items-center justify-center w-8 h-8 rounded-full border-8 ${paginaActual.id === 3 || paginaActual.id === 4 ? 'bg-deepblue border-deepblue' : 'bg-lavender border-lavender'}`} />
                <div>
                  <h3 className="font-bold text-deepblue">{paso.titulo}</h3>
                  <p className="font-normal">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
  )
}
