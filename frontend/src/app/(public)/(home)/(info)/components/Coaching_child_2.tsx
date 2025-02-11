"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

const paginas = [
  {
    "id": 1,
    "url": "/empresas/coaching",
    "descripcion": "Empoderarte como líder, potenciando tu capacidad de influir positivamente en tu entorno, tomar decisiones estratégicas, motivar a quienes te rodean y desarrollar al mismo tiempo esas capacidades en tu equipo. Buscamos que adquieras herramientas prácticas para convertirte en un referente de comunicación asertiva y liderazgo sólido, impulsando tanto tu crecimiento como el de las personas que forman parte de tu entorno.",
    "img": "/img/coaching-empresas.webp"
  },
  {
    "id": 2,
    "url": "/emprendedores/coaching",
    "descripcion": "Acompañarte en el desarrollo de una comunicación asertiva y un liderazgo auténtico que no solo fortalezcan tu capacidad de influir y tomar decisiones, sino que también generen un impacto positivo en tu entorno profesional. Nuestro enfoque se centra en alinear tus objetivos personales con los organizacionales, asegurando que tu mensaje sea claro, efectivo y que tu liderazgo inspire a otros a alcanzar el éxito colectivo.",
    "img": "/img/coaching-emprendedores.webp"
  },
  {
    "id": 3,
    "url": "/empresas/talento",
    "descripcion": "Brindar apoyo a las organizaciones, a través de prácticas controladas y guiadas, para identificar y seleccionar talentos que no solo cumplan con los requisitos técnicos del puesto, sino que también se alineen con la cultura de la empresa, integren valores compartidos y aporten habilidades blandas esenciales para fomentar la colaboración, fortalecer los equipos y contribuir al éxito colectivo de manera sostenible duradera en el tiempo.",
    "img": "/img/talento-empresas.webp"
  },
  {
    "id": 4,
    "url": "/emprendedores/mvp",
    "descripcion": "Acompañarte en el desarrollo de una comunicación asertiva y un liderazgo auténtico que no solo fortalezcan tu capacidad de influir y tomar decisiones, sino que también generen un impacto positivo en tu entorno profesional. Nuestro enfoque se centra en alinear tus objetivos personales con los organizacionales, asegurando que tu mensaje sea claro, efectivo y que tu liderazgo inspire a otros a alcanzar el éxito colectivo.",
    "img": "/img/mvp-emprendedores.webp"
  },
]

export default function Coaching_child_2() {
    const pathname = usePathname(); // Obtiene la URL actual
  
    const paginaActual = paginas.find((t) => t.url === pathname);
  
    if (!paginaActual) return null;
  return (
    <div>
            <div className={`grid grid-cols-3 gap-0 w-full overflow-hidden my-6 ${paginaActual.id === 3 || paginaActual.id === 4 ? 'text-white' : 'text-deepblue'}`}>
        <div className={`col-span-2 bg-gradient-to-r w-full px-24 py-14 space-y-2 ${paginaActual.id === 3 || paginaActual.id === 4 ? 'from-deepblue to-magentacustom' : 'from-lavender to-aqua'}`}>
          <h2 className='text-5xl/[106px] font-extrabold'>Nuestro objetivo</h2>
          <p className='text-2xl/10 font-normal'>
          {paginaActual.descripcion}
          </p>
        </div>
        <div className='col-span-1'>
          <Image
            src={paginaActual.img}
            alt="Coaching"
            width={525}
            height={430}
            className="w-full h-full object-cover"
            />
      </div>
      </div>
    </div>
  )
}
