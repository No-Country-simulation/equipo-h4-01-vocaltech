"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../swiper.css";
import { Autoplay } from "swiper/modules";

export default function Experience() {
  return (
    <div className="m-12">
      <h2 className="text-aqua text-3xl font-semibold mb-8">
        Nuestra experiencia nos avala...
      </h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={2}
        className="w-full"
      >
        {/* Testimonio 1 */}
        <SwiperSlide>
          <div className="w-[full] p-6 border-4 border-solid border-aqua rounded-lg flex items-center space-x-6">
            {/* Contenido */}
            <div>
              <p className="text-lg font-semibold text-black mb-2">
                Julia Beltran
              </p>
              <p className="text-sm text-black leading-relaxed">
                “Conocí a VocalTech de la mano de un colega, hace años que
                venimos trabajando juntos en diferentes proyectos. La calidez
                del equipo te hace sentir que estás trabajando con amigos :)”
              </p>
            </div>
                        {/* Imagen redonda */}
                        <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="/img/testimonial-1.jpeg"
                  alt="Testimonial 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonio 2 */}
        <SwiperSlide>
          <div className="w-full p-6 border-4 border-solid border-aqua rounded-lg flex items-center space-x-6">
            {/* Contenido */}
            <div>
              <p className="text-lg font-semibold text-black mb-2">
                Carlos Mendoza
              </p>
              <p className="text-sm text-black leading-relaxed">
                “Trabajar con VocalTech fue una experiencia increíble. Desde el
                principio, sentí confianza y profesionalismo por parte del
                equipo. ¡Muy recomendados!”
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="/img/testimonial-2.jpeg"
                  alt="Testimonial 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Testimonio 3 */}
        <SwiperSlide>
          <div className="w-full p-6 border-4 border-solid border-aqua rounded-lg flex items-center space-x-6">
            {/* Contenido */}
            <div>
              <p className="text-lg font-semibold text-black mb-2">
                Carlos Mendoza
              </p>
              <p className="text-sm text-black leading-relaxed">
                “Trabajar con VocalTech fue una experiencia increíble. Desde el
                principio, sentí confianza y profesionalismo por parte del
                equipo. ¡Muy recomendados!”
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="/img/testimonial-2.jpeg"
                  alt="Testimonial 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Agrega más testimonios aquí */}
      </Swiper>
    </div>
  );
}
