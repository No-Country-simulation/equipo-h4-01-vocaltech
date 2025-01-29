import React from 'react'

export default function Lineal() {
  return (
    <>
      <div className="basis-1/3 flex items-stretch">
        <div className="relative h-[500px] w-full">
            <div className="w-full h-full rounded-full overflow-hidden">
          {/* Imagen redonda con marco degradado */}
          <div
            className="absolute left-[-20%] top-2/3 transform -translate-y-1/2 w-[27rem] h-[27rem] z-10 rounded-full border-4 shadow-md"
            style={{
              background: "linear-gradient(90deg, #070543, #b8ddda)", // Marco degradado
              padding: "44px", // Espacio entre el marco y la imagen
            }}
          >
              <img
                src="/img/mujer-notebook.png"
                alt="Imagen redonda"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      <div className="flex items-stretch">
        <div className='w-5 ml-96 rounded-b-lg bg-gradient-to-t from-red-500 to-deepblue z-20'>
        </div>
      </div>
      </div>
    </>
  )
}
