import HomeImage from './components/HomeImage'
import './styles.css'
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
  <div className="w-11/12 max-w-screen-xl mx-auto py-6 flex items-center">
    {/* Home with Icon */}
    <p className="text-sm mobileL:text-sm tablet:text-lg laptop:text-xl laptopL:text-2xl/6 flex items-center text-deepblue font-bold">
      <ChevronDown className="mr-2" /> Home
    </p>
    {/* Buttons */}
    <div className="ml-auto flex space-x-4">
      <Link href="/empresas">
        <button className="btn-primary">
          Soy una empresa
        </button>
      </Link>
      <Link href="/emprendedores">
        <button className="btn-primary">
          Soy un emprendedor
        </button>
      </Link>
    </div>
  </div>
  <AuthModal />
  <HomeImage />
  <InfoRectangle />
  <div className="flex">
    <Lineal />
    <Steps />
  </div>
  <Experience />
</div>

  )
}
