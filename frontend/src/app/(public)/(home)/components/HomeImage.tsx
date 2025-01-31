import Image from "next/image";
import Link from "next/link";


export default function HomeImage() {

  return (
    <>
<div className="relative max-h-[800px] md:h-96 lg:h-96 xl:h-96 2xl:h-96 bg-transparent">
  <Image src="/img/home-3.png" alt="Impulsá tu negocio" width={620} height={1080} className="m-8 absolute top-[75px] left-[150px] z-20 "/>
  <Image src="/img/home-1.png" alt="Home Image" width={550} height={650} className="absolute top-0 right-0 z-10" />
  <Image src="/img/home-2.png" alt="Balls Image" width={230} height={1080} className="absolute top-[280px] left-[835px] z-20"/>
  <p className="text-5xl/10 w-[570px] font-semibold text-lavender m-8 absolute top-[350px] left-[150px] z-20">Obtené tu diagnóstico al instante y sin costo!</p>
  <Link href="/agendar-cita"><button className="text-xl/4 rounded-lg font-semibold bg-aqua hover:bg-white border-aqua border-2 text-deepblue m-8 absolute top-[460px] left-[150px] z-20 px-16 py-4">Quiero obtener mi diagnóstico</button></Link>
</div>
  </>
  );
}
