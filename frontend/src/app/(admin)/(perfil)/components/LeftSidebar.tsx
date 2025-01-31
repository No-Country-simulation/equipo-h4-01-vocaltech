"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Datos personales',
      href: '/mis-datos',
    },
    {
      label: 'Mis Diagnósticos',
      href: '/mis-diagnosticos',
    },
    {
      label: 'Citas agendadas',
      href: '/mis-reuniones',
    },
  ];

  return (
    <div className="col-span-3">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                block text-lg px-4 py-2 transition-colors
                ${isActive 
                  ? 'font-medium text-deepblue border-r-4 border-aqua' 
                  : 'text-deepblue hover:bg-gray-100'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}