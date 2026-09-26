import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllUserBookings,
  getBookingById,
  postCreateBooking,
  putBookingStatus,
} from "../services/booking.service";
import { BookingByIdResponse, GetBookingsResponse, T_ApiResponse } from "./types";
import toast from "react-hot-toast";
import { UpdateBookingStatusPayload } from "../services/types";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: postCreateBooking,
    onSuccess: (res: T_ApiResponse<{ message: string }>) => {
      const message = res?.data?.message || "Booking created successfully";
      toast.success(message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useGetAllUserBookings = (
  userId: string | undefined,
  page: number = 1,
  limit: number = 3,
) => {
  const query = useQuery<T_ApiResponse<GetBookingsResponse>>({
    queryKey: ["getAllUserBookings", userId, page, limit],
    queryFn: () => getAllUserBookings(userId, page, limit),
    enabled: !!userId,
    retry: 1,
  });

  return { ...query, data: query.data?.data };
};

export const useGetBookingById = (bookingId: string | undefined) => {
  const query = useQuery<T_ApiResponse<BookingByIdResponse>>({
    queryKey: ["getBookingById", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: !!bookingId,
    retry: 1,
  });
  return { ...query, data: query.data?.data };
};

export const useEditBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, UpdateBookingStatusPayload>({
    mutationFn: putBookingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserService"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};
