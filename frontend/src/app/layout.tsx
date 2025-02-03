import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import AuthModal from "./(public)/(home)/components/AuthModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "VocalTech",
  description: "Transmití tus ideas, transformá con tu voz",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
    apple: "/img/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="max-w-screen-fourK mx-auto">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <AuthModal />
      </body>
    </html>
  );
}
