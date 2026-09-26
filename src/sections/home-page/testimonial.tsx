import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import TestimonialPic1 from "/image/testimony-pic-1.png";
import TestimonialPic2 from "/image/testimony-pic-2.png";
import TestimonialPic3 from "/image/testimony-pic-3.png";
import QuotationMarkRight from "/svg/quotationmarkfaceright.svg";
import QuotationMarkLeft from "/svg/quotationmarkfaceleft.svg";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    id: 1,
    name: "Osike G, Nigeria",
    text: `Beautiful Luxury Hotel gave me an unforgettable experience. The moment I arrived, the staff welcomed me warmly and made everything feel effortless. My room was comfortable, the food was delicious, and the atmosphere around the pool was incredibly relaxing. Everything felt perfectly organized. I’m already planning my next visit because it felt like home.`,
    image: TestimonialPic1,
  },
  {
    id: 2,
    name: "Vicky D, Belgium",
    text: `We stayed in this hotel after our flight back to Belgium was cancelled.The hotel is beautiful, food is nice, but most of all the management and reception were the sweetest ever. They helped us with everything. Making call, looking for solutions etc. If ever we come back here, we'll definitely stay in this hotel again..`,
    image: TestimonialPic2,
  },
  {
    id: 3,
    name: "Cajetan, United States",
    text: `My stay at Beautiful Luxury Hotel Was enjoyable. My children loved it. From the moment I checked in, the staff treated me like family. The pool area was spotless, and the restaurant served some of the best local dishes I’ve ever tasted. The service was seamless and friendly — I can’t wait to come back for another getaway.`,
    image: TestimonialPic3,
  },
];

export default function TestimonialSection() {
  const [currentPage, setCurrentPage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const active = testimonials[currentPage];

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={2}
      loop={true}
      onSlideChange={(swiper) => {
        setCurrentPage(swiper.realIndex);
      }}
      className="w-full"
    >
      {testimonials.map(() => (
        <SwiperSlide>
          <section
            key={active.id}
            className="container flex flex-col items-center justify-between gap-10 px-4 py-12 text-center md:flex-row md:gap-5 md:px-5 md:text-left lg:px-10"
          >
            {/* pic section */}
            <div className="flex flex-1 justify-center">
              <img
                src={active.image}
                alt="Testimonial"
                className="w-full rounded-lg object-cover sm:max-w-[16rem] md:max-w-xs"
              />
            </div>

            {/* text and button section */}
            <div className="flex flex-1 flex-col items-center md:items-start">
              <div>
                <img
                  src={QuotationMarkRight}
                  alt="Quote Left"
                  className="mb-6 h-10 w-10 md:mb-8 md:h-14 md:w-14"
                />
              </div>

              <p className="max-w-md text-justify text-sm text-black sm:text-base md:max-w-none">
                {active.text}
              </p>

              <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
                <h1 className="text-xl font-bold text-black md:text-2xl">{active.name}</h1>
                <img
                  src={QuotationMarkLeft}
                  alt="Quote Right"
                  className="h-10 w-10 md:h-14 md:w-14"
                />
              </div>

              {/* buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="rounded-full border-2 border-primary p-2 md:p-2"
                >
                  <Icon
                    icon="material-symbols-light:chevron-left-rounded"
                    className="h-6 w-6 text-primary md:h-7 md:w-7"
                  />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="rounded-full border-2 border-primary p-2 md:p-2"
                >
                  <Icon
                    icon="material-symbols-light:chevron-right-rounded"
                    className="h-6 w-6 text-primary md:h-7 md:w-7"
                  />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="mt-6 flex justify-center gap-2 md:justify-start">
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentPage ? "bg-primary" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
