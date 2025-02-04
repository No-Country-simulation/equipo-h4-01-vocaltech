import Image from "next/image";
import Link from "next/link";


export default function HomeImage() {

  return (
    <>
      <div className="relative max-w-fourK w-full pl-[4.375rem] z-20 bg-transparent">
        <Image src="/img/home.svg" alt="Impulsá tu negocio" width={2560} height={1015} />
        <Link href="/agendar-cita">
        <button className="
        ml-[4.375rem]
        mobileL:text-[0.55rem] 
        tablet:text-lg/4 
        laptopXL:text-xl/4 
        fullHD:text-2xl/4 
        rounded-lg 
        font-semibold 
        bg-aqua 
        hover:bg-white 
        border-aqua border-2 
        text-deepblue 
        absolute 
        top-[60%] 
        translate-y-[-50%]  
        left-0 
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
