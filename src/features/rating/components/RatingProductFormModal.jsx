import MarineButton from "@components/ui/MarineButton";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { X } from "lucide-react";
import React, { useState } from "react";
import { ratingApi } from "../api/ratingApi";

export default function RatingProductFormModal({
  getRatingMe,
  orderJsonData,
  setOrderJsonData,
  product = {},
  orderId,
  showModal,
  handleCloseModal,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitRating = async () => {
    const request = {
      productId: product.id,
      orderId,
      rating,
      comment,
    };

    const res = await ratingApi.createRating(request)    

    if(res?.data?.status) {
        await getRatingMe()
        handleCloseModal()
    }
  };

  return (
    <>
      {showModal && (
        <div className="overflow-y-scroll xl:overflow-y-hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 md:p-8">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full h-auto max-w-3xl shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl text-marine-darkBlue">Berikan Ulasan</h1>
              <button onClick={handleCloseModal}>
                <X />
              </button>
            </div>

            <Rating
              halfFillMode="svg"
              transition="zoom"
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />

            <input
              id="notes"
              name="notes"
              value={comment}
              defaultValue={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-marine-blue focus:border-transparent my-4"
              placeholder="Ulasan anda..."
            />
            <MarineButton
              onClick={handleSubmitRating}
              className="w-full sm:w-auto"
            >
              Submit Ulasan
            </MarineButton>
          </div>
        </div>
      )}
    </>
  );
}
