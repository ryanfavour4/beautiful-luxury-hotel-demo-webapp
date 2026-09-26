/**
 * Event domain types for the Beautiful Luxury Hotel editorial page.
 *
 * These types describe a fetched event. The page is data-driven so that a
 * future API can replace the local mock source without changing the UI.
 */

export type EventCategory =
  | "Wedding"
  | "Conference"
  | "Birthday"
  | "Private Dinner"
  | "Corporate Event"
  | "Retreat"
  | "Reception";

export interface EventHighlight {
  /** Short label, e.g. "Bespoke Cuisine" */
  label: string;
  /** One-line supporting detail. */
  detail: string;
}

export interface EventInfo {
  /** Primary information rows, e.g. Event type, Venue, Capacity. */
  rows: { label: string; value: string }[];
  /** Editorial highlights shown in the information section. */
  highlights: EventHighlight[];
}

export interface HotelEvent {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  /** Short tagline used in the hero + SEO description. */
  description: string;
  /** Long-form editorial body (magazine storytelling). */
  body: string[];
  heroImage: string;
  images: string[];
  date: string;
  location: string;
  info: EventInfo;
}

/**
 * API-ready selector. Swap this function's internals for a real query/
 * fetch call (e.g. React Query hook in src/api/hooks) without touching the page.
 */
export type GetEventById = (id: string) => HotelEvent | undefined;
export type GetAllEvents = () => HotelEvent[];