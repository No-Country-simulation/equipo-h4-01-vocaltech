import Image from 'next/image';
import React from 'react'

export default async function page() {
  
  return (
    <section>
      <div className='w-full pl-[5%]'>
        <Image src="/img/nosotros-1.webp" alt="Vocaltech" width={2560} height={0} />
      </div>

      <div className='p-[5%] text-darkgreen text-3xl/10 font-bold'>
        <p>
          VocalTech nace de unión de “Vos y tu Voz” y “No Country”:  aunque venimos de áreas distintas, compartimos un objetivo común: impulsar el crecimiento personal y profesional, combinando el desarrollo de la comunicación con oportunidades reales para aplicar estas habilidades. Creemos en una formación integral que fomente confianza, liderazgo y éxito en cualquier ámbito.
        </p>
      </div>

      <div className='flex p-[0%_5%_10%_5%] items-center'>
        <div className='basis-2/5'>
          <Image src="/img/nosotros-2.webp" alt="Vocaltech" width={2560} height={0} />
        </div>
        <div className='basis-3/5 text-deepblue text-2xl/8 space-y-8'>
          <p>
            En “Vos y tu Voz” ayudamos a las personas a conectar su voz con su cuerpo y emociones, transformándola en una herramienta esencial para comunicarse de manera auténtica y asertiva. Con más de 20 años de experiencia como entrenadora y coach vocal, nuestro enfoque está en fortalecer la expresión personal para generar impacto en cualquier ámbito.
          </p>
          <p>
            En “No Country”, nos especializamos en conectar a talentos sin experiencia con su primer empleo, ofreciendo simulaciones laborales y hackathones diseñados para potenciar sus habilidades y prepararlos para destacar en entornos profesionales reales. Enfocamos nuestro trabajo en el desarrollo de soft skills, el comportamiento y el potencial de liderazgo.
          </p>
          <p className='font-bold text-4xl/9 text-lavender'>
            Brindamos un enfoque integral para que tu voz y tu talento alcancen su potencial.
          </p>
        </div>
      </div>
    </section>
  )
}
