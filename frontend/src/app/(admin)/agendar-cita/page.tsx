import React from 'react'
import StepsDate from './components/StepsDate'
import { ChevronDown } from 'lucide-react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div>
      <StepsDate />
    </div>
  )
}
