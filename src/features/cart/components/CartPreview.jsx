import MarineButton from "@components/ui/MarineButton";
import React, { useEffect, useState } from "react";
import useCartStore from "../zustand/useCartStore";
import { ShoppingCart } from "lucide-react";
import QuantitySelector from "src/pages/products/components/QuantitySelector";
import CartQuantitySelector from "./CartQuantitySelector";
import { productApi } from "@features/products/api/productApi";
import { beUrl } from "@utils/url";

export default function CartPreview() {
  const { selectedCart, carts, getCarts, deleteCart, handleSelectedCart } = useCartStore();
  const [selectedCarts, setSelectedCarts] = useState(selectedCart);
  const [images, setImages] = useState([]);
  console.log("images: ", images);
  // console.log("selectedCart: ", selectedCart);

  const subtotal = selectedCarts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );


  const handleSelectCart = (cart) => {
    const alreadySelect = selectedCarts.filter((item) => item.id === cart.id)
    console.log("alreadySelect: ", alreadySelect);
    

    if (alreadySelect.length > 0) {
      setSelectedCarts(selectedCarts.filter((c) => c.id !== cart.id));
      handleSelectedCart(selectedCarts.filter((c) => c.id !== cart.id))
    } else {
      setSelectedCarts([...selectedCarts, cart]);
      handleSelectedCart([...selectedCarts, cart])
    }
  };

  const getProductImages = async () => {
    const imgArr = []

    for(let i = 0; i < carts.length; i++) {
      const response = await productApi.getImageProductById(carts[i].product.id)
      if(response?.data?.status && response?.data?.data?.length > 0) {
        const image = response.data?.data.filter((image) => image.isMain)[0] || response.data?.data[0]
        imgArr.push(image)
      }
    }

    setImages(imgArr)
  }

  useEffect(() => {
    getCarts()
    getProductImages()
  }, [])


  const handleCheckout = () => {
    if(selectedCarts.length <= 0) {
      return
    }

    window.location.href = "/cart/checkout"
  }

  useEffect(() => {
    const newSelectedCarts = carts.filter((cart) => selectedCarts.some((selected) => selected.id === cart.id));
    setSelectedCarts(newSelectedCarts);
    handleSelectedCart(newSelectedCarts);
  }, [carts])

  console.log("carts: ", carts);
  

  return (
    <div className="container mx-auto py-8 px-4 md:px-14">
      <div className="mb-8">
        <h1 className="font-sans font-bold text-marine-darkBlue text-3xl">
          Keranjang Belanja Anda
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden lg:grid grid-cols-12 gap-4 py-4 px-6 border-b border-gray-200 bg-gray-50">
              <div className="col-span-6 font-sans font-bold text-marine-darkBlue">
                Produk
              </div>
              <div className="col-span-2 font-sans font-bold text-marine-darkBlue text-center">
                Harga
              </div>
              <div className="col-span-2 font-sans font-bold text-marine-darkBlue text-center">
                Jumlah
              </div>
              <div className="col-span-2 font-sans font-bold text-marine-darkBlue text-right">
                Total
              </div>
            </div>

            {carts.length > 0 ? (
              <div>
                {carts.map((item) => {
                  const image = images.find((img) => img.productId === item.product.id)
                  return <div className="border-b flex justify-start items-center gap-2 lg:gap-1 py-4 px-6">
                  <input
                    id={`checkbox-${item.id}`}
                    type="checkbox"
                    className="accent-marine-darkBlue rounded border-gray-300 text-marine-blue focus:ring-marine-blue mr-0.5"
                    checked={selectedCarts.filter((selectedCart) => selectedCart.id === item.id).length > 0}
                    onChange={() => handleSelectCart(item)}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <button onClick={() => handleSelectCart(item)} className="col-span-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={image?.filePath ? beUrl + image.filePath : "/images/no-image.png"}
                            alt={item.product.name}
                            onError={(e) => {
                              e.target.src = "/images/no-image.png"
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-left font-sans font-bold text-marine-darkBlue">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => deleteCart(item.id)}
                            className="font-sans text-sm text-red-500 hover:text-red-700 flex items-center mt-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="mr-1"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </div>
                    </button>

                    <button onClick={() => handleSelectCart(item)} className="col-span-2 font-sans text-gray-700 text-center">
                      Rp {item.product.price.toLocaleString()}
                    </button>

                    <div className="col-span-2 flex justify-center">
                      <CartQuantitySelector
                        initial={item.quantity}
                        min={1}
                        max={999}
                        cart={item}
                      />
                    </div>

                    <button onClick={() => handleSelectCart(item)} className="hidden lg:block col-span-2 font-sans font-bold text-marine-darkBlue text-right">
                      Rp
                      {(item.product.price * item.quantity).toLocaleString()}
                    </button>
                  </div>
                </div>
                })}
              </div>
            ) : (
              <div className="py-12 px-6 text-center">
                <div className="mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="mx-auto text-gray-400"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-marine-darkBlue text-xl mb-2">
                  Keranjang Anda kosong
                </h3>
                <p className="font-sans text-gray-600 mb-6">
                  Sepertinya Anda belum menambahkan produk apa pun.
                </p>
                <MarineButton
                  as="a"
                  href="/products"
                  variant="primary"
                  size="md"
                  className="hover:text-white"
                  client:load
                >
                  Jelajahi Produk
                </MarineButton>
              </div>
            )}

            <div className="hidden lg:flex py-4 border-t border-gray-200 flex-wrap gap-4 justify-end items-center bg-gray-50">
              {/* <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Kode Kupon"
                  className="w-48 h-10 border border-gray-300 rounded-lg px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-marine-blue"
                />
                <button className="ml-2 h-10 px-4 bg-marine-blue text-white rounded-lg font-sans font-bold hover:bg-marine-darkBlue transition-colors">
                  Terapkan
                </button>
              </div> */}

              <a href="/products" className="h-10 px-4 bg-white border border-gray-300 text-marine-darkBlue rounded-lg font-sans hover:text-marine-darkBlue transition-colors flex items-center">
                <ShoppingCart className="mr-2" size={18} />
                Lanjutkan Belanja
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden lg:block py-4 px-6 border-b border-gray-200 bg-gray-50">
              <h2 className="font-sans font-bold text-marine-darkBlue text-lg -mb-1">
                Ringkasan Pesanan
              </h2>
            </div>

            <div className="p-6">
              {/* <div className="flex justify-between mb-3">
                <span className="font-sans text-gray-600">Subtotal</span>
                <span className="font-sans font-medium text-marine-darkBlue">
                  Rp{subtotal.toLocaleString()}
                </span>
              </div> */}

              {/* <div className="flex justify-between mb-3">
                <span className="font-sans text-gray-600">Diskon (10%)</span>
                <span className="font-sans font-medium text-green-600">
                  -Rp{discount.toLocaleString()}
                </span>
              </div> */}

              {/* <div className="flex justify-between mb-4">
                <span className="font-sans text-gray-600">Biaya Pengiriman</span>
                <span className="font-sans font-medium text-marine-darkBlue">
                  Rp{deliveryFee.toLocaleString()}
                </span>
              </div> */}

              {/* <div className="border-t border-gray-200 my-4"></div> */}

              <div className="flex justify-between mb-6">
                <span className="text-xl font-sans font-bold text-marine-darkBlue">
                  Total
                </span>
                <span className="font-sans font-bold text-marine-darkBlue text-xl">
                  Rp{subtotal.toLocaleString()}
                </span>
              </div>

              <MarineButton
                onClick={handleCheckout}
                variant="primary"
                size="lg"
                className="rounded-lg w-full justify-center shadow-md hover:shadow-lg"
                client:load
              >
                Checkout
              </MarineButton>

              <div className="mt-4 text-center">
                <a
                  href="/products"
                  className="inline-flex lg:hidden font-sans text-marine-blue hover:text-marine-darkBlue items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="mr-2"
                  >
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                  </svg>
                  Lanjutkan Belanja
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
