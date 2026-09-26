import axiosInstance from "@/config/axios";
import { generateQueryParams } from "@/utils/generate-query-params";

type TReviewParams = {
  page?: number;
  limit?: number;
  userId?: string;
  roomTypeId?: string;
  serviceId?: string;
};

export const getAllReviewsService = async (params: TReviewParams) => {
  const response = await axiosInstance.get(`/reviews${generateQueryParams(params)}`);
  return response;
};
