import React from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2, Check, X } from 'lucide-react';

const misdatos = [
  {
    id: 1,
    nombre: "Hernan Velazco",
    puesto: "Co-Founder en 'Altavia'",
    residencia: "Colón, Entre Ríos, Argentina",
    email: "hernanvelazco@gmail.com",
    telefono: "+54 343 256956",
    fecha_nacimiento: "18/02/1983",
    photo: "/img/usuario-activo.webp"
  }
]

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));

  return (
    <>
        <div className="col-span-6 text-deepblue rounded-lg shadow-sm p-8">
          <div key={misdatos[0].id}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl/10 font-extrabold mb-1">{misdatos[0].nombre}</h1>
                <p className="text-xl font-bold">{misdatos[0].puesto}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xl/10">
              <div className="flex items-center font-normal gap-3">
                <MapPin className="w-5 h-5  " />
                <span>{misdatos[0].residencia}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Mail className="w-5 h-5  " />
                <span>{misdatos[0].email}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Phone className="w-5 h-5  " />
                <span>{misdatos[0].telefono}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Calendar className="w-5 h-5 " />
                <span>{misdatos[0].fecha_nacimiento}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="relative bg-aqua rounded-lg p-[15%]">
            <img 
              src={misdatos[0].photo}
              alt="Profile Pic"
              className="w-[165px] h-[165px] object-cover rounded-full mx-auto"
              />
          <button className="absolute right-[15%] bottom-[15%] p-2 hover:bg-lightlavender rounded-full bg-lavender">
                <Edit2 className="w-5 h-5" />
              </button>
          </div>

          <div className="bg-aqua rounded-lg p-4">
            <h3 className="font-bold text-xl/10 mb-4">Medios de contacto</h3>
            <div className="space-y-3 text-xl/10">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>E-mail</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                <span>Whatsapp</span>
              </div>
            </div>
          </div>
        </div>
        
        </>
  );
};