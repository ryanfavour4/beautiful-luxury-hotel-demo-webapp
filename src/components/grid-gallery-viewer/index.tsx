import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

type Props = {
  images: string[];
};

export function GridGalleryViewer({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<"">("");

  const firstFour = images.slice(0, 4);
  const extraCount = images.length - 4;

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* BIG IMAGE */}
        <div className="group relative h-full max-h-[27rem] overflow-hidden rounded-xl">
          <img
            src={firstFour[0] || undefined}
            className="aspect-[1.5] h-full w-full rounded-lg object-cover transition duration-200 group-hover:scale-105"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid h-full max-h-[27rem] grid-cols-3 gap-2 rounded-xl md:grid-cols-1 md:grid-rows-2">
          {/* TOP IMAGE */}
          {firstFour[1]?.toLowerCase()?.endsWith(".mp4") ? (
            <div className="group cursor-pointer overflow-hidden rounded-xl transition duration-200 group-hover:scale-105">
              <video
                src={firstFour[1]}
                className="h-full w-full rounded-lg object-cover transition duration-200 group-hover:scale-105 md:aspect-[2.5] md:h-auto"
                onClick={() => setOpen(true)}
              />
            </div>
          ) : (
            <div className="group cursor-pointer overflow-hidden rounded-xl transition duration-200 group-hover:scale-105">
              <img
                src={firstFour[1]}
                className="h-full w-full rounded-lg object-cover transition duration-200 group-hover:scale-105 md:aspect-[2.5]"
                onClick={() => setOpen(true)}
              />
            </div>
          )}

          {/* BOTTOM ROW */}
          <div className="col-span-2 grid h-full max-h-[13.5rem] grid-cols-2 gap-2 md:col-span-1">
            {firstFour.slice(2, 4).map((img, idx) => (
              <div key={idx} className="aspect-1 relative cursor-pointer">
                {img?.toLowerCase()?.endsWith(".mp4") ? (
                  <div className="group h-full max-h-[13.2rem] overflow-hidden rounded-xl transition duration-200 group-hover:scale-105">
                    <video
                      src={img}
                      className="h-full max-h-[13.2rem] w-full rounded-lg object-cover transition duration-200 group-hover:scale-105"
                      onClick={() => setOpen(true)}
                    />
                  </div>
                ) : (
                  <div className="group h-full max-h-[13.2rem] overflow-hidden rounded-xl transition duration-200 group-hover:scale-105">
                    <img
                      src={img}
                      className="h-full max-h-[13.2rem] w-full rounded-lg object-cover transition duration-200 group-hover:scale-105"
                      onClick={() => setOpen(true)}
                    />
                  </div>
                )}

                {/* SEE MORE OVERLAY */}
                {idx === 1 && extraCount > 0 && (
                  <button
                    onClick={() => setOpen(true)}
                    className="absolute inset-0 flex max-h-[13.2rem] items-center justify-center rounded-lg bg-black/60 text-lg font-semibold text-white"
                  >
                    +{extraCount} more
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-black/80">
          <button
            onClick={() => {
              setOpen(false);
              setThumbsSwiper("");
            }}
            className="absolute right-5 top-5 text-2xl text-white"
          >
            ✕
          </button>

          <div className="w-[95%] max-w-4xl rounded-md bg-light md:rounded-xl">
            <Swiper
              modules={[Pagination, Thumbs]}
              pagination
              spaceBetween={20}
              slidesPerView={1}
              thumbs={{
                swiper: thumbsSwiper,
              }}
              className=""
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  {img.toLowerCase().endsWith(".mp4") ? (
                    <video src={img} controls className="h-[400px] w-full object-contain" />
                  ) : (
                    <img src={img} className="h-[400px] w-full object-contain" />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Swiper
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSwiper={setThumbsSwiper as any}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="!w-[95%] max-w-4xl rounded-md bg-light/25 px-2 md:rounded-xl"
          >
            {images.map((img) => (
              <SwiperSlide className="aspect-2 md:aspect-1">
                {img.toLowerCase().endsWith(".mp4") ? (
                  <div className="relative h-full w-full bg-gray-800">
                    <video src={img} className="aspect-square md:aspect-video" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-xs text-white">▶ Video</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={img}
                    className="aspect-square h-full w-full object-cover md:aspect-video"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}

export function GridGalleryViewerSkeleton() {
  return (
    <div className="grid max-h-[27rem] animate-pulse grid-cols-1 gap-2 md:grid-cols-2">
      {/* BIG IMAGE SKELETON */}
      <div className="relative h-full max-h-[27rem]">
        <div className="aspect-[1.5] h-full w-full rounded-lg bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* RIGHT COLUMN SKELETON */}
      <div className="grid h-full max-h-[27rem] min-h-48 grid-cols-3 grid-rows-2 gap-2 overflow-hidden md:grid-cols-1">
        {/* TOP IMAGE SKELETON */}
        <div className="h-full w-full rounded-lg bg-gray-300 dark:bg-gray-700 md:aspect-[2.5] md:h-full" />

        {/* BOTTOM ROW SKELETON */}
        <div className="col-span-2 grid grid-cols-2 gap-2 md:col-span-1">
          <div className="h-full w-full rounded-lg bg-gray-300 dark:bg-gray-700" />
          <div className="h-full w-full rounded-lg bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
