// import { useState } from "react";
import { Icon } from "@iconify/react";
import { useState, useEffect, useMemo } from "react";

import { useAuthStore } from "@/store/auth";
import Footer from "@/layout/footer";
import Input from "@/components/input";
import { formatDate } from "@/utils/format-date";
import flutterwaveLogo from "/image/Flutterwave.png";
import paypallogo from "/image/paypal.png";
import { useInitializePayment } from "@/api/hooks/usePayment";
import { LoadingPopUp } from "@/layout/loading";
import { useBookingStore } from "@/store/booking";
import toast from "react-hot-toast";
import AlertBanner from "@/components/alert-banner/page";
import { useEditBookingStatus } from "@/api/hooks/useBooking";
import { useNavigate } from "react-router";

export default function StepTwo() {
  const navigate = useNavigate();
  const { mutate, isPending } = useInitializePayment();
  const { bookingResponse } = useBookingStore();

  const { mutate: changeBookingStatus, isPending: isChangingStatus } = useEditBookingStatus();
  const [paymentOption, setPaymentOption] = useState<"now" | "hold" | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<"paypal" | "flutterwave" | null>(null);

  const [bookingModal, setBookingModal] = useState(false);
  const [holdPayModal, setHoldPayModal] = useState(false);

  const bookings = bookingResponse.booking;
  const totalPrice = bookings?.amount || 0;

  const MealPlan = useMemo(() => {
    if (bookings?.allInclusive) return "All Inclusive (All meals included)";
    if (bookings?.breakfast && bookings?.dinner) return "Half Board (Breakfast + Dinner)";
    if (bookings?.breakfast) return "Breakfast only";
    if (bookings?.dinner) return "Dinner only";
    return "No meal plan selected";
  }, [bookings?.allInclusive, bookings?.breakfast, bookings?.dinner]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedPayment === "paypal") {
      toast.error("PayPal payment method is coming soon! Please select another payment method.");
    } else {
      mutate(
        {
          method: "flutterwave",
          roomBookingId: bookings?._id,
          metadata: {
            notes: bookings?.notes,
          },
        },
        {
          onSuccess: (res) => {
            window.location.href = res.data.data.link;
          },
        },
      );
    }
  };

  const handlePaymentSelect = (method: "paypal" | "flutterwave") => {
    setSelectedPayment(method);
  };

  useEffect(() => {
    setBookingModal(true);
  }, []);

  const ChangeStatus = () => {
    changeBookingStatus(
      { bookingId: bookingResponse.booking._id, status: "hold" },
      {
        onSuccess: () => {
          toast.success("This booking is been put on hold!");
          navigate("/dashboard/reservations/details/" + bookingResponse.booking._id);
        },
      },
    );
  };
  return (
    <div className="pt-10 md:px-12">
      {isPending && <LoadingPopUp />}
      {isChangingStatus && <LoadingPopUp />}

      {bookingModal && (
        <AlertBanner
          closeModal={() => setBookingModal(false)}
          icon={<Icon icon={"lucide:badge-check"} color="#4FBF67" fontSize={40} />}
          title="Booking Confirmed!"
          description=" Your booking has been confirmed. Please choose your payment method to complete your reservation."
          buttonText="Close"
          buttonFunction={() => setBookingModal(false)}
        />
      )}
      {holdPayModal && (
        <AlertBanner
          buttonFunction={() => {
            ChangeStatus();
            setHoldPayModal(false);
          }}
          closeModal={() => {
            setHoldPayModal(false);
            setPaymentOption(null);
          }}
          icon={<Icon icon={"si:warning-line"} fontSize={40} />}
          title="Hold Payment?"
          description="You are putting your booking on hold to continue payment at residence, are you sure you want to continue?"
          buttonText="Proceed"
        />
      )}

      <div className="container mx-auto px-4 md:px-1 lg:px-1">
        <div className="flex flex-col items-start justify-between gap-8 md:gap-24 lg:flex-row">
          {/* Description */}
          <div className="w-full space-y-3">
            <h1 className="text-xl font-bold text-dark md:text-2xl">Choose when to pay</h1>
            <label id="pay-now" className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={paymentOption === "now"}
                onChange={() => setPaymentOption("now")}
                id="pay-now"
                className="relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 transition checked:border-primary checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 checked:before:h-2.5 checked:before:w-2.5 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:rounded-full checked:before:bg-primary checked:before:content-['']"
              />
              <span className="text-sm font-semibold">
                Pay ₦{totalPrice.toLocaleString() || "0.00"} now
              </span>
            </label>
            {/* border */}
            <div className="border-b pb-4"></div>
            <label id="pay-on-hold" className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={paymentOption === "hold"}
                onChange={() => {
                  setPaymentOption("hold");
                  setHoldPayModal(true);
                }}
                id="pay-on-hold"
                className="relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 transition checked:border-primary checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 checked:before:h-2.5 checked:before:w-2.5 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:rounded-full checked:before:bg-primary checked:before:content-['']"
              />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-semibold">Pay on hold</p>
                <p className="text-gray-500">
                  Pay when you arrive at the hotel. We will hold your booking for 24 hours..
                </p>
              </div>
            </label>
            {/* border */}
            <div className="border-b pb-4"></div>
            {/* guest info */}
            {/* <PersonalDetails /> */}
            {paymentOption === "now" && (
              <PaymentMethod
                onClick={handleSubmit}
                setSelectedPayment={setSelectedPayment}
                selectedPayment={selectedPayment}
                handlePaymentSelect={handlePaymentSelect}
                paymentOption={paymentOption}
              />
            )}
          </div>

          {/* Booking Card */}
          <div className="mb-10 flex w-full max-w-sm flex-col space-y-4 rounded-2xl border border-gray-200 p-6 shadow-md lg:mb-12">
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
                  <span className="text-xs text-gray-500">
                    {formatDate(bookings?.checkInDate).commaDateFormat}
                  </span>
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
                  <span className="text-xs text-gray-500">
                    {formatDate(bookings?.checkOutDate).commaDateFormat}
                  </span>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="border-b pb-3">
              <h2 className="font-semibold text-gray-700">Guests</h2>
              <p className="text-sm text-gray-600">{bookings?.numberOfGuests} adult(s)</p>
            </div>

            {/* Details */}
            <div className="space-y-1 border-b pb-3">
              <h2 className="font-semibold text-gray-700">Details</h2>

              <p className="text-sm text-gray-600">
                For {bookings?.numberOfGuests || 1} persons (per night):{" "}
                {bookings?.pricePerNight.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Meal Plan: {MealPlan}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span className="text-primary">₦ {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export function PersonalDetails() {
  const { auth } = useAuthStore();

  const [postalCode, setPostalCode] = useState({ value: "" });
  const [state, setState] = useState({ value: "" });
  const [address, setAddress] = useState({ value: "" });
  const [city, setCity] = useState({ value: "" });
  // const [specialRequest, setSpecialRequest] = useState({ value: "" });

  useEffect(() => {
    if (auth?.user) {
      setPostalCode({ value: "" });
      setState({ value: "" });
      setAddress({ value: "" });
      setCity({ value: "" });
      // setSpecialRequest({ value: "" });
    }
  }, [auth?.user]);
  return (
    <div className="md:mt-10">
      <h1 className="text-xl font-bold text-dark md:text-2xl">Complete registration payment</h1>

      <div className="flex w-full items-center justify-between pt-4">
        <h1 className="font-medium">Personal details</h1>
      </div>

      {/* PROFILE FORM SECTION  */}
      <div className="">
        {/* form 1 */}
        <form className="flex flex-col rounded-2xl bg-light py-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-dark/70">Address line</label>
              <div className="w-full md:w-full">
                <Input
                  type="text"
                  name="address"
                  state={address}
                  setState={setAddress}
                  placeholder="P.O Box 12344"
                />
              </div>
            </div>

            {/* City + Remove */}

            <div className="flex flex-1 flex-col gap-1">
              <label className="font-semibold text-dark/70">City</label>
              <div className="w-full md:w-full">
                <Input type="text" name="city" state={city} setState={setCity} placeholder="Ago" />
              </div>
            </div>

            {/* Email*/}

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-dark/70">
                Postal code
              </label>
              <div className="w-full md:w-full">
                <Input
                  type="text"
                  name="postalCode"
                  state={postalCode}
                  setState={setPostalCode}
                  placeholder="89532"
                />
              </div>
            </div>
            {/* phone */}

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-dark/70">
                Postal code
              </label>
              <div className="w-full md:w-full">
                <Input
                  type="text"
                  name="state"
                  state={state}
                  setState={setState}
                  placeholder="Lagos"
                />
              </div>
            </div>

            {/*  */}
          </div>
        </form>
      </div>
    </div>
  );
}

export function PaymentMethod({
  onClick,
  selectedPayment,
  handlePaymentSelect,
  paymentOption,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (e: any) => void;
  setSelectedPayment: React.Dispatch<React.SetStateAction<"paypal" | "flutterwave" | null>>;
  selectedPayment: "paypal" | "flutterwave" | null;
  handlePaymentSelect: (data: "paypal" | "flutterwave") => void;
  paymentOption: "now" | "hold" | null;
}) {
  return (
    <div className="flex flex-col items-start md:py-10">
      <h1 className="text-xl font-bold text-dark md:text-2xl">Payment Methods</h1>
      <p>Select a payment method</p>
      <div className="flex flex-col gap-6 pt-4">
        {/* PayPal Option */}
        <label className="flex cursor-pointer items-center gap-4">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedPayment === "paypal"}
            onChange={() => handlePaymentSelect("paypal")}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 transition checked:border-primary checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 checked:before:h-2.5 checked:before:w-2.5 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:rounded-full checked:before:bg-primary checked:before:content-['']"
          />
          <img src={paypallogo} alt="Paypal Logo" className="w-20" />
        </label>

        {/* Flutterwave Option */}
        <label className="flex cursor-pointer items-center gap-4">
          <input
            type="radio"
            name="paymentMethod"
            value="flutterwave"
            checked={selectedPayment === "flutterwave"}
            onChange={() => handlePaymentSelect("flutterwave")}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 transition checked:border-primary checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 checked:before:h-2.5 checked:before:w-2.5 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:rounded-full checked:before:bg-primary checked:before:content-['']"
          />
          <img src={flutterwaveLogo} alt="Flutterwave Logo" className="w-40 object-contain" />
        </label>
        <button
          className="btn btn-primary disabled:cursor-not-allowed disabled:bg-primary/70"
          onClick={onClick}
          disabled={!selectedPayment || !paymentOption}
        >
          Make Payment
        </button>
      </div>

      {/* PROFILE FORM SECTION  */}
    </div>
  );
}
