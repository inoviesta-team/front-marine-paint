import { valueUtil } from "@utils/valueUtil";
import { FileText } from "lucide-react";
import { paymentApi } from "../api/paymentApi";
import { orderStatus } from "../util/orderStatus";
import { useEffect, useState } from "react";
import { ratingApi } from "@features/rating/api/ratingApi";
import MarineButton from "@components/ui/MarineButton";
import RatingProductFormModal from "@features/rating/components/RatingProductFormModal";

export default function OrderDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  const orderJson = urlParams.get("orderJson");
  const orderJsonData = orderJson ? JSON.parse(orderJson) : {};
  // const [isHasRated, setIsHasRated] = useState(true)

  if (!orderId || !orderJson) return window.history.back();

  const checkIsHasRated = async () => {
    if (orderJsonData.status !== "DELIVERED") {
      return true;
    }

    if (
      orderJsonData &&
      orderJsonData?.id &&
      orderJsonData?.orderItems.length > 0
    ) {
      await orderJsonData.orderItems.map(async (order) => {
        const res = await ratingApi.checkRating(order.productId, orderId);
        const isHasRated = res?.data?.data?.hasRated;
        order.hasRated = isHasRated;
      });
    }

    // if(isHasRated === false) return <MarineButton size="xs">Berikan Ulasan</MarineButton>
  };

  const handlePaymentOrder = async () => {
    const resGetPayment = await paymentApi.getPaymentByOrderId(orderId);
    console.log("resGetPayment: ", resGetPayment);

    if (resGetPayment?.data?.status) {
      window.location.href = resGetPayment.data.data.payment_url;
      return;
    }

    const resCreatePayment = await paymentApi.createPaymentOrder(orderId);

    if (resCreatePayment?.data?.status) {
      window.location.href = resCreatePayment.data.data.invoice_url;
      return;
    }
  };

  useEffect(() => {
    checkIsHasRated();
  }, []);

  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedProductRate, setSelectedProductRate] = useState({});

  const closeRateModal = () => {
    setSelectedProductRate({});
    setShowRateModal(false);
  };

  const showRatingModal = (product) => {
    setSelectedProductRate(product);
    setShowRateModal(true);
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:px-14 space-y-8">
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            📦 Detail Pesanan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <div>
                <p className="text-gray-500">Nomor Pesanan</p>
                <p className="font-medium text-lg">
                  {orderJsonData.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-semibold text-blue-600 uppercase">
                  {orderStatus[orderJsonData.status]}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total Pembayaran</p>
                <p className="font-semibold">
                  Rp {valueUtil.formatPriceRupiah(orderJsonData.totalAmount)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-500">Tanggal Order</p>
                <p>{valueUtil.formatDateWithTime(orderJsonData.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Catatan Pembeli</p>
                <p className="italic text-gray-600">
                  {orderJsonData.notes || "-"}
                </p>
              </div>
            </div>
          </div>

          {orderJsonData.status === "PENDING" && (
            <div className="mt-6">
              <button
                onClick={handlePaymentOrder}
                className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
              >
                <FileText className="inline-block w-5 h-5 mr-1.5" />
                Bayar Pesanan
              </button>
            </div>
          )}

          <div className="mt-8">
            <p className="text-gray-500 mb-2">Alamat Pengiriman</p>
            <div className="bg-gray-50 p-4 rounded-lg border text-sm whitespace-pre-line text-gray-700">
              {orderJsonData.shippingAddress}
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-md">
          <div className="space-y-6">
            {orderJsonData?.orderItems?.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={"https://i.pravatar.cc/150"}
                  alt={item.product.name}
                  className="w-20 h-20 rounded object-cover shadow"
                />
                <div className="flex-1">
                  <p className="text-sm sm:text-md font-medium text-marine-darkBlue">
                    {item.product.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.quantity} x{" "}
                    {valueUtil.formatPriceRupiah(item.unitPrice)}
                  </p>
                  <div className="text-sm sm:text-md font-medium text-marine-darkBlue">
                    Rp {valueUtil.formatPriceRupiah(item.subtotal)}
                    {!item.isHasRated ? "AAA" : "SSS"}
                  </div>
                  {orderJsonData.status === "DELIVERED" && (
                    <>
                      {!item.isHasRated ? (
                        <MarineButton
                          onClick={() => showRatingModal(item.product)}
                          size="xs"
                        >
                          Berikan Ulasan
                        </MarineButton>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RatingProductFormModal
        showModal={showRateModal}
        handleCloseModal={closeRateModal}
        product={selectedProductRate}
        orderId={orderId}
      />
    </>
  );
}
