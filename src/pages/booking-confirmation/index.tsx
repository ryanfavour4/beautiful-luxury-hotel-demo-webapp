import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import Footer from "@/layout/footer";
import Input from "@/components/input";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { formatDate } from "@/utils/format-date";
import { useBookingStore } from "@/store/booking";
import { useVerifyPayment } from "@/api/hooks/usePayment";
import toast from "react-hot-toast";
import NavBar from "@/components/dashboard/navbar";
import NotFound from "@/layout/not-found";
import { BookingByIdResponseBookings } from "@/api/hooks/types";
import CancelledBooking from "./booking-cancelled";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { auth } = useAuthStore();
  const status = new URLSearchParams(window.location.search).get("status");
  const [isCancelled, setIsCancelled] = useState(false);

  const { bookingResponse, clearBookingResponse } = useBookingStore();
  const bookings = bookingResponse?.booking;
  const totalPrice = bookings?.amount;
  const reference = new URLSearchParams(window.location.search).get("tx_ref");
  const { mutate } = useVerifyPayment();

  const completedSteps = () => {
    clearBookingResponse();
    navigate("/");
  };

  useEffect(() => {
    if (!reference) {
      toast.error("This booking is not found. Redirecting to homepage...");
      // navigate("/");
      return;
    }
    if (status === "successful" || status === "completed") {
      mutate({ reference });
    }
    if (status === "cancelled") {
      setIsCancelled(true);
      toast.error("This booking has been cancelled ");
    }
  }, []);

  if (isCancelled) return <CancelledBooking />;

  return (
    <>
      <NavBar />
      {!bookingResponse ? (
        <NotFound />
      ) : (
        <div className="pt-10">
          <div className="container mx-auto px-4 pb-6 md:px-1 lg:px-1">
            <div className="flex flex-col items-start justify-between gap-10 md:gap-24 lg:flex-row">
              {/* Description */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-normal gap-6">
                  <Icon icon="lets-icons:check-fill" fontSize={50} color="#16a34a" />

                  <h1 className="text-xl font-bold text-dark md:text-2xl">
                    You're all set! Enjoy your stay at Beautiful Luxury Hotel.
                  </h1>
                </div>
                <p>
                  You have a confirmed reservation with Beautiful. We’ve sent your itinerary to{" "}
                  {auth?.user?.email}
                </p>

                {/* guest info */}
                <PersonalDetails onClick={() => completedSteps()} booking={bookings} />
                {/* <PaymentMethod OnClick={() => changeActiveStep(3)} /> */}
              </div>

              {/* Booking Card */}
              <div className="flex w-full max-w-sm flex-col space-y-4 rounded-2xl border border-gray-200 p-6 shadow-md">
                {/* Check In - Out */}
                <div className="flex justify-between border-b pb-4">
                  {/* Check In */}
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:calendar-linear"
                      width={20}
                      height={20}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">Check in</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(bookings?.checkInDate).commaDateFormat}
                      </span>
                    </div>
                  </div>

                  {/* Check Out */}
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:calendar-linear"
                      width={20}
                      height={20}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">Check out</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(bookings?.checkOutDate).commaDateFormat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="border-b pb-3">
                  <h2 className="font-semibold text-gray-700">Guests</h2>
                  <p className="text-sm text-gray-600">{bookings?.numberOfGuests} adult(s)</p>
                </div>

                {/* Details */}
                <div className="space-y-1 border-b pb-3">
                  <h2 className="font-semibold text-gray-700">Details</h2>
                  <p className="text-sm text-gray-600">Capacity: 2 persons</p>
                  <p className="text-sm text-gray-600">
                    For {bookings?.numberOfGuests || 1} persons (per night):{" "}
                    {bookings?.pricePerNight.toLocaleString()}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    For each additional person (per night): $50
                  </p> */}
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Price:</span>
                  <span className="text-primary">₦ {totalPrice?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export function PersonalDetails({
  onClick,
  booking,
}: {
  onClick: () => void;
  booking?: BookingByIdResponseBookings;
}) {
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: auth?.user?.email || "" });

  useEffect(() => {
    if (auth?.user) {
      setEmail({ value: auth.user.email || "" });
    }
  }, [auth?.user]);

  return (
    <div className="mt-5">
      {/* <h1 className="text-xl font-bold text-dark md:text-xl">Email your itinerary to anyone</h1> */}

      {/* PROFILE FORM SECTION  */}
      <div className="">
        {/* form 1 */}
        <form className="flex flex-col rounded-2xl bg-light py-4">
          {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
            {/* Email */}
          <div className="hidden w-[380px] flex-col gap-1 text-left">
            <Input
              type="text"
              name="email"
              state={email}
              setState={setEmail}
              icon={<Icon icon="majesticons:mail-line" className="text-grey" fontSize={22} />}
              placeholder="Enter your email address"
            />
          </div>

          {/*  */}
          {/* </div> */}
        </form>
        {/* <Link to="">
          <p className="font-semibold text-primary">Add another</p>
        </Link> */}
        <p className="font-semibold text-primary">Need help?</p>
        <Link to="/contact">
          <p className="font-semibold text-primary">Contact Customer Service</p>
        </Link>
        <div className="flex items-center justify-normal gap-5 pt-4">
          {/* <button className="rounded-xl bg-primary px-10 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 md:text-base">
            Share
          </button> */}
          <button
            className="btn w-auto border border-primary text-primary"
            onClick={() => navigate(`/dashboard/reservations/details/${booking?._id}`)}
          >
            Open invoice
          </button>
          <button onClick={onClick} className="btn-primary w-auto">
            Go Back To HomePage
          </button>
        </div>
      </div>
    </div>
  );
}
