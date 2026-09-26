import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMyPaymentsService,
  getVerifyPayment,
  postinitializeyPayment,
} from "../services/payment.service";
import { GetMyPaymentsResponse, InitializePaymentResponse, T_ApiResponse } from "./types";
import toast from "react-hot-toast";

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: getVerifyPayment,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<{ reference: string | null }>) => {
      toast.success(`Payment Verified successfully!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: postinitializeyPayment,
    onSuccess: (res: T_ApiResponse<InitializePaymentResponse>) => {
      toast(`Redirecting to payment!`);
      console.log(res.data.data.link);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useGetMyPayments = (page: number = 1, limit: number = 3) => {
  const query = useQuery<T_ApiResponse<GetMyPaymentsResponse>>({
    queryKey: ["getMyPaymentsService", page, limit],
    queryFn: () => getMyPaymentsService({ page, limit }),
  });
  console.log(query.data?.data);
  return { ...query, data: query.data?.data };
};
