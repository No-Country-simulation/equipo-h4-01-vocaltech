import HomeImage from './components/HomeImage'
import '@/app/styles/globals.css'
import InfoRectangle from './components/InfoRectangle'
import Lineal from './components/Lineal'
import Steps from './components/Steps'
import Experience from './components/Experience'
import AuthModal from './components/AuthModal'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
  return (
    <div>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Home with Icon */}
        <p className="flex items-center text-deepblue text-sm font-semibold">
          <ChevronDown className="mr-2" /> Home
        </p>
        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/empresas">
            <button className="bg-lavender text-deepblue text-sm font-semibold leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
              Soy una empresa
            </button>
          </Link>
          <Link href="/emprendedores">
            <button className="bg-lavender text-deepblue text-sm font-semibold leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
              Soy un emprendedor
            </button>
          </Link>
        </div>
      </div>
      <AuthModal />
      <HomeImage />
      <InfoRectangle />
      <div className='flex'>
        <Lineal />
        <Steps />
      </div>
      <Experience />
    </div>
  )
}
