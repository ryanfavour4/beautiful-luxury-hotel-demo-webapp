import { Icon } from "@iconify/react";

const luxuryHotelServices = [
  {
    id: 1,
    name: "Security & Privacy",
    description: "24/7 surveillance and discreet service to ensure your safety and peace of mind.",
    icon: <Icon icon="ic:twotone-security" />,
  },
  {
    id: 2,
    name: "Lifestyle & Experiences",
    description:
      "Indulge in curated spa sessions, city tours, and personalized leisure activities.",
    icon: <Icon icon="map:spa" />,
  },
  {
    id: 3,
    name: "Order Food",
    description: "Enjoy gourmet meals delivered to your room with just a few taps.",
    icon: <Icon icon="picon:serving" />,
  },
  {
    id: 4,
    name: "Chat Support",
    description: "Connect instantly with our team for quick assistance or recommendations.",
    icon: <Icon icon="bxs:chat" />,
  },
  {
    id: 5,
    name: "Business & Events",
    description: "Host seamless meetings and events in our modern, equipped spaces.",
    icon: <Icon icon="healthicons:group-discussion-meetingx3" />,
  },
  {
    id: 6,
    name: "Room Services",
    description: "Experience attentive housekeeping and personalized in-room care.",
    icon: <Icon icon="material-symbols:room-service" />,
  },
  {
    id: 7,
    name: "Fine Dining Restaurant",
    description: "Savor world-class cuisine in an elegant and inviting atmosphere.",
    icon: <Icon icon="boxicons:outdoor-dining-filled" />,
  },
  {
    id: 8,
    name: "Luxury Bar & Lounge",
    description: "Relax with signature cocktails and soft music in our stylish lounge.",
    icon: <Icon icon="maki:bar" />,
  },
];

export default function HotelServices() {
  return (
    <section className="container px-3 pt-12 md:px-5 md:pt-12 lg:px-1">
      {/* header text */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-dark md:text-3xl">Hotel Services</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text md:text-base">
          Discover our most popular rooms, carefully selected to give you the perfect blend of
          comfort, luxury and relaxation. Each one is designed to make your stay unforgettable
        </p>
      </div>
      {/* Features grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {luxuryHotelServices.map((service) => (
          <div
            key={service.id}
            className="flex flex-1 flex-col gap-2 rounded-md border-2 border-primary px-2 py-8 text-black"
          >
            <div className="text-5xl text-primary">{service.icon}</div>
            <div className="text-xl font-semibold">{service.name}</div>
            <div className="text-sm">{service.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
