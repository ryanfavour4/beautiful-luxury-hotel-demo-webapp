import type { HotelEvent, GetAllEvents, GetEventById } from "@/types/event";

/**
 * Mock event catalogue for the Beautiful Luxury Hotel editorial page.
 *
 * All images reference existing assets in /public/image.
 * Swap these exported helpers with API-backed queries later (see types/event.ts).
 */

const events: HotelEvent[] = [
  {
    id: "royal-garden-wedding",
    slug: "royal-garden-wedding",
    title: "An Evening of Vows by the Infinity Pool",
    category: "Wedding",
    description:
      "A timeless garden wedding set against the infinity pool and tropical lawns of Beautiful Luxury Hotel.",
    body: [
      "There are evenings that become etched in memory long before the candles burn low, and the garden wedding at Beautiful Luxury Hotel was one of them. Beneath a canopy of string lights, the infinity pool mirrored the amber sky while our floral team dressed the lawns in ivory orchids and trailing vines.",
      "The celebration unfolded across three curated acts — a champagne reception in the lounge, a five-course plated dinner from our executive chef, and a night of music beneath the stars. Every detail, from the marble place cards to the custom calligraphy, was composed with the same quiet devotion we bring to every private celebration.",
      "It is this marriage of intimacy and grandeur that defines an event at Beautiful. Whether the guest list numbers thirty or three hundred, the standard never changes: unhurried, sumptuous, and entirely yours.",
    ],
    heroImage: "/image/deluxe-rooms.jpg",
    images: [
      "/image/deluxe-rooms.jpg",
      "/image/poolpic.png",
      "/image/hotel-swimming-areas.jpg",
      "/image/loungeImg.png",
      "/image/restaurantImg.png",
      "/image/hotels-pool.jpg",
      "/image/room-cat.png",
      "/image/room-cat3.png",
    ],
    date: "Saturday, 14 March 2026",
    location: "Infinity Pool Gardens, Beautiful Luxury Hotel",
    info: {
      rows: [
        { label: "Event Type", value: "Wedding & Reception" },
        { label: "Venue", value: "Poolside Gardens & Grand Marquee" },
        { label: "Capacity", value: "Up to 300 guests" },
        { label: "Cuisine", value: "Bespoke plated fine dining" },
      ],
      highlights: [
        { label: "Bespoke Florals", detail: "Orchids & trailing vines composed in-house." },
        { label: "Dedicated Concierge", detail: "A private planner from first call to last dance." },
        { label: "Golden Hour Reception", detail: "Sunset champagne toast by the infinity pool." },
      ],
    },
  },
  {
    id: "port-harcourt-leadership-summit",
    slug: "port-harcourt-leadership-summit",
    title: "The Port Harcourt Leadership Summit",
    category: "Conference",
    description:
      "A day of ideas and influence in the Beautiful boardroom wing — where business meets hospitality.",
    body: [
      "The Beautiful boardroom wing was designed for the moments when business becomes memorable. For the annual Port Harcourt Leadership Summit, our executive boardroom and marquee hall were united into a single, seamless forum — a morning of keynotes, an afternoon of breakouts, and nonstop coffee service in the quiet lounge.",
      "Delegates moved between sessions with ease, supported by the hotel's signature service: discreet, prompt, and always one step ahead. Presentation suites with full AV, high-speed connectivity, and a culinary spread curated around the region's finest produce kept minds sharp and conversations flowing.",
      "A successful conference is measured in clarity and momentum. We provide the stage, the support, and the stillness between sessions — the rest is entirely yours.",
    ],
    heroImage: "/image/boardroom.png",
    images: [
      "/image/boardroom.png",
      "/image/room5.jpg",
      "/image/room2.jpg",
      "/image/restaurantImg.png",
      "/image/gympic.jpg",
      "/image/room4.jpg",
      "/image/room6.jpg",
    ],
    date: "Thursday, 21 May 2026",
    location: "Executive Boardroom & Marquee Hall",
    info: {
      rows: [
        { label: "Event Type", value: "Corporate Summit & Networking" },
        { label: "Venue", value: "Executive Boardroom & Marquee Hall" },
        { label: "Capacity", value: "Up to 180 delegates" },
        { label: "Amenities", value: "Full AV, high-speed connectivity" },
      ],
      highlights: [
        { label: "Full AV & Streaming", detail: "Multi-screen presentation suites built-in." },
        { label: "Curated Catering", detail: "Conferences fuelled by regional fine dining." },
        { label: "Dedicated Operations", detail: "An on-call events team throughout the day." },
      ],
    },
  },
  {
    id: "birthday-under-the-stars",
    slug: "birthday-under-the-stars",
    title: "Birthday Under the Stars",
    category: "Birthday",
    description:
      "An intimate milestone celebration in the rooftop lounge, with city lights below and gold above.",
    body: [
      "Milestones deserve more than a venue — they deserve a setting that knows how to throw a party. For 'Birthday Under the Stars,' the rooftop lounge of Beautiful Luxury Hotel became a private world: low amber light, a live acoustic duo, and a bespoke dessert table cascading in gold.",
      "The evening was entirely bespoke, from the signature cocktail named for the guest of honour to the seating plan that balanced old friends and new. Our events team managed every flourish behind the scenes, leaving the hosts free to simply be present.",
      "When the party finally spilled onto the terrace, the Port Harcourt skyline stretched below like a ribbon of light — the single most fitting backdrop for a night that was equal parts intimate and unforgettable.",
    ],
    heroImage: "/image/imperial-room.jpg",
    images: [
      "/image/imperial-room.jpg",
      "/image/chillingroom2.jpg",
      "/image/chillingroom3.jpg",
      "/image/loungeImg.png",
      "/image/hotels-pool.jpg",
      "/image/room3.jpg",
    ],
    date: "Saturday, 6 June 2026",
    location: "Rooftop Lounge & Terrace",
    info: {
      rows: [
        { label: "Event Type", value: "Private Celebration" },
        { label: "Venue", value: "Rooftop Lounge & Terrace" },
        { label: "Capacity", value: "Up to 60 guests" },
        { label: "Entertainment", value: "Live acoustic & bespoke playlists" },
      ],
      highlights: [
        { label: "Signature Cocktail", detail: "A drink created in your honour." },
        { label: "Live Acoustic", detail: "Mood curated around your guest list." },
        { label: "Bespoke Desserts", detail: "A gold-leaf dessert table, made in-house." },
      ],
    },
  },
  {
    id: "candlelit-private-dinner",
    slug: "candlelit-private-dinner",
    title: "A Candlelit Private Dinner",
    category: "Private Dinner",
    description:
      "An eight-course tasting menu in a candlelit alcove — the most personal table in the house.",
    body: [
      "Some evenings call for the smallest and most considered of tables. In a candlelit alcove off the main restaurant, our chef presented an eight-course tasting menu devised entirely around the preferences of a single guest — from the amuse-bouche to the cheese cart.",
      "Each plate arrived with a quiet explanation, each wine paired by the sommelier to match the course and the mood. The lighting softened as the evening deepened, and the world beyond the alcove simply disappeared.",
      "This is the privilege of the private dining rooms at Beautiful: a menu, a room, and an evening designed for one table alone.",
    ],
    heroImage: "/image/restaurantImg.png",
    images: [
      "/image/restaurantImg.png",
      "/image/indomie.jpg",
      "/image/rice.jpg",
      "/image/salad.jpg",
      "/image/spagetti.jpg",
      "/image/burgar.jpg",
    ],
    date: "Friday, 17 July 2026",
    location: "Private Dining Alcove, Eunice Restaurant",
    info: {
      rows: [
        { label: "Event Type", value: "Private Dining" },
        { label: "Venue", value: "Eunice Restaurant — Private Alcove" },
        { label: "Capacity", value: "Up to 14 guests" },
        { label: "Cuisine", value: "Eight-course tasting menu" },
      ],
      highlights: [
        { label: "Chef's Tasting Menu", detail: "An eight-course menu, yours to design." },
        { label: "Sommelier Pairing", detail: "Wines matched to every course." },
        { label: "Private Service", detail: "A dedicated butler for the evening." },
      ],
    },
  },
  {
    id: "spa-wellness-retreat",
    slug: "spa-wellness-retreat",
    title: "The Midnight Spa Retreat",
    category: "Retreat",
    description:
      "An immersive wellness evening across the spa and fitness wing — reset, restore, renew.",
    body: [
      "Wellness at Beautiful is not a service; it is an atmosphere. The Midnight Spa Retreat invited our guests to leave the day behind across a carefully choreographed evening: a guided stretch in the fitness studio, a thermal circuit, and a head-to-toe ritual in the treatment suites.",
      "Soft lamplight, warmed towels, and a menu of herbal infusions set the tone. Between rituals, guests wandered the quiet corridors of the pool deck, the city reduced to a distant hum.",
      "By the final ceremony, the unmistakable hush of restoration had settled over the wing — proof that the most luxurious gift a hotel can offer is the sense of arriving fully back to yourself.",
    ],
    heroImage: "/image/spaImg.png",
    images: [
      "/image/spaImg.png",
      "/image/fitnessImg.png",
      "/image/gympic.jpg",
      "/image/poolpic.png",
      "/image/hotels-pool.jpg",
    ],
    date: "Saturday, 8 August 2026",
    location: "Spa, Fitness & Pool Deck",
    info: {
      rows: [
        { label: "Event Type", value: "Wellness Retreat" },
        { label: "Venue", value: "Spa Wing & Pool Deck" },
        { label: "Capacity", value: "Up to 24 guests" },
        { label: "Includes", value: "Thermal circuit, ritual & infusion bar" },
      ],
      highlights: [
        { label: "Guided Movement", detail: "Sunrise and midnight stretch sessions." },
        { label: "Thermal Circuit", detail: "Steam, sauna and cold plunge." },
        { label: "Ritual Therapies", detail: "Signature restorative treatments." },
      ],
    },
  },
];

export const getAllEvents: GetAllEvents = () => events;

export const getEventById: GetEventById = (id: string) =>
  events.find((event) => event.id === id || event.slug === id);

/**
 * Single event by id — mirrors how an API-backed query would be consumed.
 * Kept for page readability and a clear future swap point.
 */
export const getEvent = getEventById;