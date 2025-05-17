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

  // console.log("reviews: ", reviews);

  return (
    <div className="space-y-3">
      {reviews.length > 0 ? (
        <>
          <div className="mb-6">
            <RatingAndReviews dataReviews={reviews} />
          </div>
          {reviews.map((review, index) => (
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
                    key={`star-${i}`}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    width="18"
                    height="18"
                    fill={i < review.rating ? "#FFA52F" : "white"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  // <svg
                  //   key={`stars-${i}`}
                  // width="18"
                  // height="18"
                  //   viewBox="0 0 24 24"
                  //   fill={i < review.rating ? "#FFA52F" : "white"}
                  //   stroke="currentColor"
                  //   strokeWidth="2"
                  //   strokeLinecap="round"
                  //   strokeLinejoin="round"
                  //   className="mr-1"
                  // >
                  //   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  // </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  ({review.rating})
                </span>
              </div>
              <p className="text-marine-darkBlue text-base">{review.comment}</p>
            </div>
          ))}
        </>
      ) : (
        <NotFound message="Belum ada ulasan" />
      )}
    </div>
  );
}

const RatingAndReviews = ({ dataReviews }) => {
  const [reviews, setReviews] = useState(dataReviews);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const countRatingsByStars = () => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[5 - review.rating]++;
      }
    });
    return counts;
  };

  const averageRating = calculateAverageRating();
  const ratingCounts = countRatingsByStars();
  const totalReviews = reviews.length;

  const calculatePercentage = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-[#FFA52F]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-[#FFA52F]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg max-w-md">
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Rating dan ulasan</h2>
        <button className="text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}

      {/* <p className="text-sm text-gray-600 mb-6">
        Rating dan ulasan diverifikasi dan berasal dari orang yang menggunakan jenis perangkat yang sama dengan yang Anda gunakan{" "}
        <span className="inline-block">
          <svg className="w-4 h-4 inline text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </p> */}

      <div className="flex items-start mb-6">
        <div className="mr-6">
          <div className="text-5xl sm:text-6xl font-bold text-gray-800">
            {averageRating}
          </div>
          <div className="flex mt-1 mb-2">
            {renderStars(parseFloat(averageRating))}
          </div>
          <p className="text-sm text-gray-600">({totalReviews} ulasan)</p>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={star} className="flex items-center mb-1">
              <span className="w-3 text-xs text-gray-600">{star}</span>
              <div className="w-full h-2 mx-2 bg-marine-lightBlue/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-marine-blue rounded-full"
                  style={{
                    width: `${calculatePercentage(ratingCounts[index])}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
