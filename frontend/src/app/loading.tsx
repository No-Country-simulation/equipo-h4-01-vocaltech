
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/img/vocaltech-icon.webp"  // Ruta de tu imagen
        alt="Loading"
        className="animate-pulse"  // Aplica un efecto de pulso
      />
    </div>
  );
}