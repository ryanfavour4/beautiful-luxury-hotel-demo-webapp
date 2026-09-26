import { useState } from "react";
import EmptyState from "./empty-state";
import WriteReview from "./write-review";
import { Icon } from "@iconify/react";
export const Reviews = [
  {
    id: 1,
    status: "posted", // or "rejected"
    reviewerName: "Emily Morgan",
    propertyName: "Golden Tulip Reservation",
    date: "24 Oct 2024",
    rating: {
      score: 3.0,
      label: "Poor",
    },
    headline: "The receptionist was a good guy.",
    reviewText:
      "It doesn't have any daily cleaning or towel changing. It doesn't have any liquid soap; it was empty. The kitchen didn't have any dishwashing liquid.",
    helpfulCount: 2,
    propertyResponse: {
      message:
        "Hi Anna, we are very sorry for this feedback. Our property is a short-let house, not a hotel. Therefore, daily cleaning and towel changes are not foreseen in this type of short let...",
    },
    images: "/image/chillingroom1.jpg",
  },

  {
    id: 2,
    status: "rejected",
    reviewerName: "Emily Morgan",
    propertyName: "Forest Cabin Reservation",
    date: "24 Jul 2023",
    rating: {
      score: 3.0,
      label: "Poor",
    },
    headline: "",
    reviewText: "Nothing was good. It was my worst experience.",
    helpfulCount: 0,
    propertyResponse: null,
    images: "/image/chillingroom5.jpg",
  },
  {
    id: 3,
    status: "pending",
    reviewerName: "Emily Morgan",
    propertyName: "Forest Cabin Reservation",
    date: "24 Jul 2023",
    rating: {
      score: 3.0,
      label: "Poor",
    },
    headline: "",
    reviewText: "Nothing was good. It was my worst experience.",
    helpfulCount: 0,
    propertyResponse: null,
    images: "/image/chillingroom5.jpg",
  },
];

const Index = () => {
  const [reviewModal, setReviewModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews] = useState<any[]>(Reviews);
  const pendingReviews = reviews.filter((item) => item.status === "pending");

  return (
    <div className="lg:ml-4">
      {reviewModal && (
        <WriteReview onCancel={() => setReviewModal(false)} reviewModal={reviewModal} />
      )}
      {reviews.length > 0 ? (
        <AllReviews pendingReviews={pendingReviews} />
      ) : (
        <EmptyState openModal={() => setReviewModal(true)} />
      )}
    </div>
  );
};

export default Index;

type props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingReviews: any[];
};
export const AllReviews = ({ pendingReviews }: props) => {
  return (
    <>
      <div className="flex w-full flex-col rounded-2xl bg-light px-6 py-6">
        {Reviews.filter((item) => item.status !== "pending").map((rev) => (
          <div key={rev.id} className="flex w-full items-start justify-between">
            <div className="flex w-full flex-col items-start justify-normal gap-4 md:flex-row">
              <img className="size-32 rounded-lg" src={rev.images} />
              <div className="flex flex-col items-start justify-center gap-3">
                <p
                  className={`w-fit rounded-2xl border ${rev.status === "posted" ? `border-success text-success` : rev.status === "pending" ? `border-warning text-warning` : `border-error text-error`} px-2 py-1 text-xs`}
                >
                  Review {rev.status}
                </p>
                <p className="font-medium text-dark/50">
                  You reviewed{" "}
                  <span className="cursor-pointer text-primary underline">{rev.propertyName}</span>
                </p>
                <p className="font-medium text-neutral-500">{rev.date}</p>
                <div className="flex items-center justify-normal gap-1 text-blue-900">
                  <p className="w-fit rounded-l-full rounded-br-full border border-blue-900 bg-neutral-100 px-2 py-1 text-sm font-semibold">
                    {rev.rating.score.toFixed(1)}
                  </p>
                  <p className="font-semibold">{rev.rating.label}</p>
                </div>
                <div className="flex w-full items-center justify-normal gap-2">
                  <Icon icon={"heroicons:face-smile"} color="#77a0e0" className="size-8 shrink-0" />
                  <p>{rev.reviewText}</p>
                </div>
                <div className="flex w-auto items-center justify-normal gap-2">
                  <Icon icon={"heroicons:face-smile"} className="size-8 shrink-0" />
                  <p>
                    It doesn’t have any daily cleaning or towel changing. It doesn’t have any liquid
                    soap; it was empty. The kitchen didn’t have any dishwashing liquid.
                  </p>
                </div>
                {rev.helpfulCount > 0 && (
                  <div className="w-full">
                    <hr className="my-4 h-[1px] bg-neutral-300" />
                    <div className="flex items-center justify-normal gap-2">
                      <Icon icon={"mdi:like"} fontSize={20} />
                      <p>{rev.helpfulCount} people found this review helpful</p>
                    </div>
                  </div>
                )}
                {rev.propertyResponse?.message && (
                  <div className="my-6 flex flex-col gap-2 rounded-lg bg-gray-200 p-6">
                    <div className="flex items-center justify-normal gap-2 text-xl font-bold text-dark">
                      <Icon icon={"fa6-solid:comments"} fontSize={20} />
                      <p>Property Response</p>
                    </div>
                    <p>{rev.propertyResponse?.message}</p>
                  </div>
                )}
              </div>
            </div>
            <Icon icon={"ri:more-2-line"} className="size-6 shrink-0 cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex w-full flex-col rounded-2xl bg-light px-6 py-6">
        {pendingReviews.map((rev) => (
          <div key={rev.id} className="flex w-full items-start justify-between">
            <div className="flex flex-col items-start justify-normal gap-4 md:flex-row">
              <img className="size-32 rounded-lg" src={rev.images} />
              <div className="flex flex-col items-start justify-normal gap-3">
                <p
                  className={`w-fit rounded-2xl border ${rev.status === "posted" ? `border-success text-success` : rev.status === "pending" ? `border-warning text-warning` : `border-error text-error`} px-2 py-1 text-xs`}
                >
                  Review {rev.status}
                </p>
                <p>
                  {rev.headline}
                  You reviewed{" "}
                  <span className="cursor-pointer text-primary underline">{rev.propertyName}</span>
                </p>
                <p className="font-medium text-neutral-500">{rev.date}</p>
                <div className="flex items-center justify-normal gap-1 text-blue-900">
                  <p className="w-fit rounded-l-full rounded-br-full border border-blue-900 bg-neutral-200 px-2 py-1 text-sm font-semibold">
                    {rev.rating.score.toFixed(1)}
                  </p>
                  <p className="font-semibold">{rev.rating.label}</p>
                </div>
                <div className="flex items-center justify-normal gap-2">
                  <Icon icon={"heroicons:face-smile"} color="#77a0e0" className="size-8 shrink-0" />
                  <p>{rev.reviewText}</p>
                </div>

                {rev.helpfulCount > 0 && (
                  <>
                    <hr className="my-4" />
                    <div className="flex items-center justify-normal gap-2">
                      <Icon icon={"mdi:like"} fontSize={20} />
                      <p>{rev.helpfulCount} people found this review helpful</p>
                    </div>
                  </>
                )}
                {rev.propertyResponse?.message && (
                  <div className="my-6 flex flex-col gap-2 rounded-lg bg-gray-200 p-4 md:p-6">
                    <div className="flex items-center justify-normal gap-2 text-xl font-bold text-dark">
                      <Icon icon={"fa6-solid:comments"} fontSize={20} />
                      <p>Property Response</p>
                    </div>
                    <p>{rev.propertyResponse?.message}</p>
                  </div>
                )}
              </div>
            </div>
            <Icon icon={"ri:more-2-line"} className="size-6 cursor-pointer" />
          </div>
        ))}
      </div>
    </>
  );
};
