import MarineButton from "@components/ui/MarineButton";
import useAddressStore from "@features/account/zustand/useAddressStore";
import CartQuantitySelector from "@features/cart/components/CartQuantitySelector";
import useCartStore from "@features/cart/zustand/useCartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import { valueUtil } from "@utils/valueUtil";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import { paymentApi } from "../api/paymentApi";
import { productApi } from "@features/products/api/productApi";
import { beUrl } from "@utils/url";

export default function OrderPreview() {
  const { user } = useAuthStore();
  const { address = [], mainAddress } = useAddressStore();
  const { selectedCart, getCarts, deleteCart } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState(mainAddress || {});
  const [selectedAddressId, setSelectedAddressId] = useState(
    mainAddress.id || ""
  );

  const [shippings, setShippings] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState({});
  const [inputUser, setInputUser] = useState({
    notes: "",
  });

  const totalPriceProduct = selectedCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const [subtotal, setSubtotal] = useState(totalPriceProduct);
  const [images, setImages] = useState([]);

  const handleSelectAddress = (e) => {
    setSelectedAddressId(e.target.value);
    const selectAddr = address.find((addr) => addr.id == e.target.value);

    setSelectedAddress(selectAddr);
    setSelectedShipping({});
  };

  const handleSelectShipping = (e) => {
    const shipping = shippings.find(
      (shipping) => shipping.id == e.target.value
    );
    setSelectedShipping(shipping);
    setSubtotal(totalPriceProduct + shipping.cost);
  };

  const handleInputUser = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const getShippings = async () => {
    if (!selectedAddressId || !selectedCart) return;

    console.log("selectedCart: ", selectedCart);

    const totalWeight = selectedCart.reduce(
      (total, item) => total + item.product.weight,
      0
    );
    const totalValue = selectedCart.reduce(
      (total, item) => total + item.product.price,
      0
    );
    const orderItems = selectedCart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const request = {
      addressId: selectedAddressId,
      weight: 1,
      itemValue: totalValue,
      cod: "no",
      orderItems,
    };

    const res = await orderApi.getOptionByAddress(request);
    setShippings(res?.data?.data);
  };

  const getProductImages = async () => {
    const imgArr = [];

    for (let i = 0; i < selectedCart.length; i++) {
      const response = await productApi.getImageProductById(
        selectedCart[i].product.id
      );
      if (response?.data?.status && response?.data?.data?.length > 0) {
        const image =
          response.data?.data.filter((image) => image.isMain)[0] ||
          response.data?.data[0];
        imgArr.push(image);
      }
    }

    setImages(imgArr);
  };

  useEffect(() => {
    getProductImages();
  }, []);

  useEffect(() => {
    getShippings();
  }, [selectedAddressId]);


  const handleSubmitOrder = async () => {
    const orderItems = selectedCart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const request = {
      customerId: user.id,
      addressId: selectedAddressId,
      shippingMethod: selectedShipping.id,
      cod: "no",
      notes: inputUser.notes,
      orderItems,
    };

    // const request = {
    //   cartIds: selectedCart.map((item) => item.id),
    //   addressId: selectedAddressId,
    //   notes: inputUser.notes,
    // };

    console.log("req: ", request);
    const resOrder = await orderApi.createOrder(request);

    const orderId = resOrder?.data?.data?.id || "";
    const orderJsonData = resOrder?.data?.data || {};

    window.location.href = `/order/order-detail?orderId=${orderId}&orderJson=${JSON.stringify(
      orderJsonData
    )}`;
  };

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

            {selectedCart.length > 0 ? (
              <div>
                {selectedCart.map((item) => {
                  const image = images.find(
                    (img) => img.productId === item.product.id
                  );
                  return (
                    <div className="border-b flex justify-start items-center gap-2 lg:gap-1 py-4 px-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={
                                  image?.filePath
                                    ? beUrl + image.filePath
                                    : "/images/no-image.png"
                                }
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-sans font-bold text-marine-darkBlue">
                                {item.product.name}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 font-sans text-gray-700 text-center">
                          Rp {item.product.price.toLocaleString()}
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className={`cursor-default opacity-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors`}
                              aria-label="Decrease quantity"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
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
                              className={`cursor-default opacity-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors`}
                              aria-label="Increase quantity"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 5v14"></path>
                                <path d="M5 12h14"></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="hidden lg:block col-span-2 font-sans font-bold text-marine-darkBlue text-right">
                          Rp
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
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
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-2 lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden space-y-6 py-6">
            <div className="px-6">
              <div className="flex justify-between mb-3">
                <span className="text-xl font-sans font-bold text-marine-darkBlue">
                  Pilih Alamat
                </span>
              </div>

              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-marine-blue"
                  aria-label="Select Address"
                  value={selectedAddressId}
                  defaultValue={selectedAddressId}
                  onChange={handleSelectAddress}
                >
                  <option value="">-- PILIH ALAMAT --</option>
                  {address.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.recipientName}, {addr.address}, {addr.city},{" "}
                      {addr.phone}
                    </option>
                  ))}
                </select>

                <div
                  key={selectedAddress.id}
                  className={`w-full text-left p-4 border rounded-lg border-blue-500 bg-blue-50`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-slate-700">
                      {selectedAddress.recipientName}{" "}
                      {selectedAddress.isDefault && (
                        <span className="text-sm text-blue-500">(UTAMA)</span>
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
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

                <input
                  id="notes"
                  name="notes"
                  value={inputUser.notes}
                  onChange={handleInputUser}
                  type="text"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-marine-blue focus:border-transparent"
                  placeholder="Catatan untuk penjual"
                />
              </div>
            </div>

            {/* SELECT SHIPPING  */}
            <div className="px-6">
              <div className="flex justify-between mb-3">
                <span className="text-xl font-sans font-bold text-marine-darkBlue">
                  Pilih Pengiriman
                </span>
              </div>

              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-marine-blue"
                  aria-label="Select Address"
                  value={selectedShipping?.id || ""}
                  defaultValue={selectedShipping?.id || ""}
                  onChange={handleSelectShipping}
                  disabled={!selectedAddressId}
                >
                  <option selected value="">
                    -- PILIH PENGIRIMAN --
                  </option>
                  {shippings?.map((shipping) => {
                    const nameShipping = shipping.id.split("_")[0];
                    return (
                      <option key={shipping.id} value={shipping.id}>
                        {nameShipping} - RP{" "}
                        {valueUtil.formatPriceRupiah(shipping.cost)} -{" "}
                        {shipping.type.toUpperCase()} (
                        {shipping.estimatedDelivery.toUpperCase()})
                      </option>
                    );
                  })}
                </select>

                {selectedShipping?.id && (
                  <div
                    key={selectedShipping.id}
                    className={`w-full text-left p-4 border rounded-lg border-blue-500 bg-blue-50`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium text-marine-darkBlue capitalize">
                        {selectedShipping?.name}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p className="uppercase">
                        Rp {valueUtil.formatPriceRupiah(selectedShipping.cost)}{" "}
                        - {selectedShipping.type} (
                        {selectedShipping.estimatedDelivery})
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-4">
            {/* <div className="hidden lg:block py-4 px-6 border-b border-gray-200 bg-gray-50">
              <h2 className="font-sans font-bold text-marine-darkBlue text-lg -mb-1">
                Ringkasan Pesanan
              </h2>
            </div> */}

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

              <div className="mb-4 space-y-0.5">
                {/* PRODUCT PRICE */}
                {selectedCart &&
                  selectedCart.map((cart) => (
                    <div
                      key={cart.id}
                      className="flex justify-between items-center"
                    >
                      <p className="space-x-1">
                        <span className="capitalize">{cart.product.name}</span>{" "}
                        <span>x</span> <span>{cart.quantity}</span>
                      </p>
                      <p>
                        Rp{" "}
                        {valueUtil.formatPriceRupiah(
                          cart.product.price * cart.quantity
                        )}
                      </p>
                    </div>
                  ))}

                {/* SHIPPING */}
                {selectedShipping?.id && (
                  <div className="flex justify-between items-center">
                    <p className="space-x-1">
                      <span className="uppercase">{selectedShipping.name}</span>
                    </p>
                    <p>
                      Rp {valueUtil.formatPriceRupiah(selectedShipping.cost)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-sans font-bold text-marine-darkBlue">
                  Total
                </span>
                <span className="font-sans font-bold text-marine-darkBlue text-xl">
                  Rp{subtotal.toLocaleString()}
                </span>
              </div>

              <MarineButton
                onClick={handleSubmitOrder}
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
