import type { HotelEvent } from "@/types/event";
import { useState } from "react";

/**
 * Luxury editorial gallery – asymmetric layout with a light‑box preview.
 * Images are displayed at varying sizes to create visual rhythm.
 */
export default function EventGallery({ event }: { event: HotelEvent }) {
  const images = event.images ?? [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!images.length) return null;

  // Helper to render each image with optional custom size class
  const renderImage = (src: string, idx: number) => {
    // Determine size class based on index to create asymmetry
    const sizeClass =
      idx === 0 ? "md:col-span-2 md:row-span-2" : idx === 1 ? "md:col-span-1 md:row-span-2" : "";
    return (
      <div
        key={idx}
        className={`relative overflow-hidden rounded-xl ${sizeClass}`}
        onClick={() => setOpenIdx(idx)}
      >
        <img
          src={src}
          alt={`${event.title} image ${idx + 1}`}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
    );
  };

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-5">
      <h2 className="text-2xl font-bold text-dark md:text-3xl">Gallery</h2>
      {/* Asymmetric grid – uses auto‑flow dense to pack images */}
      <div className="mx-auto grid grid-cols-1 gap-3 md:auto-rows-[100px] md:grid-cols-3 md:gap-5">
        {images.map((src, idx) => renderImage(src, idx))}
      </div>

      {/* Lightbox overlay */}
      {openIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            onClick={() => setOpenIdx(null)}
            className="absolute right-4 top-4 text-3xl text-white"
          >
            ✕
          </button>
          <img
            src={images[openIdx]}
            alt={`${event.title} large view`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-xl"
          />
        </div>
      )}
    </section>
  );
}
