"use client";
import { useState, useEffect } from "react";
import { useAuthModal } from "@/store/useAuthModal";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

export default function AuthModal() {
  const { isOpen, isLogin, closeModal } = useAuthModal();
  const [isCompany, setIsCompany] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña

  useEffect(() => {
    // Solo abrir el modal si no está previamente cerrado
    const modalShown = localStorage.getItem("modalShown");

    if (!modalShown) {
      // Si el modal no se ha mostrado, abrirlo y marcarlo en localStorage
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleToggle = () => {
    setIsCompany((prev) => !prev);
  };

  const { openModal } = useAuthModal();

  return (
    <div className={`fixed overflow-auto inset-0 bg-deepblue bg-opacity-60 flex items-center justify-center z-50 ${!isOpen && "hidden"}`}>
      <div className="p-8 w-96 text-start relative text-white top-14">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <form>
          {!isLogin && (
            <>
              <label htmlFor="name">Nombre/s</label>
              <input
                type="text"
                placeholder="Ej. Juan"
                className="bg-white text-black mb-6 w-full py-2 px-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          {!isLogin && (
            <>
              <label htmlFor="name">Apellido/s</label>
              <input
                type="text"
                placeholder="Ej. Perez"
                className="bg-white text-black mb-6 w-full py-2 px-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="tuemail@correo.com"
            className="bg-white text-black mb-6 w-full py-2 px-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Cambia el tipo de entrada
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            className={`bg-white text-black pr-10 ${!isLogin && "mb-6"} w-full py-2 px-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
              className="absolute top-3 right-3 flex items-center text-sm leading-5 text-black"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>

          </div>
          {!isLogin && (
            <>
              <label htmlFor="confirm-password">Repetir contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Cambia el tipo de entrada
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  className="bg-white text-black pr-10 mb-6 w-full py-2 px-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alternar visibilidad
                  className="absolute top-3 right-3 flex items-center text-sm leading-5 text-black"
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </>
          )}

          {/* Toggle switch para seleccionar tipo de usuario */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-lg">Seleccionar tipo de usuario:</label>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-white">Emprendedor</span>
                <div
                  onClick={handleToggle}
                  className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out ${isCompany ? "bg-lavender" : "bg-aqua"} rounded-full cursor-pointer`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isCompany ? "translate-x-6" : ""
                      }`}
                  ></span>
                </div>
                <span className="text-sm text-white">Empresa</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-lavender font-bold text-deepblue py-3 rounded-sm hover:bg-white"
            onClick={closeModal}
          >
            <Link href="/mis-datos">
              {isLogin ? "Iniciar sesión" : "Registrarme"}
            </Link>
          </button>
        </form>


        {isLogin && (
              <Link href="#">
              <p className="text-center m-3">
                ¿Olvidaste tu contraseña?
              </p>
            </Link>
            )}
        {/* Link para iniciar sesión */}
        {!isLogin && (
          <div className="text-center m-2">
            <button onClick={() => openModal(true)}>
              ¿Ya tienes una cuenta? <b>Iniciar sesión</b>
            </button>
          </div>
        )}

        {/* Link para registrarse */}
        {isLogin && (
          <div className="mt-4 text-center">
            <button onClick={() => openModal(false)}>
              ¿No tienes una cuenta? <b>Regístrate</b>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={closeModal}
        className="absolute top-5 right-6 text-white hover:text-gray-700 text-2xl"
      >
        ✕
      </button>
    </div>
  );
}