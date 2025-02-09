import Image from "next/image";
import Link from "next/link";


export default function HomeImage() {

  return (
    <>
      <div className="relative w-full pl-[10%] z-20 bg-transparent">
        <Image src="/img/home.webp" alt="Impulsá tu negocio" width={2560} height={1015} />
        <Link href="/mis-diagnosticos/cuestionario">
          <button className="
mobileS:text-sm
tablet:text-lg
laptop:text-xl
laptopL:text-2xl
laptopXL:text-3xl
fourK:text-5xl
        rounded-lg 
        font-semibold 
        bg-aqua 
        hover:bg-white 
        border-aqua border-2 
        text-deepblue 
        absolute 
        top-[61%] 
        translate-y-[-50%]  
        left-[10%] 
        z-20
        w-2/6
        h-[10%]
        ">
            Quiero obtener mi diagnóstico
          </button></Link>
      </div>
    </>
  );
}
