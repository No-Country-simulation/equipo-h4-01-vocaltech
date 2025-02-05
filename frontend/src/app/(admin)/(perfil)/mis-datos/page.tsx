import React from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2, Check, X } from 'lucide-react';

const misdatos = [
  {
    id: 1,
    nombre: "Claudia Velazco",
    puesto: "Co-Founder en 'Altavia'",
    residencia: "Colón, Entre Ríos, Argentina",
    email: "hernanvelazco@gmail.com",
    telefono: "+54 343 256956",
    fecha_nacimiento: "18/02/1983"
  }
]

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <>
        <div className="col-span-6 text-deepblue rounded-lg shadow-sm p-8">
        {misdatos.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl/10 font-extrabold mb-1">{item.nombre}</h1>
                <p className="text-xl font-bold">{item.puesto}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xl/10">
              <div className="flex items-center font-normal gap-3">
                <MapPin className="w-5 h-5  " />
                <span>{item.residencia}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Mail className="w-5 h-5  " />
                <span>{item.email}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Phone className="w-5 h-5  " />
                <span>{item.telefono}</span>
              </div>

              <div className="flex items-center font-normal gap-3">
                <Calendar className="w-5 h-5 " />
                <span>{item.fecha_nacimiento}</span>
              </div>
            </div>
          </div>
        ))}
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-aqua rounded-lg p-[15%]">
            <img 
              src="/img/testimonial-1.webp"
              alt="Profile"
              className="w-[165px] h-[165px] object-cover rounded-full mx-auto"
            />
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