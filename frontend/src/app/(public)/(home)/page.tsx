import HomeImage from './components/HomeImage'
import InfoRectangle from './components/InfoRectangle'
import Lineal from './components/Lineal'
import Testimonios from './components/Testimonios'
import AuthModal from './components/AuthModal'

export default async function page() {
  
  return (
    <div>
      <AuthModal />
      <HomeImage />
      <InfoRectangle />
      <Lineal />
      <Testimonios />
    </div>

  )
}
