import MarineButton from "@components/ui/MarineButton";
import { ratingApi } from "@features/rating/api/ratingApi";
import RatingProductFormModal from "@features/rating/components/RatingProductFormModal";
import { Rating } from "@smastrom/react-rating";
import { beUrl } from "@utils/url";
import { valueUtil } from "@utils/valueUtil";
import { ClipboardCopy, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import { paymentApi } from "../api/paymentApi";
import { orderStatus } from "../util/orderStatus";
import useModalStore from "@features/modal/zustand/useModalStore";

export default function OrderDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");
  const orderJson = urlParams.get("orderJson");
  const [orderData, setOrderData] = useState({});
  const [myRating, setMyRating] = useState([]);
  const orderJsonData = orderJson ? JSON.parse(orderJson) : {};
  // const [orderJsonData, setOrderJsonData] = useState(orderJson ? JSON.parse(orderJson) : {})
  const [loading, setLoading] = useState(true);
  const { showModal: showModalStore, hideModal: hideModalStore } =
    useModalStore();

  if (!orderId || !orderJson) return window.history.back();

  const getOrderData = async () => {
    try {
      const res = await orderApi.getOrderById(orderId);
      if (res?.data?.status) {
        setOrderData(
          res?.data?.data?.id ? res?.data?.data : res?.data?.data?.data
        );
      }
    } catch (error) {
      console.log("GET ORDER BY ID ERR: ", error);
    }
  };

  const getRatingMe = async () => {
    const request = {
      page: 1,
      limit: 100,
      filter: `{"orderId": "${orderId}"}`,
    };
    const resRating = await ratingApi.getRatingMe(request);
    if (resRating?.data?.status) {
      setMyRating(resRating?.data?.data?.ratings);
    }
  };

  const checkAlreadyRated = (productId) => {
    const alreadyRated = myRating.find(
      (rating) => rating.productId == productId && rating.orderId == orderId
    );
    // console.log(`alreadyRated ${productId}: `, alreadyRated);

    return alreadyRated;
  };

  const handlePaymentOrder = async () => {
    const resGetPayment = await paymentApi.getPaymentByOrderId(orderId);
    // console.log("resGetPayment: ", resGetPayment);

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

  const handleInvoiceOrder = async (download = false) => {
    if (
      orderData.status === "PROCESSING" ||
      orderData.status === "SHIPPED" ||
      orderData.status === "DELIVERED"
    ) {
      const res = await orderApi.getInvoiceOrder(orderData.id);
      if (res?.data.status) {
        const base64Data = res?.data?.data?.data?.data; // base64 string tanpa prefix
        const fileName =
          res?.data?.data?.data?.filename || `invoice-${orderData.id}.pdf`;

        // Decode base64 ke binary
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Buat URL dari Blob
        const url = window.URL.createObjectURL(blob);

        if (download) {
          // Download PDF
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          // Preview PDF di tab baru
          window.open(url, "_blank");
        }

        // Hapus URL setelah digunakan
        window.URL.revokeObjectURL(url);
      }
    }
  };

  useEffect(() => {
    getOrderData();
    getRatingMe();
    // (async () => {
    //   await ;
    // })();
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

  const handleCopyResi = () => {
    navigator.clipboard.writeText(orderData.trackingNumber);
    showModalStore(
      "INFO",
      "SUCCESS",
      "Resi Berhasil Disalin!",
      orderData.trackingNumber,
      "Tutup",
      null
    );
  };
  // console.log("orderData: ", orderData);

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
                <p className="font-medium text-lg">{orderData.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-semibold text-blue-600 uppercase">
                  {orderStatus[orderData.status]}
                </p>
              </div>
              {(orderData.status === "DELIVERED" ||
                orderData.status === "SHIPPED") && (
                <div>
                  <p className="text-gray-500">No. Resi Pengiriman</p>
                  <button
                    onClick={handleCopyResi}
                    className="flex items-center gap-1 font-semibold text-base text-marine-blue"
                  >
                    <span>{orderData?.trackingNumber}</span>{" "}
                    <ClipboardCopy size={18} color="#252525" />
                  </button>
                </div>
              )}
              <div>
                <p className="text-gray-500">Total Pembayaran</p>
                <p className="font-semibold">
                  Rp {valueUtil.formatPriceRupiah(orderData.totalAmount)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-500">Tanggal Order</p>
                <p>{valueUtil.formatDateWithTime(orderData.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Catatan Pembeli</p>
                <p className="italic text-gray-600">{orderData.notes || "-"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center' gap-2">
            {orderData.status === "PENDING" && (
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
            {(orderData.status === "DELIVERED" ||
              orderData.status === "SHIPPED" ||
              orderData.status === "PROCESSING") && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <MarineButton
                  onClick={() => handleInvoiceOrder(false)}
                  variant="tertiary"
                  className="rounded-lg"
                >
                  <FileText className="inline-block w-5 h-5 mr-1.5" />
                  Lihat Invoice
                </MarineButton>
                <MarineButton
                  onClick={() => handleInvoiceOrder(true)}
                  className="rounded-lg"
                >
                  <Download className="inline-block w-5 h-5 mr-1.5" />
                  Download Invoice
                </MarineButton>
              </div>
            )}
          </div>

          <div className="mt-8">
            <p className="text-gray-500 mb-2">Alamat Pengiriman</p>
            <div className="bg-gray-50 p-4 rounded-lg border text-sm whitespace-pre-line text-gray-700">
              {orderData.shippingAddress}
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-md">
          <div className="space-y-6">
            {orderJsonData?.orderItems?.map((item, index) => {
              const rating = checkAlreadyRated(item.productId);
              const image =
                item?.product?.media?.length > 0 &&
                (item?.product?.media.find((image) => image.isMain == true) ||
                  item?.product?.media[0]);
              return (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={
                      image?.id
                        ? beUrl + image.filePath
                        : "/images/no-image.png"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover shadow"
                    onError={(e) => {
                      e.target.src = "/images/no-image.png";
                    }}
                  />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm sm:text-md font-medium text-marine-darkBlue">
                      {item.product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.quantity} x{" "}
                      {valueUtil.formatPriceRupiah(item.unitPrice)}
                    </p>
                    <div className="text-sm sm:text-md font-medium text-marine-darkBlue">
                      Rp {valueUtil.formatPriceRupiah(item.subtotal)}
                    </div>
                    {orderData.status === "DELIVERED" && (
                      <>
                        {!rating?.id ? (
                          <MarineButton
                            onClick={() => showRatingModal(item.product)}
                            size="xs"
                          >
                            Berikan Ulasan
                          </MarineButton>
                        ) : (
                          <div className="flex flex-wrap justify-start items-center gap-x-2 gap-y-1">
                            <Rating
                              readOnly
                              halfFillMode="svg"
                              style={{ maxWidth: 80 }}
                              value={rating.rating}
                            />
                            <p className="line-clamp-2 text-marine-darkBlue text-sm">
                              <span className="hidden sm:inline">(</span>Ulasan:{" "}
                              {rating.comment}
                              <span className="hidden sm:inline">)</span>
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <RatingProductFormModal
        getRatingMe={getRatingMe}
        orderJsonData={orderJsonData}
        showModal={showRateModal}
        handleCloseModal={closeRateModal}
        product={selectedProductRate}
        orderId={orderId}
      />
    </>
  );
}
