import Footer from "@/layout/footer";
import Navbar from "@/layout/top-nav-bar";
import suiteWithCityView from "/image/charleson-building.jpg";
import BookNowSection from "@/sections/home-page/book-now-section";

const About = () => {
  return (
    <div>
      <div
        className="relative h-[500px] w-full overflow-hidden bg-cover bg-center bg-no-repeat pb-12 pt-2.5"
        style={{ backgroundImage: `url(${suiteWithCityView})` }}
      >
        {/* Dark overlay — only affects background */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Navbar — ABOVE overlay */}
        <nav className="relative z-20">
          <Navbar />
        </nav>

        {/* Header content */}
        <div className="relative z-10 flex h-3/4 flex-col items-center justify-center">
          <h1 className="mx-auto max-w-3xl text-balance py-10 text-center text-4xl font-medium text-light md:py-20 md:text-6xl">
            About Beautiful Luxury Hotels
          </h1>
        </div>
      </div>
      <h1 className="pt-10 text-center text-2xl font-bold text-dark md:text-3xl">Who we are?</h1>
      <div className="container flex flex-col gap-5 p-10 text-base leading-9 md:px-20 md:pb-20 md:pt-10">
        <p>
          A premium hospitality service in Rivers state, Nigeria. Our service is world class with
          top-priority on the security of all our esteemed guests to deliver a sense of therapy.
          Beautiful Luxury Hotel in Portharcourt is a 32 room top-rated resort styled hotel.
          Experience a sense of therapy Featuring complimentary WiFi, Eunice restaurant , Mmadukaego
          bar, an infinity pool with bar, suites with roof gardens, fitness center , boardroom &
          event center. Beautiful luxury offers premium accommodation in Port-harcourt with
          complimentary breakfast and airport shuttle. Free private parking is available on site
          Ideal choice for leisure, vacation, relaxation, conferences and retreats.
        </p>
        <p>
          Hotel has a 24h three-tiered security on site. Rooms have 24h power supply, air
          conditioning, smart lightning & flatscreen TV with satellite channels. Each sleek room
          comes with a private marble walk-in shower or bathroom.{" "}
        </p>
        <p>
          The hotel provides 24-hours front desk service, complimentary coffee/tea in the rooms,
          free gym access, and CCTV surveillance for your safety.{" "}
        </p>
        <p>
          The hotel also offers car hire and a secure parking. This Airport hotel has the Port
          Harcourt International Airport only 7mins away and Adokiye Amiesimaka stadium only 1min
          drive away.
        </p>
      </div>
      <BookNowSection />
      <Footer />
    </div>
  );
};

export default About;
