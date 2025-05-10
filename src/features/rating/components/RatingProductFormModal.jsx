import { X } from "lucide-react";
import React from "react";

export default function RatingProductFormModal({
  product = {},
  orderId,
  showModal,
  handleCloseModal,
}) {
  return (
    <>
      {showModal && (
        <div className="overflow-y-scroll xl:overflow-y-hidden fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 md:py-8">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full h-auto sm:h-auto max-w-3xl shadow-xl">
            <div className="flex justify-between items-center">
            <h1>Berikan Ulasan</h1>
            <button onClick={handleCloseModal}><X/></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
