import Image from "next/image";
import Link from "next/link";


export default function HomeImage() {

  return (
    <>
      <div className="relative max-w-fourK w-full pl-[10%] z-20 bg-transparent">
        <Image src="/img/home.svg" alt="Impulsá tu negocio" width={2560} height={1015} />
        <Link href="/agendar-cita">
        <button className="
        text-[clamp(1.5rem, 3vw, 2.5rem)]
        rounded-lg 
        font-semibold 
        bg-aqua 
        hover:bg-white 
        border-aqua border-2 
        text-deepblue 
        absolute 
        top-[60%] 
        translate-y-[-50%]  
        left-[10%] 
        z-20
        w-2/5 
        h-[10%]
        ">
        Quiero obtener mi diagnóstico
        </button></Link>
      </div>
    </>
  );
}
