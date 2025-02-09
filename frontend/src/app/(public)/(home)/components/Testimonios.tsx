"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { usePathname } from "next/navigation";


const testimonios = [
  {
    id: 1,
    url: "/",
    title: "Nuestra experiencia nos avala...",
    data: [
      {
        id: 1,
        nombre: "Julia Beltran",
        testimonio: '"Conocí a VocalTech de la mano de un colega, hace años que venimos trabajando juntos en diferentes proyectos. La calidez del equipo te hace sentir que estás trabajando con amigos"',
        imagen: "/img/testimonial-1.webp"
      },
      {
        id: 2,
        nombre: "Carlos Mendoza",
        testimonio: '"Trabajar con VocalTech fue una experiencia increíble. Desde el principio, sentí confianza y profesionalismo por parte del equipo. ¡Muy recomendados!"',
        imagen: "/img/testimonial-2.webp"
      },
      {
        id: 3,
        nombre: "Estefania Flores",
        testimonio: '"VocalTech superó todas mis expectativas. Su equipo no solo es profesional, sino también atento y comprometido con cada detalle. Trabajar con ellos fue un proceso fluido y sin complicaciones"',
        imagen: "/img/testimonial-3.webp"
      }]
  },
  {
    "id": 2,
    "url": "/empresas",
    "title": "Qué opinan nuestros clientes",
    "data": [
      {
        "id": 1,
        "nombre": "Esteban Suarez",
        "testimonio": '"Desde que trabajamos con VocalTech, la eficiencia de nuestros procesos ha mejorado notablemente. Son un equipo confiable y siempre están dispuestos a brindar soluciones innovadoras."',
        "imagen": "/img/testimonial-4.webp"
      },
      {
        "id": 2,
        "nombre": "Maximiliano Costa",
        "testimonio": '"Nos sorprendió la rapidez y calidad con la que VocalTech resolvió nuestros problemas. Su compromiso y atención al detalle marcaron una gran diferencia en nuestro negocio."',
        "imagen": "/img/testimonial-8.webp"
      },
      {
        "id": 3,
        "nombre": "Joselyn Echeverría",
        "testimonio": '"El equipo de VocalTech nos brindó un servicio excepcional. No solo cumplieron con los plazos, sino que además aportaron ideas valiosas para mejorar nuestro proyecto."',
        "imagen": "/img/testimonial-6.webp"
      }
    ]
  },
  {
    "id": 3,
    "url": "/emprendedores",
    "title": "Qué opinan nuestros clientes",
    "data": [
      {
        "id": 1,
        "nombre": "Rosana Perez",
        "testimonio": '"Como emprendedora, necesitaba un equipo que entendiera mis necesidades. VocalTech no solo lo hizo, sino que también me ayudó a escalar mi negocio con soluciones a medida."',
        "imagen": "/img/testimonial-5.webp"
      },
      {
        "id": 2,
        "nombre": "Cristian Rojas",
        "testimonio": '"Siempre tuve dudas sobre delegar el área tecnológica, pero trabajar con VocalTech fue la mejor decisión. Su equipo es transparente, eficiente y siempre está dispuesto a ayudar."',
        "imagen": "/img/testimonial-7.webp"
      },
      {
        "id": 3,
        "nombre": "Mauricio Re",
        "testimonio": '"Gracias a VocalTech, pude lanzar mi startup con la tranquilidad de saber que todo estaba en buenas manos. Su soporte y asesoramiento fueron clave en cada etapa del proceso."',
        "imagen": "/img/testimonial-9.webp"
      }
    ]
  }
  

]

export default function Testimonios() {
  const pathname = usePathname(); // Obtiene la URL actual

  // Busca el testimonio que coincide con la URL actual
  const testimonioActual = testimonios.find((t) => t.url === pathname);

  // Si no encuentra testimonios para la página actual, no muestra nada
  if (!testimonioActual) return null;
  return (
    <div className="my-[5%] w-full">
      <h2 className="text-darkgreen pl-[2%] text-6xl/[90%] font-semibold mb-[7%] tablet:w-[80%] laptop:w-7/12 fullHD:w-full">
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
        {testimonioActual.data.map(({ id, nombre, testimonio, imagen }) => (
          <SwiperSlide
            key={id}
            className="!p-[2%_5%] !flex !justify-center !items-center !flex-shrink-0 !rounded-lg !border-4 !border-solid !border-aqua !w-[70%]"
          >
            {/* Contenido */}
            <div className="flex-1 pr-[15%]">
              <p className="text-3xl/10 font-bold text-black mb-2">
                {nombre}
              </p>
              <p className="text-xl/8 text-black leading-relaxed">
                {testimonio}
              </p>
            </div>
            {/* Imagen redonda */}
            <div className="flex-shrink-0">
              <img
                src={imagen}
                alt={nombre}
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
