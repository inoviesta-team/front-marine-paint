import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '../api/auth';
import useAddressStore from '@features/account/zustand/useAddressStore';
import useCartStore from '@features/cart/zustand/useCartStore';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {},
      isAuthenticated: false,
      loading: false,
      error: null,
      
      setError: (error) => set({ error: error }),

      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await authApi.getCurrentUser();

          const user = res?.data?.data

          const accessToken = localStorage.getItem("accessToken");
          const payload = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : null;
          console.log("payload: ", payload);
          console.log("user: ", user);
          

          if(
            payload?.id !== user?.id || 
            payload?.email !== user?.email
          ) {
            useAuthStore.getState().logout();
            return
          }
          

          if(user?.id) {
            set({ user, isAuthenticated: true, loading: false });
            useAddressStore.getState().getAddress();
            useCartStore.getState().getCarts();
          }
          set({ loading: false });
        } catch (err) {
          // console.error('Failed to load user:', err);

          // useAuthStore.getState().logout();
          set({ user: {}, isAuthenticated: false, loading: false });
          authApi.logout();
        }
      },

      login: async (request) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.login(request);
          await localStorage.setItem("accessToken", res?.data?.data?.accessToken);
          await localStorage.setItem("refreshToken", res?.data?.data?.refreshToken);
          useAuthStore.getState().checkAuth();
          // useAddressStore.getState().getAddress()
        } catch (err) {
          set({ error: err || 'Login failed', loading: false });
          throw err;
        }
      },

      register: async (request) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.register(request);
          await localStorage.setItem("accessToken", res?.data?.data?.token);
          useAuthStore.getState().checkAuth();
          // set({ user: res?.data?.data?.user, isAuthenticated: true, loading: false });
          // useAddressStore.getState().getAddress()
          return res;
        } catch (err) {
          set({ error: err || 'Registration failed', loading: false });
          throw err;
        }
      },

      editProfile: async (request) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.editProfile(request);
          useAuthStore.getState().checkAuth();
        } catch (err) {
          set({ error: err || 'Edit profile failed', loading: false });
          throw err;
        }
      },

      changePassword: async (request) => {
        try {
          await authApi.changePassword(request);
          // useAuthStore.getState().checkAuth();
        } catch (err) {
          set({ error: err || 'Edit profile failed', loading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        authApi.logout();
        await localStorage.removeItem("accessToken");
        set({ user: {}, isAuthenticated: false, loading: false });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

if (typeof window !== 'undefined') {
  useAuthStore.getState().checkAuth();
}

export default useAuthStore;