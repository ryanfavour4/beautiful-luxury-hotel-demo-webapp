// store/booking.ts
import { LSBookingFilterType } from "@/sections/rooms-page/room-list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface mealPrice {
  allInclusivePrice?: number;
  breakfastPrice?: number;
  dinnerPrice?: number;
}
interface BookingStore {
  bookingFilters: LSBookingFilterType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mealPrice: mealPrice | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMealPrice: (price: mealPrice) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBookingFilters: (filters: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookingResponse: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBookingResponse: (data: any) => void;
  clearBookingResponse: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookingFilters: {
        checkInDate: null,
        checkOutDate: null,
        guests: "",
      },
      mealPrice: {
        allInclusivePrice: 0,
        breakfastPrice: 0,
        dinnerPrice: 0,
      },
      setMealPrice: (price) => set({ mealPrice: price }),
      bookingResponse: null,
      setBookingResponse: (data) => set({ bookingResponse: data }),
      setBookingFilters: (filters) => set({ bookingFilters: filters }),
      clearBookingResponse: () => set({ bookingResponse: null, bookingFilters: null }),
    }),
    {
      name: "booking-storage",
    },
  ),
);
