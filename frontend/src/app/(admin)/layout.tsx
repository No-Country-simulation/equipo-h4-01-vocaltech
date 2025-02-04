import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '../(public)/components/Navbar';
import Footer from '../(public)/components/Footer';

export const metadata: Metadata = {
  title: 'VocalTech',
  description: 'Transmití tus ideas, transformá con tu voz',
  icons: {
    icon: '/img/favicon.ico',
    shortcut: '/img/favicon.ico',
    apple: '/img/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-lightpink">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
