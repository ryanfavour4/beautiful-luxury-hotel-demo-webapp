import { useParams } from "react-router";
import { getEvent } from "@/data/events";
import SEO from "@/components/seo/seo.tsx";
import Footer from "@/layout/footer";
import EventHero from "@/sections/event/event-details-hero";
import EventStoryWriteup from "@/sections/event/event-story-writeup";
import EventGallery from "@/sections/event/event-gallery";
import EventInfo from "@/sections/event/event-info";
import EventContact from "@/sections/event/event-contact";
import LineDivider from "@/components/ui/line-divider";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = getEvent(id ?? "");

  if (!event) {
    return (
      <>
        <SEO
          title="Event Not Found | Beautiful Luxury Hotel"
          description="The requested event could not be found."
        />
        <div className="container mx-auto flex min-h-[80dvh] flex-col items-center justify-center px-4 py-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-dark md:text-4xl">Event Not Found</h1>
          <p className="mb-6 text-base text-text md:text-lg">
            We couldn't locate the event you are looking for. Please check the URL or return to the
            homepage.
          </p>
          <a href="/" className="btn-primary w-fit">
            Go Home
          </a>
        </div>
        <Footer />
      </>
    );
  }

  // Simple SEO – title includes event title, description uses event description.
  const canonical = `${window.location.origin}/events/${event.slug}`;
  const ogImage = event.heroImage;

  return (
    <>
      <SEO
        title={`${event.title} | Beautiful Luxury Hotel`}
        description={event.description}
        canonical={canonical}
        ogImage={ogImage}
        keywords={["Beautiful", "event", event.category, "luxury hotel"]}
      />
      <EventHero event={event} />

      <label className="bg-secondary block w-full py-1">
        <LineDivider />
      </label>

      <section className="grid md:grid-cols-3">
        <span className="flex flex-col gap-8 pb-10 md:col-span-2">
          <EventStoryWriteup event={event} />
          <div className="mx-auto w-full max-w-4xl px-6">
            <LineDivider />
          </div>
          <EventGallery event={event} />
        </span>
        <span className="col-span-1 border-primary md:border-l">
          <EventInfo event={event} />
        </span>
      </section>
      <EventContact />
      <Footer />
    </>
  );
}
