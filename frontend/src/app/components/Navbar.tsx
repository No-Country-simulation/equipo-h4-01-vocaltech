"use client";
import { useAuthModal } from '@/store/useAuthModal';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { openModal } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú móvil

  return (
    <nav className='w-11/12 mx-auto'>
      <div className="mx-auto py-8 my-4 flex items-center justify-between">
        <div className="space-x-12 flex items-center">
          {/* Logo */}
          <Link href="/"> 
            <Image src="/img/vocaltech-logo.webp" alt="Vocaltech" width={220} height={30} />
          </Link>
          {/* Buttons */}
          <Link href="/nosotros" className='hidden laptop:flex'>
            <button className="btn-secondary border-lavender">
              Quienes somos
            </button>
          </Link>
        </div>
        
        <div className="hidden laptop:flex space-x-4">
          <button 
            onClick={() => openModal(true)}        
            className="btn-secondary">
            Iniciar sesión
          </button>
          <button 
            onClick={() => openModal(false)}
            className="btn-secondary">
            Registrarme
          </button>
        </div>

  {/* Botón del menú hamburguesa en móviles */}
        <button className="laptop:hidden text-deepblue" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {isOpen && (
        <div className="laptop:hidden flex flex-col items-center space-y-4 py-4 bg-white shadow-md">
          <Link href="/nosotros">
            <button className="btn-secondary border-lavender">
              Quienes somos
            </button>
          </Link>
          <button 
            onClick={() => openModal(true)}
            className="btn-nav border-aqua">
            Iniciar sesión
          </button>
          <button 
            onClick={() => openModal(false)}
            className="btn-nav border-aqua">
            Registrarme
          </button>
        </div>
      )}
      {/* Divider */}
      <div className="border-t-4 border-aqua w-full mx-auto px-4">
      </div>
    </nav>
  );
};

export default Navbar;
