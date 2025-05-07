import MarineButton from "@components/ui/MarineButton";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import React, { useEffect, useRef, useState } from "react";
import QuantitySelector from "./QuantitySelector";
import useCartStore from "@features/cart/zustand/useCartStore";

export default function ProductAddToCart({ product }) {
  const { isAuthenticated, user } = useAuthStore();
  const { carts, getCarts, addToCart, updateCart, deleteCart } = useCartStore();
  const backButtonRef = useRef();

  const [cart, setCart] = useState(carts.find(cart => cart.product.id === product.id) || {});
  const [quantity, setQuantity] = useState(carts.find(cart => cart.product.id === product.id)?.quantity || 1);

  useEffect(() => {
    const fetchCarts = async () => {
      await getCarts();
      const cartItem = carts.find(cart => cart.product.id === product.id);
      if (cartItem) {
        setCart(cartItem);
        setQuantity(cartItem.quantity);
      }
    };

    fetchCarts();
  }, [])

  // console.log("carts: ", carts);
  

  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) {
      backButtonRef.current.click();
      return;
    }

    const requestAddToCart = {
      productId: product.id,
      quantity: quantity
    }

    const newCart = await addToCart(requestAddToCart);

    console.log("LALA: ", newCart);
    

    setCart(newCart);
  };


  const handleUpdateCart = async (quantity) => {
    console.log("ALALALLA");
    
    const requestUpdateCart = {
      quantity
    }
    await updateCart(cart.id, requestUpdateCart);
  }

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block font-sans font-medium text-marine-darkBlue mb-2"
        >
          Jumlah
        </label>
        <QuantitySelector
          initial={1}
          min={1}
          max={product.stockQuantity || 99}
          quantity={quantity}
          setQuantity={setQuantity}
          cart={cart}
          handleUpdateCart={handleUpdateCart}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {
          !cart?.id ? (
            <MarineButton
          variant="primary"
          size="md"
          className="flex justify-center shadow-md hover:shadow-lg"
          disabled={product.stockStatus === "out-of-stock"}
          type="button"
          onClick={handleAddToCart}
        >
          {product.stockStatus === "out-of-stock"
            ? "Out of Stock"
            : "Add to Cart"}
        </MarineButton>
          ) : (
            <a href="/cart">
              <MarineButton
          variant="tertiary"
          size="md"
          className="flex justify-center shadow-md hover:shadow-lg"
          disabled={product.stockStatus === "out-of-stock"}
          type="button"
        >
          Lihat Keranjang Produk
        </MarineButton>
            </a>
          )
        }

        <MarineButton
          as="a"
          target="_blank"
          variant="secondary"
          size="md"
          className="flex items-center justify-center gap-2 bg-marine-darkBlue text-green-600 border-2 border-green-600 hover:bg-green-50 shadow-md hover:shadow-lg"
        >
          Konsultasi via WhatsApp
        </MarineButton>
      </div>

      <a ref={backButtonRef} className="hidden" href="/account/login"></a>
    </>
  );
}
