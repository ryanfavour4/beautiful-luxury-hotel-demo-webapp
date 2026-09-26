export type TPostRegisterServicePayload = {
  fullName: string;
  email: string;
  country: string;
  password: string;
  referredBy: string;
};

export type TPostLoginServicePayload = {
  email: string;
  password: string;
};
export type bookingStatusEnum =
  | "pending" // user has made reservation only, no payment or anything
  | "confirmed" // user has paid for the booking and needs to come stay
  | "checked-in" // user has clicked check-in to say he is logging in the hotel
  | "checked-out" // user has finished and has checked out of the room or hotel
  | "cancelled" // user or admin canceled for some reason
  | "expired" // the booking date has passed the user never paid
  | "no-show" // the booking date has passed the user already paid (likely may ask for refund)
  | "hold"; //  Hold expires after 24 hours After 24 hours → auto cancel

export type UpdateBookingStatusPayload = {
  bookingId: string | undefined;
  status: bookingStatusEnum
};

export type CreateBookingPayload = {
  userId: string | undefined;
  adminId?: string;
  roomTypeId: string | null;
  roomId?: string;
  guests?: {
    firstName: string | undefined;
    lastName: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
  }[];
  breakfast?: boolean,
  dinner?: boolean,
  allInclusive?: true,
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  bookingType: "manual" | "automatic";
  notes?: string;
}
