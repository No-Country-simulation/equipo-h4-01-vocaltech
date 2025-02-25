"use client"
import React, { FC, ReactNode, useState, useEffect} from "react";
import Loading from "../loading";


type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
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
    <div className="flex flex-col min-h-screen bg-lightpink">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
