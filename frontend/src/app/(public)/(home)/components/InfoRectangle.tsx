import React from 'react'

export default function InfoRectangle() {
  return (
    <div className='relative -mt-[20%] w-full'>
    <div className="bg-aqua text-deepblue pl-[5%] pr-[20%] py-[5%]">
      <h2 className='mobileL:text-3xl/9 laptop:text-5xl/[60px] font-bold overflow-hidden mb-14'>¿Por qué realizar un diagnóstico inicial de tu empresa o emprendimiento?</h2>
      <ul className='mobileL:text-xl laptop:text-3xl/10 font-normal'>
        <li>
          <b>• Identificación de fortalezas y debilidades:</b> Ayuda a reconocer qué aspectos de tu negocio funcionan bien y cuáles necesitan mejora.
        </li>
        <li>
          <b>• Toma de decisiones informada:</b> Contar con un panorama claro permite priorizar acciones y asignar recursos de manera estratégica.
        </li>
        <li>
          <b>• Planeación estratégica:</b> Sirve como base para crear o ajustar planes de acción que impulsen el éxito a corto y largo plazo.
        </li>
      </ul>
    </div>
  </div>
  )
}
