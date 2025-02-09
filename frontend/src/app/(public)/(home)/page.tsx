import HomeImage from './components/HomeImage'
import InfoRectangle from './components/InfoRectangle'
import Lineal from './components/Lineal'
import Testimonios from './components/Testimonios'
import AuthModal from './components/AuthModal'

export default async function page() {
  await new Promise(resolve => setTimeout(resolve, 3500));
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
