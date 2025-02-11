"use client"

import { X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const paginas = [
  {
    "id": 1,
    "url": "/empresas/coaching",
    "servicio": "Servicio: Coaching de comunicación y liderazgo para equipos de trabajo",
    "titulo": "Conectamos voces, \nfortalecemos equipos.",
    "descripcion": "Diseñado para ayudarte a desarrollar una comunicación efectiva que no solo conecte con tu equipo y clientes, sino que también fortalezca tu liderazgo. A través de estrategias personalizadas, te guiamos para transmitir tus ideas con claridad, gestionar conflictos y construir relaciones de confianza que impulsen el éxito de \ntu organización."
  },
  {
    "id": 2,
    "url": "/emprendedores/coaching",
    "servicio": "Servicio: Coaching de Comunicación y Liderazgo Interno y Externo",
    "titulo": "Le ponemos \nvoz a tus ideas!",
    "descripcion": "Diseñado para potenciar tus habilidades de liderazgo y comunicación, creando una base sólida que te permita inspirar confianza, atraer clientes y construir relaciones profesionales duraderas. Nos enfocamos en encontrar y desarrollar tu voz, para que puedas desplegar tu potencial, realizar alianzas de equipo e impulsar el crecimiento de tu negocio."
  },
  {
    "id": 3,
    "url": "/empresas/talento",
    "servicio": "Servicio: Búsqueda y selección de talento a partir de simulaciones laborales",
    "titulo": "Talento real, \nprobado en acción!",
    "descripcion": "Enfocado en identificar y seleccionar el talento ideal para tu empresa a través de simulaciones laborales. En estas actividades, los participantes desarrollan proyectos que no solo evalúan su dominio técnico, sino también su capacidad para aplicar herramientas y metodologías, fortaleciendo sus habilidades blandas como liderazgo, trabajo en equipo y resolución de problemas."
  },
  {
    "id": 4,
    "url": "/emprendedores/mvp",
    "servicio": "Servicio: Desarrollo de MVP de Alta Fidelidad en Cinco Semanas",
    "titulo": "Transforma tu idea en \nrealidad en 5 semanas!",
    "descripcion": "Diseñado para transformar tus ideas en un producto mínimo viable (MVP) funcional y atractivo. En un plazo de cinco semanas, convertimos tu visión en prototipos de alta fidelidad que integran funcionalidades clave, brindan una experiencia de usuario excepcional y están listos para ser probados en el mercado o presentados a inversores."
  },
]

export default function Coaching_child_1() {
  const pathname = usePathname(); // Obtiene la URL actual
  const router = useRouter(); // Obtiene el router

  const paginaActual = paginas.find((t) => t.url === pathname);
  if (!paginaActual) return null;

    // Función para reemplazar `\n` por `<br />`
    const formatText = (text: string) =>
      text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));

  return (
    <>
        <div className={`flex border-b-2 justify-between items-center ${paginaActual.id === 3 || paginaActual.id === 4 ? 'border-magentacustom' : 'border-lavender'}`}>
          <h3 className='text-2xl/10 font-normal my-8'>
            {paginaActual.servicio}
          </h3>
          <div className='flex items-center'>
          <button onClick={() => router.back()} aria-label="Volver">
              <X className='ml-2' />
            </button>
          </div>
        </div>
        <div>
          <h1 className={`text-8xl/[110%] font-black py-8 ${paginaActual.id === 3 || paginaActual.id === 4 ? 'text-magentacustom' : 'text-lavender'}`}>
            {formatText(paginaActual.titulo)}
          </h1>
          <p className='text-3xl/10 font-bold text-deepblue'>
            {formatText(paginaActual.descripcion)}
          </p>
        </div>
        </>
  )
}
