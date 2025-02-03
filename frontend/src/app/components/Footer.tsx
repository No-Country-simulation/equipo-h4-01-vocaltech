import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
<footer className="bg-deepblue text-white py-4">
  <div className="container h-40 mx-auto px-4 py-1 my-2 flex items-center justify-between">
    {/* Vocaltech Logo */}
    <Link href="/"> 
      <Image 
        src="/img/vocaltech-logo-white.svg" 
        alt="Vocaltech" 
        width={275} 
        height={38}  
      />
    </Link>

    {/* Container for the other two logos */}
    <div className="flex items-center space-x-8">
      <Link href="https://inesmonescazon.com.ar/"> 
        <Image 
          src="/img/nocountry.svg" 
          alt="Vos y tu Voz" 
          width={83} 
          height={60}  
        />
      </Link>
      <Link href="https://www.nocountry.tech/"> 
        <Image 
          src="/img/vosytuvoz.svg" 
          alt="No Country" 
          width={174} 
          height={23}  
        />
      </Link>
    </div>
  </div>
</footer>

  );
};

export default Footer;
