import { Icon } from "@iconify/react";

const List = [
  {
    icon: <Icon icon="bi:calendar2-date-fill" />,
    title: "Flexible Reservation",
    desc: "Life happens—you can adjust or cancel stress-free within the allowed window.",
  },
  {
    icon: <Icon icon="ion:card" />,
    title: "Secure Your Stay Instantly",
    desc: "Confirm your booking with an easy upfront payment quick,safe and guaranteed.",
  },
  {
    icon: <Icon icon="mdi:gift" />,
    title: "Special Rewards & Offers",
    desc: "Enjoy up to 50% off selected stays and get special perks for early bookings.",
  },
  {
    icon: <Icon icon="ph:call-bell-fill" />,
    title: "Beyond the Room",
    desc: "Access dining, spa and concierge services all from the same app, even after booking.",
  },
];

export default function AboutCharlesonHotel() {
  return (
    <section className="bg-accent px-4 py-12 md:px-5 lg:px-10">
      {/* About Section */}
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center text-light">
        <h1 className="mb-6 text-2xl font-bold tracking-wide text-dark md:text-3xl">
          About Beautiful Luxury Hotel
        </h1>
        <p className="text-sm leading-relaxed text-gray-100 md:text-base">
          Beautiful Luxury Hotel in Port Harcourt is a top-rated boutique hotel featuring free WiFi,
          Eunice restaurant, Mmadukaego bar, and an infinity pool with rooftop views. Guests enjoy
          spacious suites with private gardens, 24-hour three-tiered security, and free parking.
          Every room is equipped with air conditioning, smart lighting, and marble walk-in bathrooms
          designed for total comfort.
        </p>
      </div>

      {/* List / Highlights */}
      <div className="container mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {List.map((item, index) => (
          <div
            key={index}
            className="md:duration-none flex flex-col items-center justify-start rounded-2xl bg-white/10 p-6 text-center shadow-sm transition-all duration-300 md:rounded-none md:bg-accent md:p-0 md:shadow-none md:transition-none"
          >
            <div className="mb-4 text-4xl text-primary">{item.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-primary">{item.title}</h3>
            <p className="text-sm text-gray-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
