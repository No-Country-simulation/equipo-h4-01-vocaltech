import HomeImage from './components/HomeImage'
import '@/app/styles/globals.css'
import InfoRectangle from './components/InfoRectangle'
import Lineal from './components/Lineal'
import Steps from './components/Steps'
import Experience from './components/Experience'

export default function page() {
  return (
    <div>
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
