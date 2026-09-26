import { useParams } from "react-router";
import Navbar from "@/layout/top-nav-bar";
import { Icon } from "@iconify/react";
import ChillingRoom1 from "/image/chillingroom1.jpg";
import ChillingRoom2 from "/image/poolpic.png";
import BoardRoom from "/image/boardroom.png";
import ChillingRoom4 from "/image/charlesonbar.jpg";
import FitnessCenter from "/image/gympic.jpg";
import Modal from "@/components/modal";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Input from "@/components/input";
import Footer from "@/layout/footer";
import PhoneInput from "react-phone-input-2";
import { useAuthStore } from "@/store/auth";
const today = new Date().toISOString().split("T")[0];
import { FoodListContext } from "@/components/foolist-context/foodlist";
import { useContext } from "react";
import { foodList } from "./food-list-type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import Policies from "../room-id-page/policies-page";

export default function ServicesId() {
  const { cartItems, getTotalCartAmount } = useContext(FoodListContext)!;
  const [showSlider, setShowSlider] = useState(false);

  const totalAmount = getTotalCartAmount();
  const { auth } = useAuthStore();

  const [fullName, setFullName] = useState({ value: auth?.user?.fullName || "" });
  const [email, setEmail] = useState({ value: auth?.user?.email || "" });
  const [phone, setPhone] = useState({ value: auth?.user?.phone || "" });
  const [dob, setDob] = useState({ value: auth?.user?.dateOfBirth || "" });
  const [guest, setGuest] = useState({ value: "" });
  const [specialRequest, setSpecialRequest] = useState({ value: "" });

  useEffect(() => {
    if (auth?.user) {
      setFullName({ value: auth.user.fullName || "" });
      setEmail({ value: auth.user.email || "" });
      setPhone({ value: auth.user.phone || "" });
      setDob({ value: auth.user.dateOfBirth || "" });
      setGuest({ value: "" });
      setSpecialRequest({ value: "" });
    }
  }, [auth?.user]);

  // const discardChanges = () => {
  //   if (auth?.user) {
  //     setFullName({ value: auth.user.fullName || "" });
  //     setEmail({ value: auth.user.email || "" });
  //     setPhone({ value: auth.user.phone || "" });
  //     setCountry({ value: auth.user.country || "" });
  //     setAddress({ value: auth.user.address || "" });
  //     setZipCode({ value: auth.user.postalCode || "" });
  //     setDob({ value: auth.user.dateOfBirth || "" });
  //     setGender({ value: auth.user.gender || "" });
  //     setAvatarPreview(auth.user.avatar || avatar);
  //   }
  // };

  const [modalClosed, setModalClosed] = useState(true);
  const { slug } = useParams();

  const amenities = [
    { label: "Comfortable Seating Area", icon: "mdi:love-seat" },
    { label: "Reservation & VIP Section", icon: "mingcute:vip-2-fill" },
    { label: "Music & Entertainment", icon: "fa7-solid:music" },
    { label: "Full Bar & Drinks Menu", icon: "maki:bar" },
    { label: "Parking Space", icon: "material-symbols:parking-sign" },
    { label: "Cigarette Lounge", icon: "temaki:vending-cigarettes" },
  ];

  const images = [
    ChillingRoom1,
    ChillingRoom2,
    BoardRoom,
    ChillingRoom4,
    FitnessCenter,
    ChillingRoom1,
    ChillingRoom2,
    BoardRoom,
  ];

  const VISIBLE_IMAGES = 5;
  const visibleImages = images.slice(0, VISIBLE_IMAGES);
  const remainingCount = images.length - VISIBLE_IMAGES;

  const sections = [
    { label: "Overview", id: "overview" },
    { label: "Amenities", id: "amenities" },
    { label: "Reviews", id: "reviews" },
    { label: "Policies", id: "policies" },
  ];

  return (
    <section className="overflow-hidden pt-3">
      {/* NavBar */}
      <nav className="sticky top-0 z-20 w-full bg-white shadow-md">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-3 md:px-1 lg:px-1">
        {/* Header text */}
        <div>
          <div className="flex justify-between gap-10 pt-9 md:gap-0">
            <h1 className="text-2xl font-bold text-dark md:text-3xl">{slug}</h1>
            <div className="flex gap-6">
              <button>
                <Icon
                  icon="solar:heart-angle-broken"
                  width="27"
                  height="27"
                  className="text-dark"
                />
              </button>
              <button
                onClick={async () => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Check this out",
                      text: "Look at this room I found!",
                      url: window.location.href,
                    });
                  } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <Icon
                  icon="material-symbols-light:share-outline"
                  width="27"
                  height="27"
                  className="text-dark"
                />
              </button>
            </div>
          </div>

          <p className="font-bold text-dark">Port Harcourt</p>
        </div>
        {/* Buttons */}
        <div className="scrollbar-hide flex gap-8 overflow-x-auto whitespace-nowrap">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="pt-8 font-bold text-dark hover:text-primary hover:underline"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Image gallery */}
        <div
          id="overview"
          className="mt-8 flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 lg:grid-rows-2"
        >
          {visibleImages.map((img, index) => {
            const isLast = index === visibleImages.length - 1;

            return (
              <div
                key={index}
                className={`group relative max-h-64 min-w-[85%] overflow-hidden rounded-xl border border-primary shadow-md md:h-full md:min-w-0 ${index === 0 ? "md:row-span-2 md:max-h-[unset]" : ""} `}
              >
                <img
                  src={img}
                  alt="Deluxe Suite"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    isLast ? "blur-sm" : ""
                  }`}
                />

                {isLast && remainingCount > 0 && (
                  <button
                    onClick={() => setShowSlider(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60"
                  >
                    <span className="text-2xl font-bold text-white">+{remainingCount} More</span>
                  </button>
                )}
              </div>
            );
          })}
          {/* slider */}
          {showSlider && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              {/* Close button */}
              <button
                onClick={() => setShowSlider(false)}
                className="absolute right-8 top-7 z-50 rounded-full bg-white px-3 py-2 font-semibold text-primary"
              >
                ✕
              </button>

              {/* Slider */}
              <div className="w-full max-w-3xl px-4">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  effect={"cube"}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className="h-[70vh] w-full rounded-xl object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>

        {/* Description & details */}
        <div className="pt-10">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
            {/* Description */}
            <div className="max-w-2xl space-y-4">
              <h1 className="text-2xl font-bold text-dark md:text-3xl">Description</h1>

              <p className="leading-relaxed text-gray-700">
                Welcome to the Chalerson Lounge & Bar, a relaxed and stylish space perfect for
                unwinding. Featuring a modern bar with premium drinks, comfortable seating, and a
                warm ambiance, it&apos;s ideal for casual hangouts, evening drinks, or social
                moments with friends. Attentive service and a vibrant atmosphere make every visit
                enjoyable.
              </p>

              {/* foodList */}
              <div className="w-full py-8">
                <h1 className="mb-3 text-2xl font-bold text-dark md:text-3xl">Food Menu</h1>
                <FoodList />
              </div>
              {/* amenities */}
              <div className="mt-10">
                <h1 className="mb-3 text-2xl font-bold text-dark md:text-3xl">Amenities</h1>

                <div id="amenities" className="grid grid-cols-2 gap-x-16 gap-y-5 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <div key={amenity.label} className="flex items-center gap-4 py-1">
                      <Icon icon={amenity.icon} width={26} height={26} className="text-primary" />
                      <span className="text-base font-medium text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="w-full lg:max-w-sm">
              <div className="flex w-full flex-col space-y-4 rounded-2xl border border-gray-200 p-6 shadow-md">
                {/* Check In - Out */}
                <div className="flex justify-between border-b pb-4">
                  {/* Check In */}
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:calendar-linear"
                      width={20}
                      height={20}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">Check in</span>
                      <span className="text-xs text-gray-500">07 Aug 2023</span>
                    </div>
                  </div>

                  {/* Check Out */}
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:calendar-linear"
                      width={20}
                      height={20}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">Check out</span>
                      <span className="text-xs text-gray-500">07 Aug 2023</span>
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="border-b pb-3">
                  <h2 className="font-semibold text-gray-700">Guests</h2>
                  <p className="text-sm text-gray-600">2 adults</p>
                </div>

                {/* Details */}
                <h2 className="font-semibold text-gray-700">Your Order</h2>
                {foodList.map((food) => {
                  if (cartItems[food.id] > 0) {
                    const quantity = cartItems[food.id];
                    return (
                      <div key={food.id}>
                        <p className="text-sm font-bold text-gray-600"> {food.name}</p>
                        <p className="text-sm text-gray-600">
                          <span className="text-sm font-semibold text-primary"> ${food.price}</span>{" "}
                          × {quantity}
                        </p>
                      </div>
                    );
                  }

                  return null;
                })}

                {/* <div className="space-y-1 border-b pb-3">
                  <h2 className="font-semibold text-gray-700">Details</h2>
                  <p className="text-sm text-gray-600">Capacity: 2 persons</p>
                  <p className="text-sm text-gray-600">For 3 persons (per night): $100</p>
                  <p className="text-sm text-gray-600">
                    For each additional person (per night): $50
                  </p>
                </div>  */}

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Price:</span>
                  <span className="text-primary">${totalAmount}</span>
                </div>

                {/* Modal Button */}
                <button
                  onClick={() => setModalClosed(!modalClosed)}
                  className="mt-2 w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90"
                >
                  Reserve
                </button>
              </div>

              {/* <button
               
                className="mt-2 w-full rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary/90"
              >
                Reserve
              </button> */}
            </div>
            {/* MODAL */}
            <Modal
              closeModal={() => setModalClosed(!modalClosed)}
              isModalClosed={modalClosed}
              parentClassName="!py-6 md:!py-10  !items-start flex items-center justify-center"
              className="!w-11/12 md:!w-fit"
            >
              <div className="w-full rounded-2xl bg-white p-4 shadow-xl md:min-w-[28rem] md:p-7">
                {/* Close button */}
                <button
                  onClick={() => setModalClosed(!modalClosed)}
                  className="ml-auto flex items-center justify-end text-gray-500 hover:text-dark"
                  aria-label="Close modal"
                >
                  <Icon className="text-2xl" icon="iconoir:cancel" />
                </button>

                <div className="mt-3 flex flex-col">
                  {/* Header */}
                  <div className="space-y-1">
                    <h1 className="text-lg font-bold text-dark md:text-2xl">Book {slug} Service</h1>
                    <p className="text-sm font-medium text-gray-600 md:text-base">
                      Enjoy your experience in comfort. Reserve your space now.
                    </p>
                    <h2 className="text-xl font-semibold text-primary">$1,200</h2>
                  </div>

                  {/* Form */}
                  <form className="mt-6 w-full">
                    <div className="grid grid-cols-1 gap-5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-sm font-semibold text-dark/70">Full Name</label>
                        <Input
                          type="text"
                          name="fullName"
                          state={fullName}
                          setState={setFullName}
                          icon={
                            <Icon icon="mingcute:user-2-line" className="text-grey" fontSize={22} />
                          }
                          placeholder="e.g John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-sm font-semibold text-dark/70">Email Address</label>
                        <Input
                          type="text"
                          name="email"
                          state={email}
                          setState={setEmail}
                          icon={
                            <Icon
                              icon="majesticons:mail-line"
                              className="text-grey"
                              fontSize={22}
                            />
                          }
                          placeholder="Enter your email address"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-sm font-semibold text-dark/70">Phone Number</label>
                        <PhoneInput
                          country="ng"
                          placeholder="Phone Number"
                          value={phone.value}
                          onChange={(phone) => setPhone({ value: phone })}
                          inputClass="!w-full !bg-transparent !h-[2.75rem] border-2 rounded-md"
                          buttonClass="!bg-transparent !shadow-none !rounded-l-md"
                          containerClass="!w-full !rounded-md border border-neutral-300"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-sm font-semibold text-dark/70">Date of Birth</label>
                        <Input
                          type="date"
                          name="dob"
                          max={today}
                          state={dob}
                          setState={setDob}
                          icon={<Icon icon="bi:calendar2-date" className="text-2xl text-grey" />}
                          placeholder="Date Of Birth"
                        />
                      </div>
                      {/* Guest */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-sm font-semibold text-dark/70">Guests</label>
                        <Input
                          type="text"
                          name="guest"
                          state={guest}
                          setState={setGuest}
                          icon={
                            <Icon icon="mingcute:user-2-line" className="text-grey" fontSize={22} />
                          }
                          placeholder="Number of Guest"
                        />
                      </div>
                      {/* Description */}
                      <div className="flex flex-col gap-1 text-left">
                        <label className="font-semibold text-dark/70">Special Request</label>

                        <Input
                          name="specialRequest"
                          type="text-area"
                          state={specialRequest}
                          setState={setSpecialRequest}
                          placeholder="Any special requirement..."
                        />
                      </div>
                    </div>
                  </form>

                  {/* Action Button */}
                  <div className="mt-6 w-full">
                    <Link to={`/payment/${slug}/?type=services&id=${4354}`}>
                      <button className="w-full rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary/90 md:text-base">
                        Proceed to Booking
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        {/* review and testimony */}
        <section id="reviews">
          <ReviewAndTestimony />
        </section>
        <section id="policies">
          <Policies />
        </section>

        <Footer />
      </div>
    </section>
  );
}

const ratingSummary = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 70 },
  { stars: 3, percent: 35 },
  { stars: 2, percent: 20 },
  { stars: 1, percent: 0 },
];

const reviews = [
  {
    id: 1,
    name: "July Kully",
    date: "12 May 2025",
    guest:
      "Great location and clean environment. The host was very responsive and helped us with everything we needed during our stay.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Samuel Bright",
    date: "03 April 2025",
    guest:
      "Great location and clean environment. The host was very responsive and helped us with everything we needed during our stay.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Amara Johnson",
    date: "27 February 2025",
    guest:
      "The room was cozy with beautiful decor. Wi-Fi was fast and the bed was very comfortable. Would definitely visit again!",
    rating: 5.8,
  },
];

export function ReviewAndTestimony() {
  return (
    <div className="pt-10">
      <h1 className="mb-4 text-2xl font-bold text-dark md:text-3xl">Reviews</h1>
      <div className="mb-8 flex flex-row items-center gap-2 text-right">
        {/* rating */}
        <span className="flex items-center rounded-b-lg rounded-r-lg bg-blue-100 p-2 font-semibold leading-tight text-info">
          5.3
        </span>
        <span className="text-sm font-semibold text-info">Excellent</span>
        <span className="text-sm text-grey">100 reviews</span>
      </div>

      {/* overall rating */}
      <h1 className="mb-4 text-xl font-bold text-dark">Overall Rating</h1>
      <div className="w-full max-w-md space-y-3">
        {ratingSummary.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            {/* Number Only */}
            <div className="w-6 text-center text-sm font-semibold text-gray-700">{item.stars}</div>

            {/* Bar */}
            <div className="relative h-2 flex-1 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percent}%` }} />
            </div>

            {/* Percentage */}
            <span className="w-10 text-right text-sm text-gray-500">{item.percent}%</span>
          </div>
        ))}
      </div>
      {/* testimonial */}
      <div className="mt-8 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border bg-white p-4 shadow-md sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Image + Name */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border bg-gray-200"></div>
                <div className="flex flex-col text-sm sm:text-base">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>

              {/* Rating */}
              <span className="flex items-center rounded-b-lg rounded-r-lg bg-blue-100 p-2 font-semibold leading-tight text-info">
                {review.rating}
              </span>
            </div>

            {/* Guest Text */}
            <p className="mt-3 text-sm text-gray-700">{review.guest}</p>

            {/* Button */}
            <div className="mt-6 flex justify-end">
              <button className="rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                Show More
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* show all review */}
      <div className="mt-6">
        <button className="rounded-xl border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white">
          Show All Reviews
        </button>
      </div>
    </div>
  );
}

export function FoodList() {
  const { addToCart, cartItems, removeFromCart, updateFoodListItemCount } =
    useContext(FoodListContext)!;
  return (
    <div className="grid grid-cols-2 gap-6 md:grid md:grid-cols-3">
      {foodList.map((food) => (
        <div key={food.id} className="rounded-xl border p-2 pb-5 shadow-md">
          {/* Image */}
          <div className="relative h-[320px] w-full overflow-hidden rounded-xl md:h-[260px]">
            <img src={food.img} alt={food.name} className="h-full w-full object-cover" />
          </div>

          {/* Content */}
          <div className="pt-5">
            <p className="text-lg font-semibold">{food.name}</p>

            <p className="font-semibold text-primary">${food.price}</p>

            {/* Add to Cart {cartItems[food.id] > 0 ? `(${cartItems[food.id]})` : ""} */}
            {cartItems[food.id] === 0 ? (
              <button
                onClick={() => addToCart(food.id)}
                className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary/90"
              >
                Add to Cart
              </button>
            ) : (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-gray-300 px-4 py-2">
                {/* Minus */}
                <button
                  onClick={() => removeFromCart(food.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-lg font-bold"
                >
                  −
                </button>

                {/* Input */}
                <input
                  min={0}
                  value={cartItems[food.id]}
                  onChange={(e) => updateFoodListItemCount(food.id, Number(e.target.value))}
                  className="w-16 rounded-lg border border-gray-400 text-center text-lg font-semibold focus:border-primary focus:outline-none"
                />

                {/* Plus */}
                <button
                  onClick={() => addToCart(food.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-bold text-white"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
