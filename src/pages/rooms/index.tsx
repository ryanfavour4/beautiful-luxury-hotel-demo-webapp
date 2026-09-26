import Navbar from "@/layout/top-nav-bar";
import SuiteWithCityView from "/image/room6.jpg";
import TestimonialSection from "@/sections/home-page/testimonial";
import BookNowSection from "@/sections/home-page/book-now-section";
import Footer from "@/layout/footer";
import RoomList from "@/sections/rooms-page/room-list";

export default function RoomPage() {
  return (
    <section className="overflow-hidden">
      <div
        className="relative min-h-min w-full items-center justify-center overflow-visible bg-cover bg-center bg-no-repeat pb-12 pt-2.5"
        style={{ backgroundImage: `url(${SuiteWithCityView})` }}
      >
        {/* Background Video */}

        {/* Optional dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* NavBar (kept as-is) */}
        <nav className="container relative z-20">
          <Navbar />
        </nav>

        {/* Header text and checkout */}
        <div className="container relative z-10 flex flex-col items-center justify-center">
          {/* header text */}
          <h1 className="mx-auto max-w-3xl text-balance py-10 text-center text-3xl font-medium text-light md:py-20 md:text-6xl">
            Experience Elegance & Ease in Every Stay
          </h1>
        </div>
      </div>
      <RoomList />
      <TestimonialSection />
      <BookNowSection />
      <Footer />
    </section>
  );
}
