import useAddressStore from "@features/account/zustand/useAddressStore";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import useCartStore from "@features/cart/zustand/useCartStore";
import React from "react";

export default function LoadingOverlay() {
  const { loading: loadingAuth } = useAuthStore();
  const { loading: loadingAddress } = useAddressStore();
  const { loading: loadingCart } = useCartStore();

  if (loadingAuth || loadingAddress || loadingCart) {
    return (
      <div className="overflow-y-scroll xl:overflow-y-hidden fixed inset-0 z-50 min-h-screen w-full bg-marine-darkBlue/50 flex justify-center items-center">
        <img
          src="/gif/logo-animation.gif"
          alt="Toko Koko Lie"
          className="w-48"
        />
      </div>
    );
  }
}
