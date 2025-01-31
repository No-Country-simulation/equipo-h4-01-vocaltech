import React from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2, Check, X } from 'lucide-react';

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <>
        <div className="col-span-6 bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-deepblue mb-1">Hernán Velazco</h1>
              <p className="text-deepblue font-medium">Co-Founder en "Altavia"</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center text-deepblue font-normal gap-3">
              <MapPin className="w-5 h-5  " />
              <span>Colón, Entre Ríos, Argentina</span>
            </div>

            <div className="flex items-center text-deepblue font-normal gap-3">
              <Mail className="w-5 h-5  " />
              <span>hernanvelazco@gmail.com</span>
            </div>

            <div className="flex items-center text-deepblue font-normal gap-3">
              <Phone className="w-5 h-5  " />
              <span>+54 343 256956</span>
            </div>

            <div className="flex items-center text-deepblue font-normal gap-3">
              <Calendar className="w-5 h-5 " />
              <span>18/02/1983</span>
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-emerald-100 rounded-lg p-4">
            <img 
              src="/img/testimonial-1.jpeg"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          </div>

          <div className="bg-emerald-100 rounded-lg p-4">
            <h3 className="font-medium mb-4">Medios de contacto</h3>
            <div className="space-y-3">
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