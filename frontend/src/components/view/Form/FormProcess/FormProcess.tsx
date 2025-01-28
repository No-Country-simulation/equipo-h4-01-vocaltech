export const FormProcess = () => {
  return (
    <span className="space-y-6">
      <div className="flex space-x-8 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-sm font-medium">Datos personales</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <span className="text-sm text-current">Mi procedimiento</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-500">Condiciones</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-500">Medios de contacto</span>
        </div>
      </div>
    </span>
  );
};
