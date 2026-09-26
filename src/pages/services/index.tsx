import Navbar from "@/layout/top-nav-bar";
import { Icon } from "@iconify/react";
import suiteWithCityView from "/image/chillingroom1.jpg";
import LoungeAndBar from "/image/loungeImg.png";
import Restaurant from "/image/restaurantImg.png";
import Fitness from "/image/fitnessImg.png";
import Spa from "/image/spaImg.png";
import { Link } from "react-router";
import Footer from "@/layout/footer";

type ServiceRendered = {
  slug: string;
  name: string;
  image: string; // OK if image comes from URL or import
  desc: string;
  size?: string;
  rating?: number;
  performance?: string;
  reviews?: string;
  guest?: string;
};

const services: ServiceRendered[] = [
  {
    slug: "Lounge & Bar",
    name: "Lounge & Bar",
    image: LoungeAndBar,
    desc: "Book a table at our Lounge & Bar for a premium experience. Cocktails, music, good vibes - all waiting for you.",
    size: "6,123sq ft",
    rating: 4.8,
    performance: "Excellent",
    reviews: "120 Reviews",
    guest: "1000",
  },
  {
    slug: "Restaurant",
    name: "Restaurant",
    image: Restaurant,
    desc: "Book a table at our Lounge & Bar for a premium experience. Cocktails, music, good vibes - all waiting for you.",
    size: "6,123sq ft",
    rating: 4.8,
    performance: "Excellent",
    reviews: "120 Reviews",
    guest: "1000",
  },
  {
    slug: "Fitness Center",
    name: "Fitness Center",
    image: Fitness,
    desc: "Book a table at our Lounge & Bar for a premium experience. Cocktails, music, good vibes - all waiting for you.",
    size: "6,123sq ft",
    rating: 4.8,
    performance: "Excellent",
    reviews: "120 Reviews",
    guest: "1000",
  },
  {
    slug: "Board Room",
    name: "Spa & Wellness",
    image: Spa,
    desc: "Book a table at our Lounge & Bar for a premium experience. Cocktails, music, good vibes all waiting for you.",
    size: "6,123sq ft",
    rating: 4.8,
    performance: "Excellent",
    reviews: "120 Reviews",
    guest: "1000",
  },
];

export default function ServicesPage() {
  return (
    <section>
      <div
        className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat pb-12 pt-2.5"
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
          <h1 className="mx-auto max-w-3xl text-balance py-10 text-center text-3xl font-medium text-light md:py-20 md:text-6xl">
            Exquisite Services, Designed for Your Comfort
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:px-1 lg:px-1">
        {" "}
        <h1 className="pb-8 text-3xl font-bold text-dark">Services </h1>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="/* ensures card width on mobile */ /* normal on large screens */ block min-w-[350px] lg:min-w-0"
            >
              <div className="flex flex-col overflow-hidden rounded-lg border border-text/10">
                {/* Image */}
                <div className="relative h-60 w-full p-2">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="flex flex-col gap-3 p-4">
                  {/* Title + Rating */}
                  <div className="flex items-start justify-between">
                    <h1 className="text-xl font-bold">{service.name}</h1>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col text-right">
                        <span className="text-sm font-semibold text-info">
                          {service.performance}
                        </span>
                        <span className="text-xs text-grey">{service.reviews}</span>
                      </div>

                      <div className="rounded-lg bg-blue-100 px-3 py-2 font-semibold text-info">
                        {service.rating}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Icon key={i} icon="twemoji:star" width="16" height="16" />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-grey">{service.desc}</p>

                  {/* Size + Guest */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border px-3 py-2">
                      <Icon icon="simple-line-icons:size-fullscreen" width="16" height="16" />
                      <span className="text-sm font-semibold">{service.size}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border px-3 py-2">
                      <Icon icon="fluent:person-32-regular" width="16" height="16" />
                      <span className="text-sm font-semibold">{service.guest} Guest</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="mt-2 w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90">
                    Reserve
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
