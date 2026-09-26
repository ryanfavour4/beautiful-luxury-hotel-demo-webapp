import { useQuery } from "@tanstack/react-query";
import { getAllRoomsTypes } from "../services/rooms-types.service";
import { T_ApiResponse, IGetAllRoomsTypesRes } from "@/api/hooks/types";
import toast from "react-hot-toast";

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
    toast.error(errorMessage);
  }

  return { ...query, data: query.data?.data };
};
