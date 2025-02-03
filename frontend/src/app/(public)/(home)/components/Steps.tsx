import React from "react";

export default function Steps() {
  return (
    <>
    <div className="flex-1 text-deepblue relative z-40 bg-transparent tablet:my-24 tablet:mr-8 laptop:mr-16 fullHD:mr-20 laptop:ml-0">
      <h2 className="text-5xl/[60px] font-bold mb-24">
        Nuestro sistema consta de 3 simples pasos...
      </h2>
      <div className="relative flex flex-col space-y-28">
        {/* Paso 1 */}
        <div className="relative flex flex-col">
          {/* Número en círculo */}
          <div className="circle-number">
            1
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
      </>
  );
}
