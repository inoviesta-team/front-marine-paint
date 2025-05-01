// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '../api/auth';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {},
      isAuthenticated: false,
      loading: false,
      error: null,

      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await authApi.getCurrentUser();
          set({ user: res?.data?.data, isAuthenticated: true, loading: false });
        } catch (err) {
          console.error('Failed to load user:', err);
          authApi.logout();
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      login: async (request) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.login(request);
          await localStorage.setItem("jwtToken", res?.data?.data?.token);
          useAuthStore.getState().checkAuth();
        } catch (err) {
          set({ error: err.message || 'Login failed', loading: false });
          throw err;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.register(userData);
          console.log("NGENTODD: ", res);
          
          set({ user: res?.data?.data?.user, isAuthenticated: true, loading: false });
          await localStorage.setItem("jwtToken", res?.data?.data?.token);
          return res;
        } catch (err) {
          set({ error: err.message || 'Registration failed', loading: false });
          throw err;
        }
      },

      // Logout user
      logout: async () => {
        authApi.logout();
        await localStorage.removeItem("jwtToken");
        set({ user: null, isAuthenticated: false });
      },

      // Reset error state
      clearError: () => set({ error: null })
    }),
    {
      name: 'token', // nama untuk local storage
      storage: createJSONStorage(() => localStorage)
    }
  )
);

if (typeof window !== 'undefined') {
  useAuthStore.getState().checkAuth();
}

export default useAuthStore;