import type { HotelEvent } from "@/types/event";

/**
 * Magazine-style long-form editorial. A narrow measure, generous line
 * height and a pull-quote ornament keep the storytelling airy and luxurious.
 */
export default function EventStoryWriteup({ event }: { event: HotelEvent }) {
  return (
    <section className="container px-4 pt-20 md:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Drop cap opening via oversized first line, muted kicker */}
        <p className="mb-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          <span className="inline-block h-px w-10 bg-primary" />
          The Story
        </p>

        <div className="space-y-6">
          {event.body.map((paragraph, idx) => (
            <p
              key={idx}
              className={`font-lora text-lg font-light leading-[1.9] text-text md:text-xl ${
                idx === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-4xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-primary first-letter:md:text-6xl"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
