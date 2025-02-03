import { FC, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-lightpink">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
