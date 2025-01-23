import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='relative bg-transparent overflow-hidden'>
        <img
          src="/img/impulsa-negocio.png"
          alt="Impulsá tu negocio"
          className="ml-36 min-h-screen"
        />
        <div className='absolute left-36 top-96 max-w-md'>
          <p className='text-lavender text-3xl font-semibold mb-4 overflow-hidden'>¡Obtené tu diagnóstico al instante y sin costo!</p>
          <button className="bg-aqua text-deepblue text-sm font-medium text-center py-2 px-10 rounded-md hover:bg-white hover:border-aqua border-2">
            Quiero obtener mi diagnóstico</button>
        </div>
      </div>
      <div className='relative'>
        <div className="bg-aqua text-deepblue py-10 pl-16 pr-96">
          <h2 className='text-3xl font-semibold overflow-hidden'>¿Por qué realizar un diagnóstico inicial de tu empresa o emprendimiento?</h2>
          <ul className='list-disc'>
            <li><b>Identificación de fortalezas y debilidades:</b> Ayuda a reconocer qué aspectos de tu negocio funcionan bien y cuáles necesitan mejora.
            </li>
            <li> <b>Toma de decisiones informada:</b> Contar con un panorama claro permite priorizar acciones y asignar recursos de manera estratégica.
            </li>
            <li><b>Planeación estratégica:</b> Sirve como base para crear o ajustar planes de acción que impulsen el éxito a corto y largo plazo. </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
