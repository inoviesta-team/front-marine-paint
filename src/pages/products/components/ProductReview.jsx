import NotFound from "@components/ui/NotFound";
import { ratingApi } from "@features/rating/api/ratingApi";
import { Rating } from "@smastrom/react-rating";
import { valueUtil } from "@utils/valueUtil";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProductReview({ productId }) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    if (!productId) return;

    const res = await ratingApi.getRatingByProductId(productId);

    if (res?.data?.status) {
      setReviews(res.data.data);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  console.log("reviews: ", reviews);

  return (
    <div className="space-y-3">
      {reviews.length > 0
        ? reviews.map((review, index) => (
            <div key={`reviews-${index}`} className="md:max-w-xl">
              <p className="text-md text-marine-darkBlue font-semibold">
                {review?.user?.name}
                {/* <span className="text-sm">
            {" "}-{" "}{valueUtil.formatDistanceToNow(reviews.createdAt)}
            </span> */}
              </p>
              <div className="flex items-center text-[#FFA52F] my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={`stars-${i}`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={i < review.rating ? "#FFA52F" : "white"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  ({review.rating})
                </span>
              </div>
              <p className="text-marine-darkBlue text-base">{review.comment}</p>
            </div>
          ))
        : <NotFound message="Belum ada ulasan" />}
    </div>
  );
}
