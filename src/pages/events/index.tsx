import { getAllEvents } from "@/data/events";
import SEO from "@/components/seo/seo.tsx";
import Navbar from "@/layout/top-nav-bar";
import Footer from "@/layout/footer";
import EventCard from "@/sections/event/event-card";
import LineDivider from "@/components/ui/line-divider";
import EventContact from "@/sections/event/event-contact";

/**
 * Events listing page – editorial archive of all hotel events.
 * Uses the same visual language as the rest of the site (gold accents,
 * Lora headings, Manrope body, container, and animation patterns).
 */
export default function EventsPage() {
  const events = getAllEvents();

  return (
    <>
      {/* SEO */}
      <SEO
        title="Events & Celebrations | Beautiful Luxury Hotel"
        description="Explore our curated events – weddings, conferences, birthdays, and more – at Beautiful Luxury Hotel."
      />

      {/* Hero */}
      <section className="relative flex min-h-[70dvh] w-full flex-col overflow-hidden pb-12 pt-2.5">
        {/* Background image – using a generic hotel image */}
        <img
          src="/image/charleson-building.jpg"
          alt="Beautiful Luxury Hotel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Navbar */}
        <nav className="container relative z-20 my-0">
          <Navbar />
        </nav>
        {/* {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-12 pt-28 text-center">
          <h1 className="font-lora mb-4 text-4xl font-bold text-light md:text-6xl">
            Events &amp; Celebrations
          </h1>
          <p className="text-lg text-light md:text-xl">
            Discover unforgettable celebrations, weddings, and gatherings hosted at Beautiful Luxury
            Hotel.
          </p>
        </div>
      </section>
      <label className="bg-secondary block w-full py-1">
        <LineDivider />
      </label>

      {/* Events listing */}
      <section className="container mx-auto px-4 py-12 pt-1 md:px-6">
        {events.length ? (
          events.map((event, idx) => <EventCard key={event.id} event={event} index={idx} />)
        ) : (
          <div className="py-20 text-center">
            <h2 className="font-lora mb-4 text-3xl font-bold text-dark">No events found</h2>
            <p className="text-lg text-text">
              We will be adding events soon. Please check back later.
            </p>
          </div>
        )}
      </section>

      {/* CTA – landing‑page style */}
      <EventContact />

      <Footer />
    </>
  );
}
