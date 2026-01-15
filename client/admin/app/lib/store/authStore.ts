import { create } from "zustand";
import api from "~/lib/api/axios";

interface AuthState {
  isAuthenticated: boolean;
  checkingAuth: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  checkingAuth: true,

  /**
   * Ask backend whether the current session cookie is valid
   * This must run ONCE when the app loads
   */
  checkAuth: async () => {
    try {
      await api.get("/auth/check");
      set({
        isAuthenticated: true,
        checkingAuth: false,
      });
    } catch {
      set({
        isAuthenticated: false,
        checkingAuth: false,
      });
    }
  },

  /**
   * Logout = destroy session on backend
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      set({
        isAuthenticated: false,
        checkingAuth: false,
      });
    }
  },
}));
