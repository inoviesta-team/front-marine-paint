import NotFound from "@components/ui/NotFound";
import AccountLayout from "@features/account/layout/AccountLayout";
import { valueUtil } from "@utils/valueUtil";
import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import { orderStatus } from "../util/orderStatus";

export default function OrderHistory() {
  const urlParams = new URLSearchParams(window.location.search);
  const statusDefault = urlParams.get("statusDefault") || "PENDING";
  
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orders, setOrder] = useState([]);
  const [status, setStatus] = useState(statusDefault);
  const getOrders = async () => {
    const res = await orderApi.getOrders({
      page: 1,
      limit: 100,
      status,
    });

    setOrder(res?.data?.data?.orders);
  };

  console.log("orders: ", orders);

  useEffect(() => {
    getOrders();
  }, [status]);

  const tabBar = [
    "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"
  ]

  return (
    <AccountLayout>
      <h2 className="text-2xl font-semibold mb-4">History Order</h2>

      {/* Filter tabs */}
      <div className="overflow-x-auto mb-6">
        <div className="flex gap-3 md:gap-4">
          {tabBar.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`min-w-32 w-8 h-12 ${
                status === tab ? "bg-blue-100 text-blue-600" : "bg-gray-100 border border-gray-200 text-gray-700"
              } rounded-full`}
            >
              {orderStatus[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {orders.length > 0 ? orders.map((order) => (
          <div
            key={order.orderNumber}
            className="border rounded-xl p-4 bg-white shadow-md"
          >
            <a
              href={`/order/order-detail?orderId=${
                order.id
              }&orderJson=${JSON.stringify(order)}`}
              className="flex justify-between items-center mb-4 border-b p-2"
            >
              <div className="text-lg text-marine-darkBlue">
                {order.orderNumber}{" "}
                <span className="hidden sm:inline-block">-</span>{" "}
                <br className="sm:hidden" />{" "}
                {valueUtil.formatDate(order.createdAt)}
              </div>
              <div className="hidden sm:inline-block text-blue-600 text-md uppercase">
                {orderStatus[order.status]}
              </div>
            </a>
            <a
              href={`/order/order-detail?orderId=${
                order.id
              }&orderJson=${JSON.stringify(order)}`}
              className="space-y-6"
            >
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={
                      item?.product?.media[0]?.url ||
                      "https://i.pravatar.cc/150"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover shadow"
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
                  </div>
                </div>
              ))}
            </a>
          </div>
        )) : <NotFound message="Order Tidak Ditemukan" />}
      </div>
    </AccountLayout>
  );
}
