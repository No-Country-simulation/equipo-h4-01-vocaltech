import Slider from './components/SliderHome'
import '@/app/[locale]/styles/globals.css'
import InfoRectangle from './components/InfoRectangle'
import Lineal from './components/Lineal'
import Steps from './components/Steps'
import Experience from './components/Experience'

export default function page() {
  return (
    <div>
      <Slider />
      <InfoRectangle />
      <div className='flex'>
      <Lineal />
      <Steps />
      </div>
      <Experience />
    </div>
  )
}
