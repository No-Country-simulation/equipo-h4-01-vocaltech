import React from 'react'

export default function InfoRectangle() {
  return (
    <div className='relative -mt-[20%] w-full'>
    <div className="bg-aqua text-deepblue pl-[10%] pr-[30%] py-[10%]">
      <h2 className='mobileL:text-3xl/9 laptop:text-5xl/[60px] font-bold overflow-hidden mb-14'>¿Por qué realizar un diagnóstico inicial <br /> de tu empresa o emprendimiento?</h2>
      <ul className='mobileL:text-xl laptop:text-3xl/10 font-normal max-w-[847px]'>
        <li>
          <b>• Identificación de fortalezas y debilidades:</b> Ayuda a reconocer qué aspectos de tu negocio funcionan bien y cuáles necesitan potenciarse para crecer.
        </li>
        <li>
          <b>• Toma de decisiones informada:</b> Contar con un panorama claro permite priorizar acciones y asignar recursos de manera estratégica en base a una planificación.
        </li>
        <li>
          <b>• Planeación estratégica:</b> Sirve como base para crear o ajustar planes de acción ya realizados que impulsen el éxito a corto, mediano y largo plazo.
        </li>
      </ul>
    </div>
  </div>
  )
}
