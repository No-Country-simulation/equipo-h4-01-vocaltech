"use client"
import React, { ReactNode, useState, useEffect} from "react";
import LeftSidebar from './components/LeftSidebar'
import { usePathname } from 'next/navigation';
import Loading from "@/app/loading";


export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeaderOn = ["/mis-diagnosticos/cuestionario", "/mis-reuniones/agendar-cita"];

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500); // Simula carga
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
  <Loading />
      );
    }
  
  return (
    <div className="min-h-screen bg-gray-50 w-11/12 mx-auto">
      <div className="grid grid-cols-12 gap-8">
        {!hideHeaderOn.includes(pathname) && <LeftSidebar />}
        {children}
      </div>
    </div>
  );
  
}
