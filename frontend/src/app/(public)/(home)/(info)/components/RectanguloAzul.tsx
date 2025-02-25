"use client"

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const pageData = [
  {
    id: 1,
    url: "/empresas",
    title: "¿Cuál es el servicio ideal para tu empresa?",
    descripcion: "Descubrir el servicio ideal para tu empresa es clave para alcanzar el éxito y destacarte en un mercado competitivo. Cada negocio tiene necesidades únicas, y contar con soluciones personalizadas que impulsen tu crecimiento puede marcar la diferencia.",
    img: "/img/empresa-1.webp"
  },
  {
    id: 2,
    url: "/emprendedores",
    title: "¿Cuál es el servicio ideal para tu emprendimiento?",
    descripcion: "Descubrí cual de nuestros servicios se  adapta a tus necesidades específicas, potenciando tu crecimiento y optimizando tus recursos. A través de distintas acciones, te ayudamos a identificar oportunidades clave, mejorar procesos y alcanzar tus objetivos de manera eficiente y estratégica.",
    img: "/img/emprendedor-1.webp"
  }]

export default function RectanguloAzul() {
  const pathname = usePathname();

  const dataActual = pageData.find((t) => t.url === pathname);
  if (!dataActual) return null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-0 w-full overflow-hidden p-16">

        <div className="relative col-span-2 w-full">
          <Image
            src="/img/layout-fondo-azul.webp"
            alt="Fondo azul"
            width={800}
            height={615}
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-transparent inset-0 flex justify-center items-center z-10 text-left p-4">
            <div className="p-12 space-y-8">
              <h2 className="text-5xl/[3.5rem] font-bold text-white">
                {dataActual.title}
              </h2>
              <p className="text-2xl/10 font-normal text-white">
                {dataActual.descripcion}
              </p>
              <div className="flex justify-center p-6">
                <a href="/mis-diagnosticos/cuestionario">
                  <button className="bg-whitecustom border-lavender rounded-md font-bold text-2xl/4 p-6">
                    Quiero obtener mi diagnóstico
                  </button>
                </a>
              </div>
            </div>
          </div>


        </div>


        {/* Imagen pequeña */}
        <div className="col-span-1 h-full">
          <Image
            src={dataActual.img}
            alt="Empresa"
            width={500}
            height={615}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
