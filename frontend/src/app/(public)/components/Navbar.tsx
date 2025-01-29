"use client";
import { useAuthModal } from '@/store/useAuthModal';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  const { openModal } = useAuthModal();

  return (
    <nav>
      <div className="container mx-auto px-4 py-3 my-4 flex items-center justify-between">
        <div className="space-x-4 flex items-center">
          {/* Logo */}
          <Link href="/"> 
            <Image src="/img/vocaltech-logo.svg" alt="Vocaltech" width={200} height={200} />
          </Link>
          {/* Buttons */}
          <Link href="/nosotros">
            <button className="text-deepblue text-sm font-normal leading-4 py-3 px-7 hover:bg-lavender hover:text-white rounded-md border-lavender border-2">
              Quienes somos
            </button>
          </Link>
        </div>
        
        <div className="space-x-4">
          <button 
            onClick={() => openModal(true)}        
            className="text-deepblue text-sm font-medium leading-4 py-2 px-7 hover:bg-aqua hover:text-white border-aqua border-2">
            Iniciar sesión
          </button>
          <button 
            onClick={() => openModal(false)}
            className="text-deepblue text-sm font-medium leading-4 py-2 px-7 hover:bg-aqua hover:text-white border-aqua border-2">
            Registrarme
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-aqua w-11/12 mx-auto">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Home with Icon */}
          <p className="flex items-center text-deepblue text-sm font-semibold">
            <ChevronDown className="mr-2" /> Home
          </p>
          {/* Buttons */}
          <div className="flex space-x-4">
            <Link href="/empresas">
              <button className="bg-lavender text-deepblue text-sm font-semibold leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
                Soy una empresa
              </button>
            </Link>
            <Link href="/emprendedores">
              <button className="bg-lavender text-deepblue text-sm font-semibold leading-4 py-2 px-7 rounded-md hover:bg-white border-lavender border-2">
                Soy un emprendedor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
