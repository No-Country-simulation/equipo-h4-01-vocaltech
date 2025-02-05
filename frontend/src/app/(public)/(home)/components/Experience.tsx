"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const testimonios = [
  {
    id: 1, 
    nombre: "Julia Beltran", 
    testimonio: "Conocí a VocalTech de la mano de un colega, hace años que venimos trabajando juntos en diferentes proyectos.La calidez del equipo te hace sentir que estás trabajando con amigos", 
    imagen: "/img/testimonial-1.webp"
  },
  {
    id: 2, 
    nombre: "Carlos Mendoza", 
    testimonio: "Trabajar con VocalTech fue una experiencia increíble. Desde el principio, sentí confianza y profesionalismo por parte del equipo. ¡Muy recomendados!", 
    imagen: "/img/testimonial-2.webp"
  },
  {
    id: 3, 
    nombre: "Estefania Perez", 
    testimonio: "VocalTech superó todas mis expectativas. Su equipo no solo es profesional, sino también atento y comprometido con cada detalle. Trabajar con ellos fue un proceso fluido y sin complicaciones", 
    imagen: "/img/testimonial-3.webp"
  },

  ];

export default function Experience() {
  return (
    <div className="my-[5%] p-[2%] w-full">
      <h2 className="text-darkgreen text-6xl/[90%] font-semibold mb-[7%] tablet:w-[80%] laptop:w-7/12 fullHD:w-full">
        Nuestra experiencia nos avala...
      </h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        spaceBetween={20} // Espacio entre los slides
        slidesPerView={2.5} // Aumentar para mostrar más de un slide al mismo tiempo
        initialSlide={1}
        centeredSlides={true} // Centra el slide actual
        loop={true} // Habilita el bucle
      >
        {testimonios.map((item) => (
          <SwiperSlide 
          key={item.id}
          className="!p-[2%_5%] !flex !justify-center !items-center !flex-shrink-0 !rounded-lg !border-4 !border-solid !border-aqua !w-[70%]"
          >
            {/* Contenido */}
            <div className="flex-1">
              <p className="text-3xl/10 font-bold text-black mb-2">
                {item.nombre}
              </p>
              <p className="text-xl/8 text-black leading-relaxed">
                {item.testimonio}
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="laptop:w-[237px] laptop:h-[237px] max-w-full max-h-full object-cover rounded-full 
  tablet:w-[180px] tablet:h-[180px] 
  mobileL:w-[150px] mobileL:h-[150px];"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
