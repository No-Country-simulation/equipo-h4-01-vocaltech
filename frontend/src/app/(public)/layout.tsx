"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuthModal } from "@/store/useAuthModal";

const LoginModal = () => {
  const { isOpen } = useAuthModal(); // ⚡ Ahora está correctamente definido

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

};

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-lightpink">
      <LoginModal /> {/* ⚡ Ahora el modal se renderiza dentro del Layout */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
