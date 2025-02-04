import React from 'react'

export default function InfoRectangle() {
  return (
    <div className='relative mobileL:mt-[13rem] tablet:mt-[25rem] laptop:mt-[32rem] laptopM:mt-[39rem] laptopL:mt-[45rem] laptopXL:mt-[50rem] fullHD:mt-[60rem] fourK:mt-[85rem] w-full'>
    <div className="bg-aqua text-deepblue mobileL:p-7 tablet:pl-8 tablet:pr-8 laptop:py-[72px] laptop:pl-28 laptop:pr-20 laptopM:pr-64 laptopL:pr-80">
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
