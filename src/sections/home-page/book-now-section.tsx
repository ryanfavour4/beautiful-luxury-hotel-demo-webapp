import { Link } from "react-router";
import BookNowPic from "/image/booknowpic.jpg";
import { Icon } from "@iconify/react";

export default function BookNowSection() {
  return (
    <section
      className="relative min-h-min w-full items-center justify-center bg-cover bg-center bg-no-repeat py-20 text-center sm:py-32 md:py-40"
      style={{ backgroundImage: `url(${BookNowPic})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center text-light sm:gap-5">
        <h1 className="max-w-md text-3xl font-semibold leading-snug md:max-w-4xl md:text-6xl">
          Your comfort, just a tap away <br className="hidden sm:block" /> Explore, Book and Relax
        </h1>

        <p className="max-w-md text-base sm:text-base md:text-lg">
          Access premium services, manage your stay, and discover more at Beautiful Luxury Hotel.
        </p>

        <Link to={`/all-rooms`}>
          <button className="flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90 sm:px-8 sm:py-3.5 sm:text-base">
            <Icon icon="lineicons:search-2" width={20} height={20} />
            <span>Book Now</span>
          </button>
        </Link>
      </div>
    </section>
  );
}
