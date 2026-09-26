"use client";
import { GetBookingsResponseBooking } from "@/api/hooks/types";
import { getStatusBadgeClass } from "@/components/status-indicator";
import { useEffect } from "react";

const Invoice = () => {
  const search = new URLSearchParams(window.location.search);
  const booking: GetBookingsResponseBooking = JSON.parse(search.get("data") || "{}");
  const invoiceDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 300);
  }, []);

  return (
    <div id="invoice-document" className="ml-4 w-full rounded-2xl bg-white p-8 text-neutral-900">
      {/* Header */}
      <div className="mb-8 border-b-2 border-[#916001] pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#916001]">INVOICE</h1>
            <p className="mt-1 text-sm text-neutral-600">Booking Confirmation</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[#916001]">{booking?.hotelId?.name}</h2>
            <p className="text-sm text-neutral-600">
              {booking?.hotelId?.address || "Hotel Address"}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-3 font-bold text-[#916001]">INVOICE TO</h3>
          <div className="space-y-1 text-sm">
            <p className="font-semibold">
              {booking?.guests[0].firstName} {booking.guests[0].lastName}
            </p>
            <p>{booking.userId.email}</p>
            <p>Phone: {booking.guests[0].phone || "N/A"}</p>
            <p className="text-xs text-neutral-600">Booking ID: {booking._id}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-3 space-y-1">
            <p className="text-sm">
              <span className="font-semibold">Invoice Date:</span> {invoiceDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Invoice #:</span> INV-
              {booking._id.slice(-8).toUpperCase()}
            </p>
            <p
              className={`mt-2 inline-block rounded-lg px-3 py-1 text-xs font-semibold `}
            >
              {getStatusBadgeClass(booking.status.toUpperCase())}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="mb-8 rounded-lg border border-neutral-300 p-6">
        <h3 className="mb-4 font-bold text-[#916001]">BOOKING DETAILS</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-600">Room Type</p>
            <p className="mt-1 font-semibold">{booking.roomTypeId.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-600">Check In</p>
            <p className="mt-1 font-semibold">{checkInDate.toLocaleDateString("en-NG")}</p>
            <p className="text-xs text-neutral-600">
              {checkInDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-600">Check Out</p>
            <p className="mt-1 font-semibold">{checkOutDate.toLocaleDateString("en-NG")}</p>
            <p className="text-xs text-neutral-600">
              {checkOutDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-600">Number of Nights</p>
            <p className="mt-1 font-semibold">{booking.totalNights}</p>
          </div>
        </div>
      </div>

      {/* Guests & Amenities */}
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-bold text-[#916001]">GUESTS</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Total Guests:</span> {booking.numberOfGuests} Adult
              {booking.numberOfGuests > 1 ? "s" : ""}
            </p>
            <p>
              <span className="font-semibold">Room Capacity:</span> Max{" "}
              {booking.roomTypeId.maxGuests} people
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-[#916001]">AMENITIES</h3>
          <div className="flex flex-wrap gap-2">
            {booking.roomTypeId.amenities?.map((amenity) => (
              <span
                key={amenity}
                className="inline-block rounded-full bg-[#916001] bg-opacity-10 px-3 py-1 text-xs font-medium text-[#916001]"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="mb-8">
        <h3 className="mb-4 font-bold text-[#916001]">PRICING BREAKDOWN</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#916001]">
              <th className="py-2 text-left text-sm font-semibold text-[#916001]">Description</th>
              <th className="py-2 text-center text-sm font-semibold text-[#916001]">Quantity</th>
              <th className="py-2 text-right text-sm font-semibold text-[#916001]">Unit Price</th>
              <th className="py-2 text-right text-sm font-semibold text-[#916001]">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200">
              <td className="py-3 text-sm">{booking.roomTypeId.name}</td>
              <td className="py-3 text-center text-sm">{booking.totalNights}</td>
              <td className="py-3 text-right text-sm">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(booking.pricePerNight)}
              </td>
              <td className="py-3 text-right text-sm font-semibold">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(booking.pricePerNight * booking.totalNights)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mb-8 flex justify-end">
        <div className="w-full md:w-1/3">
          <div className="space-y-3 rounded-lg bg-neutral-50 p-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(booking.basePrice || 0) || " 0.00"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10% VAT):</span>
              <span>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(booking.amount * 0.1)}
              </span>
            </div>
            <div className="border-t-2 border-[#916001] pt-3">
              <div className="flex justify-between font-bold text-[#916001]">
                <span>TOTAL AMOUNT:</span>
                <span>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(booking.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-[#916001] pt-6 text-center text-xs text-neutral-600">
        <p className="mb-2 font-semibold text-[#916001]">Thank you for your booking!</p>
        <p>This is an automated invoice. Please contact support if you have any questions.</p>
        <p className="mt-4 text-[10px]">
          © {new Date().getFullYear()} {booking.hotelId.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
