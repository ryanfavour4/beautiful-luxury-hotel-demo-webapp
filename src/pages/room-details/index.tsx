import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "@/layout/top-nav-bar";
import { Icon } from "@iconify/react";
import Footer from "@/layout/footer";
import { useNavigate } from "react-router";
import { useGetRoomsTypesById } from "@/api/hooks/useRoom";
import ReviewAndTestimony from "@/sections/room-id-page/review-testimony-page";
import Policies from "@/sections/room-id-page/policies-page";
import { SimilarRooms } from "@/sections/room-id-page/similar-rooms";
import { useBookingStore } from "@/store/booking";
import { formatDate } from "@/utils/format-date";
import { getIconByWord } from "@/utils/get-icon-by-word";
import toast from "react-hot-toast";
import { GridGalleryViewer, GridGalleryViewerSkeleton } from "@/components/grid-gallery-viewer";
import { calculateNights } from "@/utils/calculate-night-stay";
import { useAuthStore } from "@/store/auth";
import { IGetRoomTypeByIdResponse } from "@/api/hooks/types";
import AlertBanner from "@/components/alert-banner/page";
import { getCurrentFullPath, saveRedirectPath } from "@/utils/redirects";

const sections = [
  { label: "Overview", id: "overview" },
  { label: "Amenities", id: "amenities" },
  { label: "Reviews", id: "reviews" },
  { label: "Policies", id: "policies" },
];

export type LSBookingFilterType = {
  guests: number | string;
  checkInDate: string | Date | null;
  checkOutDate: string | Date | null;
};

export default function RoomsId() {
  const queryParams = new URLSearchParams(window.location.search);
  const slug = queryParams.get("slug");
  const { auth } = useAuthStore();
  const { id } = useParams();
  const { data, isLoading } = useGetRoomsTypesById(id as string);
  const { bookingFilters, setMealPrice } = useBookingStore();
  const navigate = useNavigate();
  const room = data?.data;

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState("0");
  const [roomImages, setRoomImages] = useState([""]);

  useEffect(() => {
    if (bookingFilters) {
      const toDate = (v: string | Date | null | undefined) => {
        if (!v) return null;
        if (v instanceof Date) return v;

        const parsed = new Date(v);
        return isNaN(parsed.getTime()) ? null : parsed;
      };

      setCheckInDate(toDate(bookingFilters.checkInDate));
      setCheckOutDate(toDate(bookingFilters.checkOutDate));
      setGuests(bookingFilters.guests as string);
    }
  }, [bookingFilters]);

  const nights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : null;

  useEffect(() => {
    if (room) {
      const newImagesUrl: string[] = [];
      if (room?.images) room?.images.forEach((img) => newImagesUrl.push(img.url));
      if (room?.videos) room?.videos.forEach((vid) => newImagesUrl.push(vid.url));
      setRoomImages(newImagesUrl);
    }
  }, [data, room]);

  const handleReserveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!auth?.token) {
      e.preventDefault();

      // ✅ SAVE WHERE USER WAS TRYING TO GO
      saveRedirectPath(getCurrentFullPath());

      toast.error("Please log in to make a reservation");
      setAlertTitle("Uh Oh! You're not logged in. Continue your booking");
      setAlertMessage(
        "Choose how you’d like to proceed: Sign in for a faster, fully tracked experience, or continue without an account by requesting a manual reservation.",
      );

      return;
    }

    if (!checkInDate || !checkOutDate) {
      e.preventDefault();
      toast.error("Please select check-in and check-out dates");
      navigate("/all-rooms");
      return;
    }

    if (room) {
      localStorage.setItem("price", room.basePrice?.toString() || "0");
      setMealPrice({
        allInclusivePrice: room.allInclusivePrice || 0,
        breakfastPrice: room.breakfastPrice || 0,
        dinnerPrice: room.dinnerPrice || 0,
      });
    }
  };

  const closeAlert = () => {
    setAlertMessage("");
    setAlertTitle("");
  };

  return (
    <>
      <section className="overflow-hidden">
        {/* NavBar */}
        <nav className="sticky top-0 z-20 w-full bg-white shadow-md">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-3 md:px-1 lg:px-1">
          {/* Header text */}
          <div>
            <div className="flex justify-between gap-10 pt-9 md:gap-0">
              <h1 className="text-2xl font-bold text-dark md:text-3xl">{room?.name}</h1>
              <div className="flex gap-6">
                <button>
                  <Icon
                    icon="solar:heart-angle-broken"
                    width="27"
                    height="27"
                    className="text-dark"
                  />
                </button>
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Check this out",
                        text: "Look at this room I found!",
                        url: window.location.href,
                      });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:share-outline"
                    width="27"
                    height="27"
                    className="text-dark"
                  />
                </button>
              </div>
            </div>

            <p className="font-bold text-dark">{room?.hotelId?.city}</p>
          </div>

          {/* Buttons */}
          <div className="mb-6 flex gap-8 overflow-x-auto whitespace-nowrap border-b border-text/25">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="border-b-2 border-transparent pb-3 pt-8 font-bold text-text/50 transition-all duration-300 hover:border-primary hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Image gallery */}

          {isLoading ? <GridGalleryViewerSkeleton /> : <GridGalleryViewer images={roomImages} />}

          {/* Description & details */}
          <div className="pt-10">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
              {/* Description */}
              <div className="max-w-2xl space-y-4">
                <h1 className="text-2xl font-bold text-dark md:text-3xl">Description</h1>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span>{room?.maxGuests} guest</span> •
                  {room?.tags.map((tag: string) => (
                    <span key={tag}>{tag} • </span>
                  ))}
                </div>

                <p className="leading-relaxed text-gray-700">{room?.description}</p>
                {/* amenities */}
                <div id="amenities" className="mt-10">
                  <h1 className="mb-3 text-2xl font-bold text-dark md:text-3xl">Amenities</h1>

                  <div className="grid grid-cols-2 gap-x-16 gap-y-5 sm:grid-cols-2">
                    {room?.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-4 py-1">
                        <Icon
                          icon={getIconByWord(amenity)}
                          width={26}
                          height={26}
                          className="text-primary"
                        />
                        <span className="text-base font-medium text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="w-full lg:max-w-sm">
                <div className="flex w-full flex-col space-y-4 rounded-2xl border border-gray-200 p-6 shadow-md">
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
                          {/* {formatDate(checkInDate).commaDateFormat} */}
                          {checkInDate && formatDate(checkInDate).commaDateFormat}
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
                          {/* {formatDate(checkOutDate).commaDateFormat} */}
                          {checkOutDate && formatDate(checkOutDate).commaDateFormat}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Guests */}
                  <div className="border-b pb-3">
                    <h2 className="font-semibold text-gray-700"> Guests</h2>
                    <p className="text-sm text-gray-600">{guests} </p>
                  </div>
                  {/* Details */}
                  <div className="space-y-1 border-b pb-3">
                    <h2 className="font-semibold text-gray-700">Details</h2>
                    <p className="text-sm text-gray-600">Capacity: {room?.maxGuests} persons</p>
                    <p className="text-sm font-semibold text-gray-600">
                      Guests are liable for damages to hotel property.
                    </p>

                    <p className="text-sm font-semibold text-gray-600">
                      Additional charges apply for extra guests.
                    </p>
                  </div>
                  {/* Total */}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Price:</span>
                    <span className="text-primary">
                      ₦{" "}
                      {(room?.basePrice && nights
                        ? room.basePrice * nights
                        : (room?.basePrice ?? 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                  {/* Button */}
                  {room && (
                    <Link
                      to={`/payment/${slug}/?type=booking&id=${room._id}`}
                      onClick={handleReserveClick}
                    >
                      <button className="mt-2 w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90">
                        Reserve
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* MODAL */}
          </div>
          {/* Calender */}
          {/* <div className="pt-10">
          <h1 className="text-2xl font-bold text-dark md:text-3xl">Calender</h1>
          <div className="pt-5">
            <div id="calender" className="">
              <CustomCalendar />
            </div>
          </div>
        </div> */}
          {/* review and testimony */}
          <section id="reviews">
            <ReviewAndTestimony data={data as IGetRoomTypeByIdResponse} />
          </section>
          <section id="policies">
            <Policies />
          </section>

          <SimilarRooms />
          <Footer />
        </div>
      </section>

      {alertTitle && (
        <AlertBanner
          closeModal={closeAlert}
          description={alertMessage}
          title={alertTitle}
          icon={
            <Icon
              icon="mdi:user-badge-alert-outline"
              width={40}
              height={40}
              className="text-red-600"
            />
          }
          buttonText="Sign in & Continue"
          buttonFunction={() => {
            navigate(`/login?redirect=${encodeURIComponent(getCurrentFullPath())}`);
          }}
          button2Text="Request Manual Booking"
          button2Function={() => {
            navigate(`/contact?type=manual-booking&roomId=${room?._id}`);
          }}
        />
      )}
    </>
  );
}
