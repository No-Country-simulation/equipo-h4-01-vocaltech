
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/img/vocaltech-icon.svg"  // Ruta de tu imagen
        alt="Loading"
        className="animate-pulse h-40 w-40"  // Aplica un efecto de pulso
      />
    </div>
  );
}