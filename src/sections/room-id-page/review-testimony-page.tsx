import { IGetRoomTypeByIdResponse, Review } from "@/api/hooks/types";
import { useGetAllReviews } from "@/api/hooks/useReviews";
import { formatDate } from "@/utils/format-date";
import { useEffect } from "react";

export default function ReviewAndTestimony({ data }: { data: IGetRoomTypeByIdResponse }) {
  const roomType = data?.data;
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useGetAllReviews({
    roomTypeId: roomType?._id,
    page: 1,
    limit: 10,
  });
  const avgRating = Number(roomType?.rating?.average);
  const totalReviews = roomType?.rating?.totalReviews || 0;

  const performance =
    avgRating < 2
      ? { text: "Poor", color: "text-red-500", bg: "bg-red-100" }
      : avgRating < 4
        ? { text: "Good", color: "text-green-500", bg: "bg-green-100" }
        : { text: "Excellent", color: "text-sky-400", bg: "bg-sky-100" };

  const calculateRatingSummary = () => {
    if (!reviews || reviews.reviews.length === 0) {
      return [
        { stars: 5, percent: 0 },
        { stars: 4, percent: 0 },
        { stars: 3, percent: 0 },
        { stars: 2, percent: 0 },
        { stars: 1, percent: 0 },
      ];
    }

    const ratingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.reviews.forEach((review) => {
      const roundedRating = Math.round(review.rating);
      if (roundedRating >= 1 && roundedRating <= 5) {
        ratingCounts[roundedRating]++;
      }
    });

    return [5, 4, 3, 2, 1].map((star) => ({
      stars: star,
      percent: totalReviews > 0 ? Math.round((ratingCounts[star] / totalReviews) * 100) : 0,
    }));
  };

  const ratingSummary = calculateRatingSummary();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomType]);

  return (
    <div className="pt-10">
      <h1 className="mb-4 text-2xl font-bold text-dark md:text-3xl">Reviews</h1>
      <div className="mb-8 flex flex-row items-center gap-2 text-right">
        {/* rating */}
        <span
          className={`flex items-center rounded-b-lg rounded-r-lg bg-blue-100 p-2 font-semibold leading-tight text-info ${performance.bg} ${performance.color}`}
        >
          {avgRating.toFixed(1)}
        </span>
        <span className={`${performance.color} text-sm font-semibold text-info`}>
          {performance.text}
        </span>
        <span className="text-sm text-grey">{totalReviews} Reviews</span>
      </div>

      {/* overall rating */}
      <h1 className="mb-4 text-xl font-bold text-dark">Overall Rating</h1>
      <div className="w-full max-w-md space-y-3">
        {ratingSummary.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            {/* Number Only */}
            <div className="w-6 text-center text-sm font-semibold text-gray-700">{item.stars}</div>

            {/* Bar */}
            <div className="relative h-2 flex-1 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percent}%` }} />
            </div>

            {/* Percentage */}
            <span className="w-10 text-right text-sm text-gray-500">{item.percent}%</span>
          </div>
        ))}
      </div>
      {/* testimonial */}
      <div className="mt-8 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <ReviewTestimonyCardSkeleton key={i} />)
          : reviews?.reviews.map((review) => (
              <ReviewTestimonyCard review={review} key={review._id} />
            ))}
      </div>
      {/* show all review */}
      <div className="mt-6">
        <button className="rounded-xl border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white">
          Show All Reviews
        </button>
      </div>
    </div>
  );
}

export function ReviewTestimonyCard({ review }: { review: Review }) {
  return (
    <>
      <div key={review._id} className="rounded-xl border bg-white p-4 shadow-md sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Image + Name */}
          <div className="flex items-center gap-3">
            {/* Placeholder for user image */}
            {review?.userId?.avatar ? (
              <img
                src={review.userId.avatar}
                alt={review.userId.fullName}
                className="h-10 w-10 rounded-full border bg-gray-200"
              />
            ) : (
              <div className="h-10 w-10 rounded-full border bg-gray-200" />
            )}
            <div className="flex flex-col text-sm sm:text-base">
              <span className="font-semibold">{review.userId.fullName}</span>
              <span className="text-sm text-gray-500">
                {formatDate(review.createdAt).commaDateFormat}
              </span>
            </div>
          </div>

          {/* Rating */}
          <span className="flex items-center rounded-b-lg rounded-r-lg bg-blue-100 p-2 font-semibold leading-tight text-info">
            {review.rating}.0
          </span>
        </div>

        {/* Guest Text */}
        <p className="mt-3 text-sm text-gray-700">{review.comment}</p>

        {/* Button */}
        <div className="mt-6 flex justify-end">
          <button className="hover:text-whites rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Show More
          </button>
        </div>
      </div>
    </>
  );
}

export function ReviewTestimonyCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-4 shadow-md sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />

          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-3 w-16 rounded bg-gray-200" />
          </div>
        </div>

        {/* Rating */}
        <div className="h-8 w-10 rounded bg-gray-200" />
      </div>

      {/* Comment */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-end">
        <div className="h-8 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
