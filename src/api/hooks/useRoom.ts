import { useQuery } from "@tanstack/react-query";
import { T_ApiResponse, IGetRoomTypeByIdResponse, IGetAllRoomsTypesRes } from "@/api/hooks/types";
import toast from "react-hot-toast";
import { getAllRoomsTypes, getRoomsTypesById } from "../services/rooms-types.service";

export const useGetAllRoomsTypes = () => {
  const query = useQuery<T_ApiResponse<IGetAllRoomsTypesRes>>({
    queryKey: ["getAllRoomsTypes"],
    queryFn: () => getAllRoomsTypes(),
  });

  if (query.isError) {
    const errorMessage =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (query.error as any)?.response?.data?.message ||
      "Something went wrong, Please check connection";
    console.error("API ERROR DETAILS:", query.error); //
    toast.error(errorMessage);
  }

  return { ...query, data: query.data?.data };
};

export const useGetRoomsTypesById = (roomId: string | undefined) => {
  const query = useQuery<T_ApiResponse<IGetRoomTypeByIdResponse>>({
    queryKey: ["getRoomsTypesById", roomId],
    queryFn: () => getRoomsTypesById(roomId),
    enabled: !!roomId,
    retry: 1,
  });

  if (query.isError) {
    const errorMessage =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (query.error as any)?.response?.data?.message ||
      "Something went wrong, Please check connection";
    console.error("API ERROR DETAILS:", query.error); //
    toast.error(errorMessage);
  }

  return { ...query, data: query.data?.data };
};
