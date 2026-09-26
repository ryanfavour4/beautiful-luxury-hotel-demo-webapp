import LineDivider from "@/components/ui/line-divider";
import type { HotelEvent } from "@/types/event";
import { Icon } from "@iconify/react";

/**
 * Expanded event information – larger typography, gold accents and a balanced editorial layout.
 */
export default function EventInfo({ event }: { event: HotelEvent }) {
  const { rows, highlights } = event.info;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-dark md:text-3xl">Event Details</h2>
        <div className="">
          {/* Textual details – upscale typography */}
          <div className="space-y-8">
            {/* Key/value rows */}
            <dl className="space-y-6">
              {rows.map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Icon
                    icon="ic:baseline-event-seat"
                    className="text-primary"
                    width={28}
                    height={28}
                  />
                  <div>
                    <dt className="text-sm font-medium text-text/50">{row.label}:</dt>
                    <dd className="text-lg font-semibold text-text/75">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mx-auto w-full max-w-4xl px-6">
              <LineDivider />
            </div>
            {/* Highlights – prominent */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-dark md:text-3xl">Highlights</h2>

              <ul className="space-y-6">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Icon icon="mdi:star-circle" className="text-primary" width={28} height={28} />
                    {/* <Icon icon="glyphs:star-bold" className="text-primary" width={28} height={28} /> */}
                    <div>
                      <p className="text-lg font-medium text-text">{h.label}</p>
                      <p className="mt-1 text-base text-grey">{h.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
