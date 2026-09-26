import Navbar from "@/layout/top-nav-bar";
import type { HotelEvent } from "@/types/event";

/**
 * Cinematic full-bleed hero. Large image, dark gradient, event title,
 * short description and date/location metadata — following the
 * existing Home/Services hero conventions but anchored to the image bottom.
 */
export default function EventHero({ event }: { event: HotelEvent }) {
  return (
    <div className="relative flex min-h-[60dvh] w-full flex-col overflow-hidden pb-12 pt-2.5 md:min-h-[80dvh]">
      {/* Background image */}
      <img
        src={event.heroImage}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/95" />

      {/* Navbar — above overlay */}
      <nav className="container relative z-20 my-0">
        <Navbar />
      </nav>

      {/* Copy — anchored bottom-left, editorial masthead style */}
      <div className="relative z-10 mt-auto">
        <div className="container px-4 pb-6 md:px-6">
          {/* Eyebrow */}
          <p className="mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary md:text-sm">
            <span className="inline-block h-px w-12 bg-primary" />
            {event.category}
          </p>

          <h1 className="font-lora max-w-4xl text-4xl font-medium leading-[1.08] text-light md:text-4xl lg:text-6xl">
            {event.title}
          </h1>

          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-light/85 md:text-lg">
            {event.description}
          </p>

          {/* Metadata */}
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-light/90 md:text-base">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
