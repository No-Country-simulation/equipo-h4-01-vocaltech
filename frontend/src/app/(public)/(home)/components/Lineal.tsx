import Image from 'next/image'
import React from 'react'

export default function Lineal() {
  return (
    <div className="relative flex w-[40%] flex-1 items-center justify-center">
      {/* Imagen de la mujer */}
      <Image 
        src="/img/mujer-notebook.svg" 
        alt="Mujer escribiendo en notebook" 
        width={871} 
        height={871} 
        className="absolute tablet:top-[65rem] laptop:top-[50rem] laptopL:top-[34rem] fullHD:top-[14rem]
                   tablet:left-[-40%] laptop:left-[-40%] laptopL:left-[-41%] fullHD:left-[-15%] 
                   max-w-none tablet:max-w-[31rem] laptop:max-w-[40rem] laptopL:max-w-[60rem] fullHD:max-w-[80rem]"
      />
      
      {/* Línea de color */}
      <div className="absolute top-0 z-0 w-6 
                      tablet:right-[20%] laptop:right-[25%] laptopL:right-[27%] laptopXL:right-[15%] fullHD:right-[10%] 
                      tablet:h-[2400px] laptop:h-[1950px] laptopL:h-[1611px] laptopXL:h-[1550px] fullHD:h-[1450px] 
                      rounded-b-lg bg-gradient-to-t from-[#F75F57] to-deepblue">
      </div>
    </div>
  )
}
