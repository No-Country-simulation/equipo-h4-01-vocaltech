"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../swiper.css";
import { Autoplay } from "swiper/modules";

export default function Experience() {
  return (
    <div className="laptop:mt-20 laptop:mb-28 laptopL:mt-40 laptopL:mb-28 tablet:mt-28 tablet:mb-28">
      <h2 className="text-darkgreen text-6xl/[90%] font-semibold mb-8 ml-12 laptopL:w-5/12 laptop:w-7/12 tablet:w-9/12 fullHD:w-full">
        Nuestra experiencia nos avala...
      </h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        spaceBetween={10} // Espacio entre los slides
        slidesPerView={3} // Aumentar para mostrar más de un slide al mismo tiempo
        centeredSlides={true} // Centra el slide actual
        loop={true} // Habilita el bucle
      >
        {/* Testimonio 1 */}
        <SwiperSlide>
          <div className="w-full flex items-center space-x-6">
            {/* Contenido */}
            <div className="flex-1">
              <p className="text-3xl/10 font-bold text-black mb-2">
                Julia Beltran
              </p>
              <p className="text-xl/8 text-black leading-relaxed">
                “Conocí a VocalTech de la mano de un colega, hace años que
                venimos trabajando juntos en diferentes proyectos. La calidez
                del equipo te hace sentir que estás trabajando con amigos :)”
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              
                <img
                  src="/img/testimonial-1.jpeg"
                  alt="Testimonial 1"
                  
                />
              </div>
            </div>
        </SwiperSlide>

        {/* Testimonio 2 */}
        <SwiperSlide>
          <div className="w-full flex items-center space-x-6">
            {/* Contenido */}
            <div className="flex-1">
              <p className="text-3xl/10 font-bold text-black mb-2">
                Carlos Mendoza
              </p>
              <p className="text-xl/8 text-black leading-relaxed">
                “Trabajar con VocalTech fue una experiencia increíble. Desde el
                principio, sentí confianza y profesionalismo por parte del
                equipo. ¡Muy recomendados!”
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              
                <img
                  src="/img/testimonial-2.jpeg"
                  alt="Testimonial 2"
                  
                />
              </div>
          </div>
        </SwiperSlide>

        {/* Testimonio 3 */}
        <SwiperSlide>
          <div className="flex items-center space-x-6">
            {/* Contenido */}
            <div className="flex-1">
              <p className="text-3xl/10 font-bold text-black mb-2">
                Carlos Mendoza
              </p>
              <p className="text-xl/8 text-black leading-relaxed">
                “Trabajar con VocalTech fue una experiencia increíble. Desde el
                principio, sentí confianza y profesionalismo por parte del
                equipo. ¡Muy recomendados!”
              </p>
            </div>
                <img
                  src="/img/testimonial-2.jpeg"
                  alt="Testimonial 3"
                  
                />
          </div>
        </SwiperSlide>
        {/* Agrega más testimonios aquí */}
      </Swiper>
    </div>
  );
}
