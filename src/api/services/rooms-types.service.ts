import axiosInstance from "@/config/axios";
import { AxiosResponse } from "axios";

export const getAllRoomsTypes = async () => {
  const response = await axiosInstance.get(`/room-types/all`);
  return response;
};

export const getAllBookings = async ({ page, limit = 10 }: { page: number; limit: number }) => {
  const response = await axiosInstance.get(`/bookings/all?page=${page}&limit=${limit}`);
  return response;
};

export const getRoomsTypesById = async (id: string | undefined) => {
  if (!id) {
    return null as unknown as Promise<AxiosResponse<unknown, unknown>>;
  }
  const response = await axiosInstance.get(`/room-types/${id}`);
  return response;
};
