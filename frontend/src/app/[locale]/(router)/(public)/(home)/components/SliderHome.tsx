"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../swiper.css";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  const sliderConfig = {
    spaceBetween: 30,
    effect: "fade",
    navigation: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: { clickable: true },
    modules: [EffectFade, Navigation, Pagination, Autoplay],
  };

  const slides = ["/img/slider-1.png", "/img/slider-2.png"];

  return (
    <Swiper {...sliderConfig}>
      {slides.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
