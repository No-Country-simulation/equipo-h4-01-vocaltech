import React from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div className="col-span-9 font-bold ">
      <div className="flex flex-col items-center justify-center min-h-[25rem] bg-white rounded-lg p-8">
        <div className="flex items-center text-3xl/10 gap-2 text-aqua mb-4">
          <span>No tenés citas pendientes</span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-4xl/10 text-deepblue mb-6">
          ¿Querés agendar una cita?
        </h2>

        <Link href="/agendar-cita">
        <button className="flex items-center justify-center bg-aqua text-2xl text-deepblue w-96 h-20 rounded-lg font-bold hover:bg-lavender transition-colors">
  Agendar una cita <PlusCircle className="w-5 h-5 mx-2" /> 
</button>

        </Link>
      </div>
    </div>
  );
};