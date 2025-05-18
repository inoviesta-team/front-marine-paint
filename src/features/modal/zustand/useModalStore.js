import { create } from "zustand";

const useModalStore = create(
  (set) => ({
    isShowModal: false,
    modalType: "INFO",
    modalVariant: "DEFAULT",
    headMessage: "Toko Koko Lie",
    message: "Halo Apa Kabar?",
    onConfirm: () => {},

    showModal: (modalType = "INFO", modalVariant = "DEFAULT", headMessage = "Toko Koko Lie", message = "Halo Apa Kabar?", onConfirm = () => {}) => {
      set({ isShowModal: true, modalType, modalVariant, headMessage, message, onConfirm });
    },
    
    hideModal: () => {
      set({ isShowModal: false, modalType: "INFO", modalVariant: "DEFAULT", headMessage: "Toko Koko Lie", message: "Halo Apa Kabar?", onConfirm: () => {} });
    },

  }),
  {
    name: "modal-storage",
  }
);

export default useModalStore;

