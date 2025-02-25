"use client"

import { Plus } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const pageData = [
  {
    id: 1,
    url: "/empresas",
    title1: "Coaching de comunicación y liderazgo para equipos de trabajo",
    btn1: "/empresas/coaching",
    title2: "Búsqueda y selección de talento a partir de simulaciones laborales",
    btn2: "/empresas/talento",
    descripcion1: "Este curso se centra en el poder de la voz como herramienta clave para liderar y comunicar con impacto. Ideal para trabajar con equipos que busquen mejorar la expresión verbal, potenciar su liderazgo y construir relaciones más efectivas dentro de los diferentes grupos de trabajo.",
    descripcion2: "En las simulaciones laborales. Los participantes participan de proyectos en donde profundizan el uso de herramientas y metodologías, pero  más allá de eso, incorporan o en todo caso fortalecen las “habilidades blandas”. De esta manera se identifican talentos que encajen con el puesto.",
  },
  {
    id: 2,
    url: "/emprendedores",
    title1: "Coaching de comunicación y liderazgo interno y externo",
    btn1: "/emprendedores/coaching",
    title2: "Desarrollo de MVP de alta fidelidad en un período de cinco semanas",
    btn2: "/emprendedores/mvp",
    descripcion1: "Este servicio trata de desarrollar una comunicación efectiva que inspire confianza en tu equipo, atraiga clientes y fortalezca tus relaciones profesionales. Trabajamos en el desarrollo de tu liderazgo, guiándote a tomar decisiones clave, gestionar conflictos y motivar a tu equipo hacia el éxito.",
    descripcion2: "Transforma tus ideas en soluciones funcionales y atractivas. Desde la conceptualización hasta la implementación, te presentamos diversos prototipos que reflejan tu visión, integra varias funcionalidades clave y ofrece una experiencia de usuario excepcional y personalizada.",
  }]

export default function ServicioEspecial() {
  const pathname = usePathname();

  const dataActual = pageData.find((t) => t.url === pathname);
  if (!dataActual) return null;

  return (
    <div>
            <div className='grid grid-cols-2 gap-4 p-16 text-deepblue'>
      <div className='col border-2 border-deepblue'>
        <div className='bg-lightlavender p-8'>
          <p className='text-3xl/6 font-normal text-center'>Servicio especial para vos</p>
        </div>
        <div className='p-8'>
          <h2 className='text-3xl/10 font-bold'>{dataActual.title1}</h2>
          <p className='py-8 text-2xl/10'>{dataActual.descripcion1}</p>
          <Link href={`${dataActual.btn1}`}>
          <button className="border-2 border-aqua flex items-center justify-center gap-2 text-xl font-normal py-4 px-16 w-1/2 mx-auto">
            Conocé más <Plus />
          </button>
          </Link>

        </div>
      </div>
      <div className='col border-2 border-deepblue'>
        <div className='bg-lightlavender p-8'>
          <p className='text-3xl/6 font-normal text-center'>Servicio especial para vos</p>
        </div>
        <div className='p-8'>
          <h2 className='text-3xl/10 font-bold'>{dataActual.title2}</h2>
          <p className='py-8 text-deepblue text-2xl/10'>{dataActual.descripcion2}</p>
          <Link href={`${dataActual.btn2}`}>
          <button className="border-2 border-aqua flex items-center justify-center gap-2 text-xl font-normal py-4 px-16 w-1/2 mx-auto">
            Conocé más <Plus />
          </button>
          </Link>
        </div>
      </div>

    </div>
    </div>
  )
}
