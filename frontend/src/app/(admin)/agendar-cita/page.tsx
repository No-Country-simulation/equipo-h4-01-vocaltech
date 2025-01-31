import React from 'react'
import StepsDate from './components/StepsDate'
import { ChevronDown } from 'lucide-react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      {/* Home with Icon */}
      <p className="flex items-center text-deepblue text-sm font-semibold">
        <ChevronDown className="mr-2" /> Agendar cita
      </p>
    </div>
      <StepsDate />
    </div>
  )
}
