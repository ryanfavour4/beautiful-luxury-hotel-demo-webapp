import Logo from "@/components/logo";
import type { HotelEvent } from "@/types/event";
import { Link } from "react-router";

interface Props {
  event: HotelEvent;
  index: number;
}

export default function EventCard({ event, index }: Props) {
  const reversed = index % 2 !== 0;

  return (
    <article
      className={`group relative grid items-center gap-10 overflow-hidden py-14 md:grid-cols-12 md:gap-16 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative col-span-7 overflow-hidden rounded-2xl md:col-span-5">
        <div className="aspect-[1.25] h-72 w-full overflow-hidden md:h-96 md:w-full">
          <img
            src={event.heroImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* floating category */}
        <div className="absolute left-6 top-6 rounded-full bg-light px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur md:px-5 md:py-2 md:text-xs">
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 col-span-7 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-10 bg-primary" />
          Event
        </div>

        <h2 className="font-lora text-4xl font-medium leading-tight text-dark md:text-5xl">
          {event.title}
        </h2>

        <p className="text-base leading-relaxed text-text md:text-lg">{event.description}</p>

        {/* Metadata */}
        <div className="flex flex-col gap-2 text-sm text-grey">
          <span>{event.date}</span>

          <span>{event.location}</span>
        </div>

        {/* CTA */}
        <Link
          to={`/events/${event.id}`}
          className="group/link mt-3 inline-flex w-fit items-center gap-3 border-b border-primary pb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-all hover:gap-5"
        >
          Explore event
          <span className="transition-transform group-hover/link:translate-x-1">→</span>
        </Link>
      </div>

      <span
        className={`absolute -bottom-16 z-0 scale-90 opacity-[0.1] transition-transform delay-200 group-hover:scale-95 md:bottom-0 md:scale-150 md:group-hover:scale-[1.6] ${reversed ? "right-0 -rotate-45 md:left-0 md:right-auto md:rotate-45" : "right-0 -rotate-45"}`}
      >
        <Logo className="size-full w-[12rem]" />
      </span>
    </article>
  );
}
