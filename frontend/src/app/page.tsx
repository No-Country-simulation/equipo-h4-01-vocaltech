import Image from "next/image";

export default function ComingSoon() {
  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
  <Image
    src="/img/under_construction.png"
    alt="En construcción"
    width={500} // Ajusta según lo necesites
    height={500} // Ajusta según lo necesites
    className="object-contain"  />
  <h1 className="text-2xl font-bold text-gray-800">Estamos trabajando en ello</h1>
  <p className="text-gray-600 mt-2">¡Pronto estará disponible!</p>
</div>

  );
}
