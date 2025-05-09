import MarineButton from "@components/ui/MarineButton";
import useAddressStore from "@features/account/zustand/useAddressStore";
import CartQuantitySelector from "@features/cart/components/CartQuantitySelector";
import useCartStore from "@features/cart/zustand/useCartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderPreview() {
  const { address = [], mainAddress } = useAddressStore();
  const { selectedCart, getCarts, deleteCart } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState(mainAddress);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const subtotal = selectedCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleSelectAddress = (e) => {
    setSelectedAddressId(e.target.value)
    const selectAddr = address.find(addr => addr.id == e.target.value)
    console.log("address", address);
    console.log("selectAddr", selectAddr);
    
    setSelectedAddress(selectAddr)
  };

  return (
    <div class="container mx-auto py-8 px-4 md:px-14">
      <div class="mb-8">
        <h1 class="font-sans font-bold text-marine-darkBlue text-3xl">
          Keranjang Belanja Anda
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="hidden lg:grid grid-cols-12 gap-4 py-4 px-6 border-b border-gray-200 bg-gray-50">
              <div class="col-span-6 font-sans font-bold text-marine-darkBlue">
                Produk
              </div>
              <div class="col-span-2 font-sans font-bold text-marine-darkBlue text-center">
                Harga
              </div>
              <div class="col-span-2 font-sans font-bold text-marine-darkBlue text-center">
                Jumlah
              </div>
              <div class="col-span-2 font-sans font-bold text-marine-darkBlue text-right">
                Total
              </div>
            </div>

            {selectedCart.length > 0 ? (
              <div>
                {selectedCart.map((item) => (
                  <div className="border-b flex justify-start items-center gap-2 lg:gap-1 py-4 px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      <div class="col-span-6">
                        <div class="flex items-center">
                          <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={
                                "https://down-id.img.susercontent.com/file/id-11134207-7r98y-lvobtdwybblw56"
                              }
                              alt={"Image"}
                              class="w-full h-full object-cover"
                            />
                          </div>
                          <div class="ml-4">
                            <h3 class="font-sans font-bold text-marine-darkBlue">
                              {item.product.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div class="col-span-2 font-sans text-gray-700 text-center">
                        Rp {item.product.price.toLocaleString()}
                      </div>

                      <div class="col-span-2 flex justify-center">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className={`opacity-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors`}
                            aria-label="Decrease quantity"
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
                            >
                              <path d="M5 12h14"></path>
                            </svg>
                          </button>

                          <input
                            type="text"
                            className={`w-16 h-10 text-center font-sans focus:outline-none focus:ring-1 bg-white focus:ring-marine-blue`}
                            aria-label="Quantity"
                            disabled
                            value={item.quantity}
                          />

                          <button
                            type="button"
                            className={`opacity-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors`}
                            aria-label="Increase quantity"
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
                            >
                              <path d="M12 5v14"></path>
                              <path d="M5 12h14"></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="hidden lg:block col-span-2 font-sans font-bold text-marine-darkBlue text-right">
                        Rp
                        {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div class="py-12 px-6 text-center">
                <div class="mb-6">
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
                    class="mx-auto text-gray-400"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <h3 class="font-sans font-bold text-marine-darkBlue text-xl mb-2">
                  Keranjang Anda kosong
                </h3>
                <p class="font-sans text-gray-600 mb-6">
                  Sepertinya Anda belum menambahkan produk apa pun.
                </p>
                <MarineButton
                  as="a"
                  href="/products"
                  variant="primary"
                  size="md"
                  client:load
                >
                  Jelajahi Produk
                </MarineButton>
              </div>
            )}

            <div class="hidden lg:flex py-4 border-t border-gray-200 flex-wrap gap-4 justify-end items-center bg-gray-50">
              {/* <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Kode Kupon"
                  class="w-48 h-10 border border-gray-300 rounded-lg px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-marine-blue"
                />
                <button class="ml-2 h-10 px-4 bg-marine-blue text-white rounded-lg font-sans font-bold hover:bg-marine-darkBlue transition-colors">
                  Terapkan
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div class="lg:sticky lg:top-2 lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <div class="flex justify-between mb-6">
                <span class="text-xl font-sans font-bold text-marine-darkBlue">
                  Pilih Alamat
                </span>
              </div>

              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-marine-blue"
                  aria-label="Select Address"
                    value={selectedAddressId}
                    onChange={handleSelectAddress}
                >
                  {address.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.recipientName}, {addr.address}, {addr.city}, {addr.phone}
                    </option>
                  ))}
                </select>

                <div
                  key={selectedAddress.id}
                  className={`w-full text-left p-4 border rounded-lg border-blue-500 bg-blue-50`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-slate-700">
                      {selectedAddress.addressType}{" "}
                        <span className="text-sm text-blue-500">(Dipilih)</span>
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Penerima:</strong> {selectedAddress.recipientName}
                    </p>
                    <p>
                      <strong>Telepon:</strong> {selectedAddress.phone}
                    </p>
                    <p>
                      <strong>Alamat:</strong> {selectedAddress.address},{" "}
                      {selectedAddress.city}, {selectedAddress.province},{" "}
                      {selectedAddress.postalCode}
                    </p>
                    <p>
                      <strong>Negara:</strong> {selectedAddress.country}
                    </p>
                    {selectedAddress.notes && (
                      <p>
                        <strong>Catatan:</strong> {selectedAddress.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden mt-4">
            <div class="hidden lg:block py-4 px-6 border-b border-gray-200 bg-gray-50">
              <h2 class="font-sans font-bold text-marine-darkBlue text-lg -mb-1">
                Ringkasan Pesanan
              </h2>
            </div>

            <div class="p-6">
              {/* <div class="flex justify-between mb-3">
                <span class="font-sans text-gray-600">Subtotal</span>
                <span class="font-sans font-medium text-marine-darkBlue">
                  Rp{subtotal.toLocaleString()}
                </span>
              </div> */}

              {/* <div class="flex justify-between mb-3">
                <span class="font-sans text-gray-600">Diskon (10%)</span>
                <span class="font-sans font-medium text-green-600">
                  -Rp{discount.toLocaleString()}
                </span>
              </div> */}

              {/* <div class="flex justify-between mb-4">
                <span class="font-sans text-gray-600">Biaya Pengiriman</span>
                <span class="font-sans font-medium text-marine-darkBlue">
                  Rp{deliveryFee.toLocaleString()}
                </span>
              </div> */}

              {/* <div class="border-t border-gray-200 my-4"></div> */}

              <div class="flex justify-between mb-6">
                <span class="text-xl font-sans font-bold text-marine-darkBlue">
                  Total
                </span>
                <span class="font-sans font-bold text-marine-darkBlue text-xl">
                  Rp{subtotal.toLocaleString()}
                </span>
              </div>

              <MarineButton
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-md hover:shadow-lg"
                client:load
              >
                Buat Pesanan
              </MarineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
