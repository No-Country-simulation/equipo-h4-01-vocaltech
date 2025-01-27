import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deepblue text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Vocaltech. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
