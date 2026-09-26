import { Icon } from "@iconify/react";
import Navbar from "@/layout/top-nav-bar";
import Footer from "@/layout/footer";
import TestimonialSection from "@/sections/home-page/testimonial";
import HeroSectionVideoMp4 from "/videos/hotelvideo.mp4";
import HeroSectionVideoWebM from "/videos/hotelvideo.webm";
import charlesBuildingImage from "/image/charleson-building.jpg";
import HotelServices from "@/sections/home-page/hotel-services";
import AboutCharlesonHotel from "@/sections/home-page/about-charleson-hotel";
import FeaturedRooms from "@/sections/home-page/featured-rooms";
import ExploreHotelFeature from "@/sections/home-page/explore-hotel-feature";
import BookNowSection from "@/sections/home-page/book-now-section";
import SelectGuestDropdown from "@/components/select/select-guest-dropdown";
import { useState } from "react";
import CustomCalendar from "@/components/calender";
import DateSelect from "@/components/date-select";
import { useNavigate } from "react-router";
import { useBookingStore } from "@/store/booking";
import toast from "react-hot-toast";

import { formatDateOnly } from "@/utils/format-date";

export default function Home() {
  const navigate = useNavigate();
  const { setBookingFilters } = useBookingStore();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState("0");
  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / ONE_DAY - 1);
  };

  const nights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : null;

  function handleSearchClick() {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    setBookingFilters({
      checkInDate: formatDateOnly(checkInDate),
      checkOutDate: formatDateOnly(checkOutDate),
      guests,
    });
    navigate("/all-rooms");
  }

  return (
    <section>
      <div className="relative min-h-min w-full overflow-visible pb-12 pt-2.5">
        {/* Background Video */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={charlesBuildingImage}
          alt="Beautiful Luxury Hotel"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          poster={charlesBuildingImage}
          playsInline
          preload="auto"
        >
          <source src={HeroSectionVideoWebM} type="video/webm" />
          <source src={HeroSectionVideoMp4} type="video/mp4" />
          Your browser does not support video.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Nav */}
        <nav className="container relative z-20">
          <Navbar />
        </nav>

        {/* Header Text + Booking Form */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Hero Text */}
          <h1 className="mx-auto text-balance py-10 text-center text-3xl font-medium leading-tight text-light md:py-20 md:text-6xl">
            Comfort & Design to relax in
            <br />
            <span className="text-primary">Beautiful Luxury Hotel</span>
            <br />
            Enjoy each day with us
          </h1>

          {/* Booking Form - FIXED */}
          <div className="relative z-[60] flex w-full flex-col gap-2 px-4 py-5 text-white md:flex md:w-fit md:flex-row md:items-center md:gap-6 md:rounded-full md:bg-light md:px-4 md:py-3 md:text-text">
            {/* Guests Select */}
            <div className="w-full rounded-full border border-light/25 bg-light/5 shadow-lg backdrop-blur-md hover:border-primary md:w-auto md:border-text/15 md:shadow-none">
              <SelectGuestDropdown
                onChange={(e) => {
                  setGuests(e.target.value);
                }}
                value={guests}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 md:flex">
              {/* Check In */}
              <div className="relative inline-block w-full md:w-auto">
                <DateSelect
                  value={checkInDate}
                  title="Check in"
                  onClick={() => setIsCheckInOpen(!isCheckInOpen)}
                  className="border border-light/30 bg-light/5 !px-2 !pl-4 !text-[13px] shadow-lg backdrop-blur-md md:border-text/15 md:!px-4 md:!text-sm md:shadow-none"
                />
              </div>

              {/* Check In */}
              <div className="relative inline-block w-full md:w-auto">
                <DateSelect
                  value={checkOutDate}
                  title="Check out"
                  onClick={() => setIsCheckInOpen(!isCheckInOpen)}
                  className="border border-light/30 bg-light/5 !px-2 !pl-4 !text-[13px] shadow-lg backdrop-blur-md md:border-text/15 md:!px-4 md:!text-sm md:shadow-none"
                />
              </div>
            </div>

            <div className="">
              {isCheckInOpen && (
                <div className="absolute left-0 right-0 z-40 max-w-none overflow-hidden rounded-xl border-4 p-0 shadow-xl md:top-20 md:max-w-none">
                  <CustomCalendar
                    minDate={new Date()}
                    startValue={checkInDate}
                    onChange={(e) => {
                      setCheckInDate(e[0]);
                      setCheckOutDate(e[1]);
                      // close check-in calendar
                      setIsCheckInOpen(false);
                      // open check-out calendar automatically
                    }}
                  />
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={handleSearchClick}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90 sm:px-8 sm:py-3.5 sm:text-base md:w-fit"
            >
              <Icon icon="lineicons:search-2" width={20} height={20} />
              <span>Search</span>
            </button>
          </div>

          {/* per night */}
          <h4 className="mt-6 text-lg font-semibold text-light">
            {checkInDate && checkOutDate ? (
              <>
                {nights} {nights === 1 ? "night" : "nights"} stay
              </>
            ) : (
              "Find rooms"
            )}
          </h4>
        </div>
      </div>

      <AboutCharlesonHotel />
      <FeaturedRooms />
      <ExploreHotelFeature />
      <HotelServices />
      <TestimonialSection />
      <BookNowSection />
      <Footer />
    </section>
  );
}
