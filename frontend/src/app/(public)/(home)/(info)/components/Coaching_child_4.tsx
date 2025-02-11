"use client"

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

const paginas = [
  {
    "id": 1,
    "url": "/empresas/coaching",
    "subtexto": "¡Transformá tu comunicación y liderazgo con nuestro coaching integral y personalizado!",
    "recuadros": [
      {
        "id": 1,
        "img": "/img/coaching-empresas-1.webp",
        "titulo": "Comunicación efectiva",
        "descripcion": "Expresar tus ideas con claridad, confianza y empatía, en entornos más que profesionales.",
      },
      {
        "id": 2,
        "img": "/img/coaching-empresas-2.webp",
        "titulo": "Confianza en el liderazgo",
        "descripcion": "Desarrollar un rol sólido que motive a tu equipo hacia objetivos y metas comunes.",
      },
      {
        "id": 3,
        "img": "/img/coaching-empresas-3.webp",
        "titulo": "Gestión de conflictos",
        "descripcion": "Resolver desacuerdos constructivamente, creando entornos de trabajo colaborativos.",
      },
      {
        "id": 4,
        "img": "/img/coaching-empresas-4.webp",
        "titulo": "Relaciones profesionales",
        "descripcion": "Conectar de manera real con colegas y clientes, potenciando tus vínculos y redes.",
      }
    ]
  },
  {
    "id": 2,
    "url": "/emprendedores/coaching",
    "subtexto": "¡Transforma tu comunicación y liderazgo en herramientas clave para alcanzar tus objetivos profesionales!",
    "recuadros": [
      {
        "id": 1,
        "img": "/img/coaching-emprendedores-1.webp",
        "titulo": "Comunicación efectiva",
        "descripcion": "Expresar tus ideas con claridad, confianza y empatía, en entornos más que profesionales.",
      },
      {
        "id": 2,
        "img": "/img/coaching-emprendedores-2.webp",
        "titulo": "Liderazgo \nsólido",
        "descripcion": "Desarrollar un rol sólido que motive a tu equipo hacia objetivos y metas comunes.",
      },
      {
        "id": 3,
        "img": "/img/coaching-emprendedores-3.webp",
        "titulo": "Confianza \npersonal",
        "descripcion": "Fortalecer tu presencia proyectando motivación y energía positiva en cualquier entorno.",
      },
      {
        "id": 4,
        "img": "/img/coaching-emprendedores-4.webp",
        "titulo": "Relaciones \nsólidas",
        "descripcion": "Conectar de manera real con colegas y clientes, potenciando tus vínculos y redes.",
      }
    ]
  },
  {
    "id": 3,
    "url": "/empresas/talento",
    "subtexto": "Descubrí talentos listos para destacar con nuestro enfoque de simulaciones laborales!",
    "recuadros": [
      {
        "id": 1,
        "img": "/img/talento-empresas-1.webp",
        "titulo": "Talento \ncapacitado",
        "descripcion": "Identificar candidatos con el conocimiento técnico y habilidades prácticas necesarias.",
      },
      {
        "id": 2,
        "img": "/img/talento-empresas-2.webp",
        "titulo": "Refuerzo de habilidades",
        "descripcion": "Incorporar personas con liderazgo, gran comunicación y ganas de trabajar en equipo.",
      },
      {
        "id": 3,
        "img": "/img/talento-empresas-3.webp",
        "titulo": "Procesos \nprecisos",
        "descripcion": "Evaluar el desempeño de los candidatos en contextos similares a los desafíos del puesto.",
      },
      {
        "id": 4,
        "img": "/img/talento-empresas-4.webp",
        "titulo": "Alineación \ncultural",
        "descripcion": "Elegir talentos que compartan los valores y objetivos de tu organización.",
      }
    ]
  },
  {
    "id": 4,
    "url": "/emprendedores/mvp",
    "subtexto": "Volcá tu idea en un producto digital de corta validación e inversión mínima!",
    "recuadros": [
      {
        "id": 1,
        "img": "/img/mvp-emprendedores-1.webp",
        "titulo": "Validación \ntemprana",
        "descripcion": "Probar tu idea en el mercado o con futuros inversores para tener un feedback real.",
      },
      {
        "id": 2,
        "img": "/img/mvp-emprendedores-2.webp",
        "titulo": "Inversión \nmínima",
        "descripcion": "Al optimizar el proceso se eliminan los altos costos relacionados a proyectos más largos.",
      },
      {
        "id": 3,
        "img": "/img/mvp-emprendedores-3.webp",
        "titulo": "Diversidad \ncreativa",
        "descripcion": "Hasta 10 equipos desarrollando distintas propuestas impulsan el pensamiento creativo.",
      },
      {
        "id": 4,
        "img": "/img/mvp-emprendedores-4.webp",
        "titulo": "Base \nsólida",
        "descripcion": "Son los cimientos de un proyecto que puede ser optimizado y mejorado en un futuro cercano.",
      }
    ]
  },
]

export default function Coaching_child_4() {
  const pathname = usePathname(); // Obtiene la URL actual

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
    <div className='text-deepblue'>
      <h3 className='text-5xl/[106px] font-extrabold pt-20 pb-10'>
        Qué vas a lograr
      </h3>
      <div className="grid grid-cols-4 gap-16 text-center items-start">
  {paginaActual.recuadros.map((recuadro) => (
    <div key={recuadro.id} className="flex flex-col items-center">
      <Image
        src={recuadro.img}
        alt="Circle img"
        width={237}
        height={237}
        className="w-[237px] h-[237px] object-cover rounded-full"
      />
      <h4 className="text-3xl/10 font-bold py-4">{formatText(recuadro.titulo)}</h4>
      <p className="text-xl/9 font-normal text-left w-full px-4">{recuadro.descripcion}</p>
    </div>
  ))}
</div>

      <div className='w-11/12 mt-16 items-center mx-auto'>
        <p className={`text-5xl/[60px] font-extrabold text-center ${paginaActual.id === 3 || paginaActual.id === 4 ? 'text-magentacustom' : 'text-lavender'}`}>
          {paginaActual.subtexto}
        </p>
      </div>
      <div className="w-96 mx-auto">
        <button className="w-full flex items-center justify-between py-5 px-10 my-20 text-center rounded-[5px] border border-deepblue">
          <span className="mx-auto">Guías descargables</span>
          <ChevronDown />
        </button>
      </div>

    </div>
  )
}