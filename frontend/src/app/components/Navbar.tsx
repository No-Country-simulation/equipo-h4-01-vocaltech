"use client";
import { useAuthModal } from '@/store/useAuthModal';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  const { openModal } = useAuthModal();

  return (
    <nav className='max-w-screen-xl mx-auto'>
      <div className="container mx-auto py-3 my-4 flex items-center justify-between">
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
      <div className="border-t-2 border-aqua w-full mx-auto px-4">
      </div>
    </nav>
  );
};

export default Navbar;
