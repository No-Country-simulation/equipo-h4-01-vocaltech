import React from 'react';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav>
      <div className="container mx-auto px-4 py-3 my-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-deepblue">Vocaltech</div>

        {/* Buttons */}
        <div className="space-x-4">
          <button className="bg-lavender text-deepblue text-sm font-medium leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
            Soy una empresa
          </button>
          <button className="bg-lavender text-deepblue text-sm font-medium leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
            Soy un emprendedor
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-aqua w-11/12 mx-auto">
        <div className="container mx-auto px-4 py-3 flex justify-end space-x-4">
          <button className="text-deepblue text-sm font-medium leading-4 py-2 px-7 hover:bg-lavender hover:text-white border-lavender border-2">
            Iniciar sesión
          </button>
          <button className="text-deepblue text-sm font-medium leading-4 py-2 px-7 hover:bg-lavender hover:text-white border-lavender border-2">
            Registrarme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;