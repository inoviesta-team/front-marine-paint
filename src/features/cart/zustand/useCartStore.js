import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartApi } from "../api/cartApi";

const useCartStore = create(
  persist(
    (set, get) => ({
      carts: [],
      selectedCart: [],
      loading: false,
      error: null,

      setDefaultCart: () => {
        set({ loading: false, error: null, selectedCart: [], carts: [] });
      },

      handleSelectedCart: (carts) => {
        set({ selectedCart: carts });
      },

      getCarts: async (request = { limit: 100 }) => {
        set({ loading: true, error: null });
        try {
          const res = await cartApi.getCarts(request);

          const carts = res?.data?.data?.items;

          set({ carts, loading: false });
        } catch (error) {
          console.log("ADD TO CART ERR: ", error);
          set({ carts: [], loading: false, error: null });
        }
      },

      addToCart: async (request) => {
        set({ loading: true, error: null });
        try {
          const res = await cartApi.addToCart(request);
        //   await get().getCarts();
          const cartResponse = res?.data?.data;

          const newCarts = get().carts.filter((cart) => cart.id !== cartResponse.id);
          newCarts.push(cartResponse);

          await get().getCarts();
          // set({ carts: newCarts, loading: false });

          return cartResponse;
        } catch (error) {
          console.log("ADD TO CART ERR: ", error);
          set({ carts: [], loading: false, error: null });
        }
      },

      updateCart: async (cartId, request) => {
        set({ loading: true, error: null });
        try {
          const res = await cartApi.updateCart(cartId, request);
          
          await get().getCarts();
        } catch (error) {
          console.log("ADD TO CART ERR: ", error);
          set({ carts: [], loading: false, error: null });
        }
      },

      deleteCart: async (cartId) => {
        set({ loading: true, error: null });
        try {
          const res = await cartApi.deleteCart(cartId);
          await get().getCarts();
        } catch (error) {
          console.log("DELETE CART ERR: ", error);
          set({ carts: [], loading: false, error: null });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
