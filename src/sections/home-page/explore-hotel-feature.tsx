import ChillingRoom1 from "/image/chillingroom1.jpg";
import ChillingRoom2 from "/image/poolpic.png";
import BoardRoom from "/image/boardroom.png";
import ChillingRoom4 from "/image/charlesonbar.jpg";
import FitnessCenter from "/image/gympic.jpg";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

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
    slug: "swimming-pool",
    name: "Swimming Pool",
    image: ChillingRoom2,
    desc: "Relax by crystal-clear waters with refreshing dips, cozy seating, and a serene atmosphere for leisure.",
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    image: ChillingRoom1,
    desc: "Indulge in exquisite meals, warm ambience, and exceptional service crafted to elevate every dining experience.",
  },
  {
    slug: "board-room",
    name: "Board Room",
    image: BoardRoom,
    desc: "Host productive meetings supported by premium facilities, professional ambience, and seamless service tailored for success.",
  },
  {
    slug: "lounge-&-bar",
    name: "Lounge & Bar",
    image: ChillingRoom4,
    desc: "Unwind with signature cocktails, soothing music, and a stylish space designed forunforgettable evening moments.",
  },
  {
    slug: "fitness-center",
    name: "Fitness Center",
    image: FitnessCenter,
    desc: "Stay energized with modern equipment, expert guidance, and a clean environment built for your wellness journey.",
  },
];

export default function ExploreHotelFeature() {
  return (
    <section className="container px-4 pt-12 md:px-5 md:pt-12 lg:px-1">
      {/* header text */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-dark md:text-3xl">Explore Beautiful&apos;s Hotel</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text md:text-base">
          Discover our most popular rooms, carefully selected to give you the perfect blend of
          comfort, luxury and relaxation. Each one is designed to make your stay unforgettable.
        </p>
      </div>
      {/* Features grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 text-white md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {services.map((feature, index) => {
          // Check if it's the second item (index 1) to make it tall
          const isMiddleTall = index === 1;
          return (
            <Link
              to={`/services/${feature.slug}`}
              key={feature.slug}
              className={`group relative block h-full w-full overflow-hidden rounded-xl border border-primary shadow-md sm:border sm:shadow-lg ${
                isMiddleTall
                  ? "md:row-span-2 md:max-h-[unset]" // Styles for the tall middle card
                  : "max-h-64" // Styles for the standard cards
              }`}
            >
              {/* Background Image */}
              <img
                src={feature.image}
                alt={feature.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-between bg-black/45 px-2.5 py-4 pb-2.5 md:px-6 md:py-8 md:pb-4">
                <div>
                  <p className="mt-2 max-w-xs text-base leading-relaxed sm:mt-3">{feature.desc}</p>
                </div>

                <div className="flex items-center gap-5">
                  <h2 className="text-xl font-semibold sm:text-2xl md:text-2xl">{feature.name}</h2>
                  <div className="rounded-full bg-white p-1 shadow-md">
                    <Icon
                      icon="radix-icons:arrow-top-right"
                      width="25"
                      height="25"
                      className="text-black"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
