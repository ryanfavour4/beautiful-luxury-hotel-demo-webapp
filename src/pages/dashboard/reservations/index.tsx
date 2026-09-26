import { Icon } from "@iconify/react";
import EmptyState from "./empty-state";
import { Link } from "react-router";

import { formatDate } from "@/utils/format-date";
import { useState } from "react";
import { useGetAllUserBookings } from "@/api/hooks/useBooking";
import { useAuthStore } from "@/store/auth";
import { LoadingPopUp } from "@/layout/loading";
import { useGetPhotoById } from "@/api/hooks/useUpload";
import { ReservationsPageSkeleton } from "./skeleton-loader";
import { GetBookingsResponseBooking } from "@/api/hooks/types";
import { snakeToSentence } from "@/utils/formatting";
import { getStatusBadgeClass } from "@/components/status-indicator";

const Reservations = () => {
  const [page, setPage] = useState<number>(1);
  const { auth } = useAuthStore();
  const userId = auth?.user?._id;
  const { data: bookingResponse, isLoading } = useGetAllUserBookings(userId, page);

  const totalPages = bookingResponse?.pagination?.totalPages ?? 1;
  const bookings: GetBookingsResponseBooking[] = bookingResponse?.bookings ?? [];

  return (
    <div className="flex min-h-screen w-full flex-col rounded-2xl bg-light px-6 py-6 lg:ml-4">
      {/* {isPending && <LoadingPopUp />} */}
      <div className="flex flex-col gap-6">
        {isLoading ? (
          <ReservationsPageSkeleton />
        ) : bookings?.length > 0 ? (
          <ActiveReservations bookings={bookings} isLoading={isLoading} />
        ) : (
          <EmptyState />
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-4 pt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="btn w-auto rounded-md border px-3 py-1 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="btn w-auto rounded-md border px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;

export const ActiveReservations = ({
  bookings,
  isLoading,
}: {
  bookings: GetBookingsResponseBooking[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {isLoading && <LoadingPopUp />}

      <div className="flex flex-col gap-2 pb-8">
        <h1 className="text-2xl font-bold">Booking History</h1>
        <p className="text-grey">View and manage your current bookings here</p>
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {bookings.map((book) => (
          <ReservationItem key={book?._id} book={book} />
        ))}
      </div>
    </div>
  );
};

const ReservationItem = ({ book }: { book: GetBookingsResponseBooking }) => {
  const rawImageId = book.roomTypeId?.images?.[0];
  const { data: imageData } = useGetPhotoById(rawImageId);
  const imageUrl = imageData?.data?.url || "/image/room1.jpg";

  return (
    <div className="flex w-full flex-col items-start justify-normal gap-4 border-t-[1.5px] border-t-neutral-300 py-8 first-of-type:border-t-0 first-of-type:pt-0 md:flex-row md:items-center">
      <img src={imageUrl} className="size-20 rounded-lg object-cover" />
      <div className="min-w-screen flex w-full flex-col items-center justify-between gap-3 pt-5">
        <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
          <div className="flex items-center gap-1">
            <Icon icon={"hugeicons:hotel-01"} fontSize={20} />
            <p className="font-semibold text-dark/80">{book?.roomTypeId?.name || "Void Room"}</p>
          </div>
          <div className="flex items-center gap-2">
            <p
              className={`rounded-2xl border ${getStatusBadgeClass(book?.status)} px-2 py-[1px] text-xs font-bold`}
            >
              {snakeToSentence(book?.status)?.toUpperCase()}
            </p>
            <p className="font-semibold text-dark/60">ID: {book._id}</p>
          </div>
        </div>
        <hr className="h-[1.5px] w-[96%] bg-neutral-300" />
        <div className="flex w-full flex-wrap items-center justify-between gap-3 lg:flex-nowrap lg:gap-0 lg:pt-3">
          <div className="flex flex-wrap items-center justify-normal gap-4 text-xs lg:gap-10">
            <div className="flex items-center gap-1">
              <p className="font-semibold">Check in:</p>
              <p className="font-medium text-grey/90">
                {formatDate(book?.checkInDate).commaDateFormat}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-semibold">Check out:</p>
              <p className="font-medium text-grey/90">
                {formatDate(book?.checkOutDate).commaDateFormat}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-semibold">Guests:</p>
              <p className="font-medium text-grey/90">
                {book?.numberOfGuests} Adult{book.numberOfGuests > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link to={`details/${book?._id}`} className="text-sm font-medium text-primary">
            Check Details
          </Link>
        </div>
      </div>
    </div>
  );
};
