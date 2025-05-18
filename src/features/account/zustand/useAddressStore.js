import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addressApi } from "../api/addressApi";

const useAddressStore = create(
  persist((set, get) => ({
    address: [],
    mainAddress: {},
    loading: false,
    error: null,

    setDefaultAddress: () => {
      set({ address: [], mainAddress: {}, loading: false, error: null });
    },

    getAddress: async () => {
      set({ loading: true });
      try {
        const res = await addressApi.getAddress();

        const addressData = res?.data?.data?.addresses;
        const sortAddressData = addressData?.sort((a, b) =>
          a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
        );

        const mainAddress = sortAddressData.filter(
          (address) => address.isDefault
        )[0];

        set({ address: sortAddressData, mainAddress, loading: false });
      } catch (err) {
        console.error("Failed to load addresses:", err);
        set({ addresses: [], mainAddress: {}, loading: false });
      }
    },
    createAddress: async (request) => {
      set({ loading: true, error: null });
      try {
        const res = await addressApi.createAddress(request);
        get().getAddress();
      } catch (err) {
        set({ error: err.message || "Create address failed", loading: false });
        throw err;
      }
    },
    updateAddress: async (addressId, request) => {
      set({ loading: true, error: null });
      try {
        const res = await addressApi.updateAddress(addressId, request);
        get().getAddress();
      } catch (err) {
        set({ error: err.message || "Update address failed", loading: false });
        throw err;
      }
    },
    deleteAddress: async (addressId) => {
      set({ loading: true, error: null });
      try {
        const res = await addressApi.deleteAddress(addressId);
        get().getAddress();
      } catch (err) {
        set({ error: err.message || "Delete address failed", loading: false });
        throw err;
      }
    },
  }))
);

export default useAddressStore;
