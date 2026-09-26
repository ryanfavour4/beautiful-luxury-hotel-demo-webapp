import { useQuery } from "@tanstack/react-query";
import { getAllReviewsService } from "../services/reviews.service";
import { GetAllReviewsResponse, T_ApiResponse } from "./types";
import toast from "react-hot-toast";

type TUseGetAllReviewsArgs = {
  userId?: string;
  roomTypeId?: string;
  serviceId?: string;
  page: number;
  limit: number;
};

export const useGetAllReviews = ({
  limit,
  page,
  roomTypeId,
  serviceId,
  userId,
}: TUseGetAllReviewsArgs) => {
  const query = useQuery<T_ApiResponse<GetAllReviewsResponse>>({
    queryKey: ["getAllReviewsService", userId, page, limit],
    queryFn: () => getAllReviewsService({ userId, page, limit, roomTypeId, serviceId }),
  });

  if (query.isSuccess) {
    // do something probably
  }

  if (query.isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMessage = (query.error as any)?.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
  }

  return { ...query, data: query.data?.data };
};
