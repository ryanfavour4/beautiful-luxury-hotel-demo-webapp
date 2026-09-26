import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { IGetAllRoomsTypesResData } from "@/api/hooks/types";
import { getIconByWord } from "@/utils/get-icon-by-word";

export default function RoomsCard({ room }: { room: IGetAllRoomsTypesResData }) {
  const avgRating = Number(room.rating.average);

  const performance =
    avgRating < 2
      ? { text: "Poor", color: "text-red-500", bg: "bg-red-100" }
      : avgRating < 4
        ? { text: "Good", color: "text-green-500", bg: "bg-green-100" }
        : { text: "Excellent", color: "text-sky-400", bg: "bg-sky-100" };

  return (
    <Link
      key={room._id}
      to={`/all-rooms/${room._id}?slug=${room.slug}`}
      className="block w-full min-w-80 rounded-lg transition duration-500 hover:shadow-md md:min-w-52"
    >
      <div className="flex h-[550px] flex-col overflow-hidden rounded-lg border border-text/10">
        {/* Image Section */}
        <div className="relative h-80 w-full overflow-hidden rounded-md p-2">
          <button className="absolute right-4 top-4 rounded-full bg-white p-1.5 shadow-md">
            <Icon icon="solar:heart-angle-broken" width="25" height="25" className="text-dark" />
          </button>

          <img
            src={room.images && room.images[0] && room?.images[0].url}
            alt={room.name}
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex h-full flex-col justify-between gap-2 p-3">
          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold leading-tight">{room.name}</h1>

            <div className="flex items-center gap-1.5">
              <div className="flex flex-col gap-px text-right">
                <span className={`text-sm font-semibold text-info ${performance.color}`}>
                  {performance.text}
                </span>
                <span className="text-xs text-grey">{room.rating.totalReviews} Reviews</span>
              </div>

              <div
                className={`flex items-center rounded-b-lg rounded-r-lg bg-blue-100 p-2 font-semibold leading-tight text-info ${performance.bg} ${performance.color}`}
              >
                {avgRating.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon key={i} icon="twemoji:star" width="15" height="15" />
            ))}
          </div>

          {/* Categories */}
          <div className="my-2 flex flex-wrap gap-2 text-text/75">
            {room?.amenities?.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border px-2.5 py-1 text-sm"
              >
                <Icon icon={getIconByWord(item)} width="14" height="14" />
                <span className="">{item}</span>
              </div>
            ))}
          </div>

          {/* Bed + Size */}
          <div className="flex flex-wrap items-center text-xs">
            {room?.tags?.slice(0, 5).map(
              (item, index) =>
                item && (
                  <div key={index} className="flex items-center">
                    <span>{item}</span>
                    <span className="mx-2">●</span>
                  </div>
                ),
            )}

            <div className="flex items-center">
              <span>{room.bedType}</span>
              <span className="mx-2">●</span>
            </div>

            <span>{room.roomSize}</span>
          </div>

          {/* Availability */}
          {room.totalRooms < 2 && (
            <h1 className="text-xs text-error">Only 1 Room Available at this price</h1>
          )}
          <div className="j mt-[10%] flex items-center justify-between">
            {/* Price */}
            <p className="text-base font-medium text-primary">
              ₦{room.basePrice.toLocaleString()}{" "}
              <span className="text-xs text-grey">/ Per Night</span>
            </p>

            <button className="btn-primary float-right w-fit rounded-xl text-xs font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg border border-text/10">
      {/* Image Section */}
      <div className="relative h-60 w-full p-2">
        <div className="h-full w-full rounded-md bg-gray-200" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between gap-2 p-3">
        <div className="flex justify-between">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="h-6 w-12 rounded bg-gray-200" />
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 rounded bg-gray-200" />
          ))}
        </div>

        {/* Categories */}
        <div className="my-2 flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-20 rounded-full bg-gray-200" />
          ))}
        </div>

        {/* Bed + Size */}
        <div className="flex gap-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>

        {/* Availability */}
        <div className="h-4 w-40 rounded bg-gray-200" />

        {/* Price */}
        <div className="h-6 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
