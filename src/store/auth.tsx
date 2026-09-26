import { create } from "zustand";
import { IAuthStore } from "./types";
import { decryptData } from "@/utils/crypt";

interface AuthState {
  auth: IAuthStore | null;
  setAuth: (auth: IAuthStore | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: decryptData(localStorage.getItem("auth")) || null,
  setAuth: (auth) => set({ auth }),
  clearAuth: () => set({ auth: null }),
}));
