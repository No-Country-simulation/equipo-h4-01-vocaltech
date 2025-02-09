"use client"

import React, { ReactNode } from 'react'
import LeftSidebar from './components/LeftSidebar'
import { usePathname } from 'next/navigation';


export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeaderOn = "/mis-diagnosticos/cuestionario";
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto grid grid-cols-12 gap-8">
        {pathname !== hideHeaderOn && <LeftSidebar />}
        {children}
      </div>
    </div>
  );
  
}
