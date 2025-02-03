import Image from "next/image";
import Link from "next/link";


export default function HomeImage() {

  return (
    <>
      <div className="absolute max-w-fourK w-full pl-[4.375rem] z-20 bg-transparent">
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
        mobileL:top-[160px] 
        tablet:top-[290px] 
        laptop:top-[25rem] 
        laptopM:top-[640px] 
        laptopL:top-[575px] 
        laptopXL:top-[650px] 
        fullHD:top-[770px] 
        fourK:top-[1050px] 
        left-0 
        z-20 m
        obileL:py-1 
        mobileL:px-2 
        tablet:py-4 
        tablet:px-6 
        laptop:px-12 
        py-8 px-32 
        tablet:w-[305px] tablet:h-[50px] 
        laptop:w-[25rem] laptop:h-[50px]
        laptopM:w-[480px] laptopM:h-[60px]
        laptopL:w-[500px] laptopL:h-[4.375rem]
        laptopXL:w-[620px] laptopXL:h-[4.375rem]
        fullHD:w-[740px] fullHD:h-[90px] 
        ">
        Quiero obtener mi diagnóstico
        </button></Link>
      </div>
    </>
  );
}
