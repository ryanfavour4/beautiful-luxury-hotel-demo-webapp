import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/utils/format-date";
import { LoadingPopUp } from "@/layout/loading";
import { Invoice } from "@/components/invoice";
import toast from "react-hot-toast";
import { generateInvoiceHTML } from "@/utils/generate-invoice-html";
import { useEditBookingStatus, useGetBookingById } from "@/api/hooks/useBooking";
import { getIconByWord } from "@/utils/get-icon-by-word";
import { BookingByIdResponseBookings } from "@/api/hooks/types";
import SkeletonLoader from "./skeleton-loader";
import { snakeToSentence } from "@/utils/formatting";
import ConciergeOptions from "../../../../sections/active-reservations/concierge-options";
import AlertBanner from "@/components/alert-banner/page";
import { useInitializePayment } from "@/api/hooks/usePayment";
import { getStatusBadgeClass } from "@/components/status-indicator";

const ReservationDetailsPage = () => {
  const { id } = useParams();

  const { data: bookingDetails, isLoading } = useGetBookingById(id);
  const { mutate, isPending } = useEditBookingStatus();
  const { mutate: initializePayment, isPending: isInitializingPayment } = useInitializePayment();
  const [showInvoice, setShowInvoice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const bookings: BookingByIdResponseBookings | undefined = bookingDetails?.booking;

  const [openConciergeOptions, setOpenConciergeOptions] = useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);

  const [verifyPaymentModal, setVerifypaymentModal] = useState(false);
  // Determine what action buttons to show
  const showCancelButton = ["pending", "confirmed", "hold"].includes(bookings?.status ?? "");
  const showRoomServiceButton = ["checkedin", "checked-in"].includes(bookings?.status ?? "");

  const MealPlan = useMemo(() => {
    if (bookings?.roomTypeId?.allInclusivePrice) return "All Inclusive (All meals included)";
    if (bookings?.roomTypeId?.breakfastPrice && bookings?.roomTypeId?.dinnerPrice)
      return "Half Board (Breakfast + Dinner)";
    if (bookings?.roomTypeId?.breakfastPrice) return "Breakfast only";
    if (bookings?.roomTypeId?.dinnerPrice) return "Dinner only";
    return "No meal plan selected";
  }, [
    bookings?.roomTypeId?.allInclusivePrice,
    bookings?.roomTypeId?.breakfastPrice,
    bookings?.roomTypeId?.dinnerPrice,
  ]);

  // 2. Meal Calculations

  const guestCount = Number(bookings?.numberOfGuests) || 1;

  // Total Meal Cost = (Price per guest * Number of guests) * Number of nights
  const mealsTotal = useMemo(() => {
    let mealsTotalPerDay = 0;

    if (bookings?.allInclusive) {
      mealsTotalPerDay = bookings?.roomTypeId?.allInclusivePrice ?? 0;
    } else {
      if (bookings?.breakfast) mealsTotalPerDay += bookings?.roomTypeId?.breakfastPrice ?? 0;
      if (bookings?.dinner) mealsTotalPerDay += bookings?.roomTypeId?.dinnerPrice ?? 0;
    }

    return mealsTotalPerDay * (bookings?.totalNights || 0);
  }, [
    bookings?.allInclusive,
    bookings?.breakfast,
    bookings?.dinner,
    bookings?.roomTypeId?.allInclusivePrice,
    bookings?.roomTypeId?.breakfastPrice,
    bookings?.roomTypeId?.dinnerPrice,
    bookings?.totalNights,
  ]);

  // 3. Final Total
  // const amount = roomTotal + mealsTotal;
  const handleDownload = (booking: BookingByIdResponseBookings) => {
    try {
      setIsDownloading(true);
      const html = generateInvoiceHTML(booking);
      const w = window.open("", "_blank");
      if (!w) {
        toast.error("Popup blocked. Allow popups and try again.");
        setIsDownloading(false);
        return;
      }
      w.document.open();
      w.document.write(html);
      w.document.close();
      // window in the new tab will auto-print and close (handled in the generated HTML)
    } catch (error) {
      console.error(error);
      toast.error("Failed to download, try again");
    } finally {
      setIsDownloading(false);
    }
  };
  useEffect(() => {
    if (bookings?.status === "pending" || bookings?.status === "hold") {
      setVerifypaymentModal(true);
    }
  }, [bookings]);

  if (!bookings) return <SkeletonLoader />;

  return (
    <div className="min-h-screen w-full lg:mr-4">
      {isPending && <LoadingPopUp />}
      {isInitializingPayment && <LoadingPopUp />}
      {isLoading && <SkeletonLoader />}
      {openConciergeOptions && <ConciergeOptions onClose={() => setOpenConciergeOptions(false)} />}
      {openConfirmCancel && (
        <AlertBanner
          icon={<Icon icon={"typcn:warning-outline"} color="#f00" fontSize={40} />}
          closeModal={() => setOpenConfirmCancel(false)}
          description="Are you sure you want to cancel this booking? This action cannot be undone."
          title="Cancel Booking?"
          buttonText="Cancel Booking"
          buttonFunction={() =>
            mutate(
              { bookingId: id, status: "cancelled" },
              {
                onSuccess: () => {
                  toast.success("This Booking has been cancelled successfully!");
                  setOpenConfirmCancel(false);
                },
              },
            )
          }
        />
      )}
      {verifyPaymentModal && (
        <AlertBanner
          icon={<Icon icon={"lucide:badge-check"} color="#4FBF67" fontSize={40} />}
          closeModal={() => setVerifypaymentModal(false)}
          title="Initialize or verify Payment?"
          description="Reinitialize failed payment or verify successful payment for this booking"
          buttonText="Verify/Initialize Payment"
          buttonFunction={() =>
            initializePayment(
              {
                method: "flutterwave",
                roomBookingId: bookings._id,
                metadata: {
                  notes: bookings?.notes,
                },
              },
              {
                onSuccess: (res) => {
                  setOpenConfirmCancel(false);
                  window.location.href = res.data.data.link;
                },
              },
            )
          }
        />
      )}
      <div className="flex w-full items-center justify-between pb-4 pl-4 font-semibold">
        <Link
          to={"/dashboard/reservations"}
          className="flex cursor-pointer items-center justify-normal gap-2 hover:text-primary"
        >
          <Icon icon={"ic:baseline-arrow-back-ios"} />
          <p>Back to trips</p>
        </Link>
        <p>ID: {bookings?._id || "----"}</p>
      </div>

      {/* SEARCH FIGURES AND RESERVATION STATUS */}
      <div className="ml-4 hidden w-full items-center justify-between rounded-2xl rounded-tl-lg bg-light p-4 lg:flex">
        <div className="flex flex-row items-start justify-normal gap-2">
          <img
            src={bookings?.roomTypeId?.images[0]?.url}
            alt="pool pic"
            className="size-24 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-1">
            <h4 className="pb-1 text-lg font-semibold">{bookings?.roomTypeId?.name}</h4>
            <p className="text-sm">
              <strong>Check in</strong>: {formatDate(bookings?.checkInDate).commaDateFormat}
            </p>
            <p className="text-sm">
              <strong>Check out</strong>: {formatDate(bookings?.checkOutDate).commaDateFormat}
            </p>
            <p className="text-sm">
              <strong>Guests</strong>:{" "}
              {bookings?.numberOfGuests
                ? `${bookings.numberOfGuests} Adult${bookings.numberOfGuests > 1 ? "s" : ""}`
                : "No Guests"}
              {bookings?.numberOfGuests > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-nowrap items-start justify-end gap-3 align-top">
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Check in</p>
            <p className="text-4xl font-semibold">
              {(new Date(bookings?.checkInDate).getDate() || 1).toString().padStart(2, "0")}
            </p>
            <p className="font-semibold">
              {new Date(bookings?.checkInDate).toLocaleString("default", { month: "long" })}
            </p>
            <div className="flex items-center justify-normal gap-1 text-xs">
              <Icon icon={"ic:baseline-access-alarm"} />
              <p>
                {new Date(bookings?.checkInDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="self-stretch border-l border-neutral-300" />

          <div className="flex flex-col items-center justify-center gap-1">
            <p>Check out</p>
            <p className="text-4xl font-semibold">
              {(new Date(bookings?.checkOutDate).getDate() || 1).toString().padStart(2, "0")}
            </p>
            <p className="font-semibold">
              {new Date(bookings?.checkOutDate).toLocaleString("default", { month: "long" })}
            </p>
            <div className="flex items-center justify-normal gap-1 text-xs">
              <Icon icon={"ic:baseline-access-alarm"} />
              <p>
                {" "}
                {new Date(bookings?.checkOutDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="self-stretch border-l border-neutral-300" />
          <div className="order-1 flex flex-col items-center justify-center gap-1 align-top">
            <p
              className={`rounded-2xl border px-2 py-1 text-xs ${getStatusBadgeClass(bookings?.status)}`}
            >
              {snakeToSentence(bookings?.status ?? "N/A").toUpperCase()}
            </p>
            <div className="flex items-end justify-center gap-1">
              <div className="flex flex-col items-center justify-center gap-1">
                <p>Rooms</p>
                <p className="text-4xl font-semibold">{1}</p>
              </div>
              <p className="text-3xl text-neutral-400">/</p>
              <div className="flex flex-col gap-1">
                <p>Night</p>
                <p className="text-4xl font-semibold">{bookings?.totalNights || 1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SECTION WITH DIFFERNT LAYOUT  */}
      <div className="flex w-full flex-col items-start justify-normal rounded-2xl rounded-tl-lg bg-light p-4 md:flex-row md:items-center md:justify-between lg:hidden">
        <div className="flex w-full items-center justify-between md:w-auto md:justify-normal md:gap-5">
          <img
            src={bookings?.roomTypeId?.images[0]?.url}
            alt="pool pic"
            className="size-24 rounded-lg object-cover md:size-28"
          />
          <div className="flex flex-col gap-1">
            <h4 className="pb-1 text-lg font-semibold">{bookings?.roomTypeId?.name || "N/A"}</h4>
            <p className="text-sm">
              <strong>Check in</strong>: {formatDate(bookings?.checkInDate).commaDateFormat}
            </p>
            <p className="text-sm">
              <strong>Check out</strong>: {formatDate(bookings?.checkOutDate).commaDateFormat}
            </p>
            <p className="text-sm">
              <strong>Guests</strong>:{" "}
              {bookings?.numberOfGuests
                ? `${bookings.numberOfGuests} Adult${bookings.numberOfGuests > 1 ? "s" : ""}`
                : "No Guests"}
              {bookings?.numberOfGuests > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 pt-6 md:pt-0">
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Check in</p>
            <p className="text-3xl font-semibold">
              {(new Date(bookings?.checkInDate).getDate() || 1).toString().padStart(2, "0")}
            </p>
            <p className="font-semibold">
              {new Date(bookings?.checkInDate).toLocaleString("default", { month: "long" })}
            </p>
            <div className="flex items-center justify-normal gap-1 text-[10px]">
              <Icon icon={"ic:baseline-access-alarm"} />
              <p>
                {" "}
                {new Date(bookings?.checkInDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="self-stretch border-l border-neutral-300" />
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Check out</p>
            <p className="text-3xl font-semibold">
              {(new Date(bookings?.checkOutDate).getDate() || 1).toString().padStart(2, "0")}
            </p>
            <p className="font-semibold">
              {new Date(bookings?.checkOutDate).toLocaleString("default", { month: "long" })}
            </p>
            <div className="flex items-center justify-normal gap-1 text-[10px]">
              <Icon icon={"ic:baseline-access-alarm"} />
              <p>
                {" "}
                {new Date(bookings?.checkOutDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="self-stretch border-l border-neutral-300" />
          <div className="flex flex-col items-center justify-center gap-1 align-top">
            <p
              className={`rounded-2xl border px-2 py-1 text-xs ${getStatusBadgeClass(bookings?.status)}`}
            >
              {bookings?.status.toUpperCase()}
            </p>
            <div className="flex items-end justify-center gap-1">
              <div className="flex flex-col items-center justify-center gap-1">
                <p>Rooms</p>
                <p className="text-3xl font-semibold">1</p>
              </div>
              <p className="text-3xl text-neutral-400">/</p>
              <div className="flex flex-col gap-1">
                <p>Night</p>
                <p className="text-3xl font-semibold">{bookings?.totalNights || 1} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END OF MOBILE SECTION  */}

      {/* ABOUT PROERTY SECTION  */}
      <div className="mt-4 flex w-full flex-col rounded-2xl rounded-tl-lg bg-light p-4 lg:ml-4">
        <div className="flex w-full flex-col items-center justify-between gap-16 border-b-[1px] border-b-neutral-300 p-2 pb-4 md:flex-row">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">About this property</h3>

            <div className="flex w-full flex-wrap items-center gap-1">
              <p className="whitespace-nowrap">
                {guestCount} Guest{guestCount > 1 ? "s" : ""}
              </p>
              {bookings?.roomTypeId?.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 whitespace-nowrap">
                  <Icon icon={"lucide:dot"} />
                  <p>{tag}</p>
                </div>
              ))}
            </div>
            <p className="text-wrap text-neutral-400">{bookings?.roomTypeId?.description}</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.9755131948696!2d6.975745873651546!3d4.969889895006313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d1031d425d4d%3A0xed4e4519f0ef963c!2sCharleson%20Luxury%20Hotel!5e1!3m2!1sen!2sng!4v1765180779579!5m2!1sen!2sng"
            // width="400"
            // height="150"
            className="h-[150] w-full rounded-2xl md:w-[400]"
          ></iframe>
        </div>

        {/* PRICING  SECTION  */}
        <div className="flex flex-col gap-1 border-b-[1px] border-b-neutral-300 py-4">
          <h3 className="text-lg font-bold">Price</h3>
          <div className="flex w-full items-center justify-between">
            <p>1 unit</p>
            <p>
              {" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(bookings?.pricePerNight * bookings?.totalNights || 0)}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p>Meal Price</p>
            <p>₦{mealsTotal?.toLocaleString()}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p>10% VAT</p>
            <p>₦0.00</p>
          </div>

          <div className="flex w-full items-center justify-between text-lg font-bold">
            <p>Total Price</p>
            <p>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(bookings?.amount || 0)}
            </p>
          </div>
        </div>

        {/* GUEST DETAILS AND AMENITIES SECTION  */}
        <div className="flex flex-col gap-2 py-4">
          {bookings?.guests.length > 0 && (
            <p>
              <strong>Guest name(s):</strong> {bookings?.guests[0]?.firstName ?? ""}
              {bookings?.guests.slice(1).map((guest, index) => (
                <span key={index}>
                  , {guest.firstName} {guest.lastName}
                </span>
              ))}{" "}
              <span>/ for max. {bookings?.roomTypeId.maxGuests} people</span>
            </p>
          )}
          <p>
            <strong>Meal Plan:</strong>
            {MealPlan || "There is no meal included in the rate for this apartment."}
          </p>
          {/* AMENITIES  */}
          <div className="flex flex-wrap items-start justify-normal gap-5 pt-4 md:pl-5">
            {bookings?.roomTypeId?.amenities?.map((amenity) => (
              <div className="flex items-center justify-normal gap-1" key={amenity}>
                <Icon icon={getIconByWord(amenity) || "mdi:check-circle"} />
                <p className="capitalize">{amenity}</p>
              </div>
            ))}
          </div>
        </div>
        {/* CALL TO ACTIONS  */}
        <div className="md:ap-0 flex flex-col items-start justify-between gap-5 pb-5 pt-10 md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {showCancelButton && (
              <button
                className="btn w-auto rounded-xl border border-error px-3 py-1.5 text-sm text-error disabled:cursor-not-allowed"
                onClick={() => setOpenConfirmCancel(true)}
              >
                Cancel Booking
              </button>
            )}

            {showRoomServiceButton && (
              <button
                onClick={() => setOpenConciergeOptions(true)}
                className="btn-primary flex w-auto items-center justify-center gap-1 rounded-xl bg-[#916001] px-3 py-1.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Room Service
              </button>
            )}
          </div>

          <div className="order-1 flex items-center justify-end gap-4">
            {bookings.status === "pending" && (
              <button className="btn-white w-auto rounded-xl border-grey px-5 py-1.5 text-grey">
                Edit Booking
              </button>
            )}
            <button
              onClick={() => handleDownload(bookings)}
              disabled={isDownloading}
              className="btn-primary bg-[# ] flex w-auto items-center justify-center gap-1 rounded-xl px-3 py-1.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                <Icon icon={isDownloading ? "eos-icons:loading" : "lucide:download"} />
              </span>
              {isDownloading ? "Downloading..." : "Download invoice"}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Invoice Component for PDF Generation */}
      {showInvoice && bookings && (
        <div
          id="invoice-print-content"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "210mm",
            overflow: "visible",
          }}
        >
          <Invoice booking={bookings} onClose={() => setShowInvoice(false)} />
        </div>
      )}
    </div>
  );
};

export default ReservationDetailsPage;
