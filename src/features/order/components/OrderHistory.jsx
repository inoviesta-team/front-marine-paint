import AccountLayout from "@features/account/layout/AccountLayout";
import React from "react";

const orders = [
  {
    id: "№266215",
    date: "15 ноября 2021",
    total: 6700,
    status: "В работе",
    items: [
      {
        image: "/images/jacket.jpg",
        name: "Джинсовая куртка Oversize со стеганными рукавами и заклепками",
        category: "Верхняя одежда",
        size: "S",
        color: "Голубой",
        price: 3700,
        quantity: 1,
      },
      {
        image: "/images/sweater.jpg",
        name: "Идеальный короткий свитер с кружевными вставками",
        category: "Свитера и худи",
        size: "S",
        price: 1500,
        quantity: 2,
      },
    ],
  },
  {
    id: "№258841",
    date: "12 ноября 2021",
    total: 3700,
    status: "В работе",
    items: [
      {
        image: "/images/sweater.jpg",
        name: "Идеальный короткий свитер с кружевными вставками",
        category: "Свитера и худи",
        size: "S",
        price: 3700,
        quantity: 1,
      },
    ],
  },
];

export default function OrderHistory() {
  return (
    <AccountLayout>
    <h2 className="text-2xl font-semibold mb-4">History Order</h2>

{/* Filter tabs */}
<div className="flex gap-1 md:gap-4 mb-6">
  <button className="px-2 py-1 md:px-4 md:py-2 bg-blue-100 text-blue-600 rounded-full">Belum Bayar</button>
  <button className="px-2 py-1 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-full">Dikemas</button>
  <button className="px-2 py-1 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-full">Dikirim</button>
  <button className="px-2 py-1 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-full">Batal</button>
</div>

{/* Orders */}
<div className="space-y-6">
  {orders.map((order) => (
    <div key={order.id} className="border rounded-xl p-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-4 border-b p-2">
        <div className="text-xl text-gray-600">
          Заказ <strong>{order.id}</strong> — {order.date}
        </div>
        <div className="text-blue-600 text-sm">{order.status}</div>
      </div>
      <div className="space-y-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <img src={"https://i.pravatar.cc/150"} alt={item.name} className="w-20 h-24 rounded object-cover" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category} • Размер {item.size}</p>
              {item.color && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                  {item.color}
                </span>
              )}
            </div>
            <div className="text-right text-sm">
              {item.quantity} x {item.price}
              <div className="text-lg font-semibold">{item.quantity * item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
    </AccountLayout>
  );
}
