const SITE = "https://charlsonluxuryhotels.com";

export const seo = {
  home: {
    title: "Beautiful Luxury Hotel | Luxury Hotel in Port Harcourt",

    description:
      "Experience comfort, elegance and exceptional hospitality at Beautiful Luxury Hotel in Port Harcourt.",

    canonical: `${SITE}/`,

    ogImage: `${SITE}/images/og/home.jpg`,

    keywords: [
      "hotel in Port Harcourt",
      "luxury hotel Port Harcourt",
      "Beautiful Luxury Hotel",
      "hotel near GRA Port Harcourt",
    ],

    schema: {
      "@context": "https://schema.org",
      "@type": "Hotel",

      name: "Beautiful Luxury Hotel",

      url: SITE,

      image: `${SITE}/images/hotel.jpg`,

      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Harcourt",

        addressCountry: "Nigeria",
      },
    },
  },

  rooms: {
    title: "Luxury Hotel Rooms in Port Harcourt | Beautiful Luxury Hotel",

    description:
      "Book comfortable and elegant rooms at Beautiful Luxury Hotel with premium hospitality in Port Harcourt.",

    canonical: `${SITE}/rooms`,

    ogImage: `${SITE}/images/og/rooms.jpg`,

    keywords: ["hotel rooms Port Harcourt", "luxury accommodation Port Harcourt"],
  },

  weddings: {
    title: "Wedding Venue in Port Harcourt | Beautiful Luxury Hotel",

    description:
      "Celebrate your wedding and events at Beautiful Luxury Hotel with elegant spaces and hospitality.",

    canonical: `${SITE}/weddings`,

    ogImage: `${SITE}/images/og/weddings.jpg`,
  },
};
