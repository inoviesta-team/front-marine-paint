import { create } from 'zustand';

const useModalStore = create(
  (set) => ({
    isShowModal: false,
    modalType: "INFO",
    modalVariant: "DEFAULT",
    headMessage: "Toko Koko Lie",
    message: "Halo Apa Kabar?",
    customBtnMessage: "Tutup",
    onConfirm: () => {},

    showModal: (
      modalType = 'INFO',
      modalVariant = 'DEFAULT',
      headMessage = 'Toko Koko Lie',
      message = 'Halo Apa Kabar?',
      customBtnMessage = "Tutup",
      onConfirm = () => {}
    ) => {
      set({
        isShowModal: true,
        modalType,
        modalVariant,
        headMessage,
        message,
        customBtnMessage,
        onConfirm
      });
    },

    hideModal: () => {
      set({
        isShowModal: false,
        modalType: 'INFO',
        modalVariant: 'DEFAULT',
        headMessage: 'Toko Koko Lie',
        message: 'Halo Apa Kabar?',
        customBtnMessage: "Tutup",
        onConfirm: () => {}
      });
    }
  }),
  {
    name: 'modal-storage'
  }
);

export default useModalStore;
