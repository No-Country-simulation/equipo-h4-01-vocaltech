import Testimonios from "../../components/Testimonios";
import RectanguloAzul from "../components/RectanguloAzul";
import ServicioEspecial from "../components/ServicioEspecial";

export default async function page() {
  
  return (
    <>
      <ServicioEspecial />
      <RectanguloAzul />
      <Testimonios />
    </>
  )
}
