import axiosInstance from "@/config/axios";
import { CreateBookingPayload, UpdateBookingStatusPayload } from "./types";

export const postCreateBooking = async ({ params }: { params: CreateBookingPayload }) => {
  const response = await axiosInstance.post("/bookings/create", {
    ...params,
  });
  return response.data;
};

export const getAllUserBookings = async (
  userId: string | undefined,
  page: number = 1,
  limit: number = 4,
) => {
  const response = await axiosInstance.get(
    `/bookings/user-bookings/${userId}?page=${page}&limit=${limit}`,
  );
  return response;
};

export const getBookingById = async (bookingId: string | undefined) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}`);
  return response;
};

export const putBookingStatus = async ({ bookingId, status }: UpdateBookingStatusPayload) => {
  const response = await axiosInstance.put(`/bookings/update/${bookingId}/status`, { status });
  return response;
};
