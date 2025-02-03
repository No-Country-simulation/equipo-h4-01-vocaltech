import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  isLogin: boolean;
  userType: "empresa" | "emprendedor";
  openModal: (isLogin: boolean) => void;
  closeModal: () => void;
  setUserType: (type: "empresa" | "emprendedor") => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  isLogin: true,
  userType: "empresa",
  openModal: (isLogin) => set({ isOpen: true, isLogin }),
  closeModal: () => set({ isOpen: false }),
  setUserType: (type) => set({ userType: type }),
}));
