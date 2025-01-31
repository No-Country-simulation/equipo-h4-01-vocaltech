import Image from 'next/image';
import React from 'react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div>
        <section className="bg-gray-100 py-20">
      <div className="flex flex-col container mx-auto px-4">
        <div className='flex flex-col items-start w-52'>
  <Image src="/img/vocaltech-logo.svg" alt="Vocaltech" width={200} height={200} />
        <h2 className="text-6xl font-bold text-lavender mb-4">
          le pone voz y tecnología a tu proyecto
        </h2>
        </div>
        <div className='flex flex-col items-end absolute right-0 top-12 bg-transparent'>
        <Image src="/img/nosotros-1.png" alt="Vocaltech" width={600} height={600} />
        </div>
        <p className="text-deepblue text-3xl/10 font-semibold mb-8">
          Trabajó junto a los mejores especialistas y potenciá tu marca.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-deepblue mb-4">
              Vos y tu Voz
            </h3>
            <p className="text-gray-700 mb-4">
              En “Vos y tu Voz” ayudamos a las personas a conectar su voz con su
              esencia y emociones, manteniéndose auténticas y especiales. Con más
              de 100 años de experiencia como entrenadores, nuestro enfoque está
              en fortalecer la expresión personal para generar impacto en
              cualquier ámbito.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-deepblue mb-4">No Country</h3>
            <p className="text-gray-700 mb-4">
              En “No Country”, nos especializamos en conectar a personas sin
              experiencia con su primer empleo, ofreciendo simulaciones reales de
              entornos laborales para prepararlos y potenciar sus habilidades en
              contextos profesionales y sociales.
            </p>
          </div>
        </div>
        <p className="text-gray-700 mt-8">
          Brindamos un enfoque integral para que tu voz y tu talento alcancen su
          potencial.
        </p>
      </div>
    </section>
    </div>
  )
}
