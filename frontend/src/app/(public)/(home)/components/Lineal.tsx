import Image from 'next/image'
import React from 'react'

export default function Lineal() {
  return (
    <div className="relative w-full flex flex-row">

      <div className='relative basis-2/5'>

        {/* Imagen de la mujer */}
        <Image
          src="/img/mujer-notebook.webp"
          alt="Mujer escribiendo en notebook"
          width={2560}
          height={871}
          className="absolute right-2 top-1/3 -ml-[25%] w-auto fullHD:w-[135%] h-auto mobileL:max-w-[535px] laptop:max-w-[871px]"
        />
      </div>

      <div className='relative basis-3/5 mx-[2%] pb-[15%] text-deepblue '>
              {/* Línea de color */}
              <div className="barra">
        </div>
        <h2 className="text-5xl/[60px] font-bold my-[5%]">
          Nuestro sistema consta de 3 simples pasos...
        </h2>
        <div className="relative flex flex-col space-y-28">
          {/* Paso 1 */}
          <div className="relative flex flex-col">
            {/* Número en círculo */}
            <div className="">
              <p className='circle-number'>
              1
              </p>
            </div>
            {/* Contenido */}
            <div>
              <h3 className="text-4xl/8 font-bold mb-2">Completá el formulario</h3>
              <p className="text-[28px]/10">
                Regístrate en nuestra página de forma gratuita y dale click al
                botón “Quiero obtener mi diagnóstico”: solo necesitas completar un
                formulario, y nuestro sistema realizará un análisis diseñado para
                identificar lo que tu negocio necesita para alcanzar sus metas. ¡Es
                fácil, rápido y está hecho justo a tu medida!
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="relative flex flex-col">
            <div className="circle-number">
              2
            </div>
            <div>
              <h3 className="text-4xl/8 font-bold mb-2">Obtené tu diagnóstico</h3>
              <p className="text-[28px]/10">
                Recibí los resultados en el acto a través de tu mail, móvil o
                mediante descarga directa desde nuestra web. Este informe tiene
                como objetivo brindarte una visión macro sobre las necesidades
                actuales de tu negocio, para que puedas identificar oportunidades
                clave y tomar distintas acciones destinadas a impulsar su
                crecimiento.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="relative flex flex-col">
            <div className="circle-number">
              3
            </div>
            <div>
              <h3 className="text-4xl/8 font-bold mb-2">Agendá una cita</h3>
              <p className="text-[28px]/10">
                Luego de recibir tu diagnóstico, te invitamos a agendar una cita
                virtual con nosotros para poder conocernos más y comenzar a trazar
                un plan de acción en base a las problemáticas detectadas, el
                proceso será guiado y acompañado por los profesionales de
                VocalTech, de una manera cercana, profesional y personalizada.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
