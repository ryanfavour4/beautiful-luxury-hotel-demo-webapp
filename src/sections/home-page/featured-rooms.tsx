import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { useGetAllRoomsTypes } from "@/api/hooks/useRoomTypes";
import { IGetAllRoomsTypesResData } from "@/api/hooks/types";

export default function FeaturedRooms() {
  const { data, isLoading } = useGetAllRoomsTypes();

  return (
    <section className="">
      <div className="container flex flex-col gap-4 px-4 pt-12 md:px-1">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark md:text-3xl">Featured Rooms</h1>

          <Link to={`/all-rooms`} className="block">
            <button className="flex items-center gap-1 text-primary transition-colors hover:text-primary/80">
              <span className="text-sm font-medium">View more</span>
              <Icon icon="lucide:arrow-right" className="text-lg" />
            </button>
          </Link>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-text md:text-base">
          Discover our most popular rooms, carefully selected to give you the perfect blend of
          comfort, luxury, and relaxation. Each one is designed to make your stay unforgettable.
        </p>
      </div>

      {/* slider of rooms */}
      <div className="scrollbar-hide flex flex-nowrap gap-6 overflow-x-auto px-3 py-6 sm:px-6 sm:pt-8">
        {isLoading && (
          <>
            <FeaturedRoomsCardSkeleton />
            <FeaturedRoomsCardSkeleton />
            <FeaturedRoomsCardSkeleton />
            <FeaturedRoomsCardSkeleton />
          </>
        )}
        {data && data?.data?.map((room) => <FeaturedRoomsCard key={room._id} room={room} />)}
      </div>
    </section>
  );
}

export function FeaturedRoomsCard({ room }: { room: IGetAllRoomsTypesResData }) {
  const avgRating = Number(room.rating.average);

  const performance =
    avgRating < 2
      ? { text: "Poor", color: "text-red-500", bg: "bg-red-100" }
      : avgRating < 4
        ? { text: "Good", color: "text-green-500", bg: "bg-green-100" }
        : { text: "Excellent", color: "text-sky-400", bg: "bg-sky-100" };

  return (
    <>
      <Link
        key={room._id}
        to={`/all-rooms/${room._id}?slug=${room.slug}`}
        className="block w-full min-w-96 max-w-sm"
      >
        <div className="rounded-xl border border-text/5 bg-light shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01] hover:shadow-md">
          <div className="relative">
            {/* Image */}
            <img
              src={room.images && room.images[0] && room?.images[0].url}
              alt="Room Image"
              className="h-56 w-full rounded-t-xl object-cover md:h-72"
            />

            {/* Heart Icon */}
            <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md">
              <Icon icon="solar:heart-angle-broken" width="25" height="25" className="" />
            </button>
          </div>

          <div className="px-4 pb-6 pt-6 sm:px-5 sm:pb-9 sm:pt-8">
            {/* rating, performance, reviews */}
            <div className="mb-3 flex items-center gap-3 leading-tight">
              <div
                className={`flex items-center rounded-b-lg rounded-l-lg p-1.5 font-semibold leading-tight ${performance.bg} ${performance.color}`}
              >
                {avgRating.toFixed(1)}
              </div>

              <div className="flex items-center gap-2 leading-tight">
                <span className={`text-sm font-medium ${performance.color}`}>
                  {performance.text}
                </span>

                <span className="text-sm text-grey">{room.rating.totalReviews} Reviews</span>
              </div>
            </div>

            {/* Room Name */}
            <h1 className="mb-2 text-xl font-bold md:text-2xl">{room.name}</h1>

            <p className="mb-3 text-xs md:text-sm">Room size: {room.roomSize}</p>

            {/* guest & bed */}
            <div className="mb-3 flex items-center gap-2 sm:gap-4 md:gap-5">
              {/* guest */}
              <div className="flex items-center gap-2 rounded-full border-2 p-2 sm:p-2.5">
                <Icon icon="fluent:person-32-regular" width="18" height="18" />
                <span className="text-xs md:text-sm">{room.maxGuests} + 1 Guests</span>
              </div>

              {/* bed */}
              <div className="flex items-center gap-2 rounded-full border-2 p-2 sm:p-2.5">
                <Icon icon="material-symbols-light:bed-outline-rounded" width="20" height="20" />
                <span className="text-xs md:text-sm">{room.bedType}</span>
              </div>
            </div>

            {/* per night + price + discount */}
            <div className="flex items-center justify-end">
              <p className="flex flex-row items-center gap-2.5 text-xs text-grey sm:text-sm">
                <span>per night</span>
                <span className="mr-1 text-grey line-through">${room.discountPercent}</span>
                <span className="text-base font-semibold text-primary sm:text-lg">
                  ₦{room.basePrice.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export function FeaturedRoomsCardSkeleton() {
  return (
    <div className="min-w-96 animate-pulse rounded-xl border border-text/5 bg-light shadow-sm">
      {/* Image Placeholder */}
      <div className="h-56 w-full rounded-t-xl bg-gray-200 md:h-72" />

      <div className="px-4 pb-6 pt-6 sm:px-5 sm:pb-9 sm:pt-8">
        {/* Rating Placeholder */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-8 w-10 rounded-b-lg rounded-l-lg bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        {/* Room Name Placeholder */}
        <div className="mb-4 h-7 w-3/4 rounded bg-gray-200 md:h-8" />

        {/* Room Size Placeholder */}
        <div className="mb-4 h-4 w-1/3 rounded bg-gray-200" />

        {/* Guest & Bed Icons Placeholder */}
        <div className="mb-6 flex items-center gap-2 sm:gap-4 md:gap-5">
          <div className="h-10 w-16 rounded-full border-2 border-gray-100 bg-gray-50" />
          <div className="h-10 w-24 rounded-full border-2 border-gray-100 bg-gray-50" />
        </div>

        {/* Price Placeholder */}
        <div className="flex items-center justify-end">
          <div className="h-6 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
