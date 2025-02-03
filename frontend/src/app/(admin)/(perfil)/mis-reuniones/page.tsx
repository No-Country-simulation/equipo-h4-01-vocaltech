import React from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div className="col-span-9 font-bold ">
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-8">
        <div className="flex items-center text-xl gap-2 text-aqua mb-4">
          <span>No tenés citas pendientes</span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-2xl text-deepblue mb-6">
          ¿Querés agendar una cita?
        </h2>

        <Link href="/agendar-cita">
          <button className="flex items-center bg-aqua text-deepblue px-12 py-3 rounded-lg font-medium hover:bg-lavender transition-colors">
            Agendar una cita <PlusCircle className="w-5 h-5 mx-2" /> 
          </button>
        </Link>
      </div>
    </div>
  );
};