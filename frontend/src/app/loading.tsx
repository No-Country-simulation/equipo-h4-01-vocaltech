import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Image
        src="/img/vocaltech-icon.webp" // Ruta de tu imagen
        alt="Loading"
        className="animate-pulse" // Ajusta el tamaño si es necesario
        width={137}
        height={96}
      />
    </div>
  );
}
