import axiosInstance from "@/config/axios";

export const getAllUserTransactionsService = async ({ user_id }: { user_id: string }) => {
  const response = await axiosInstance.get(`/transaction/user/${user_id}`);
  return response;
};
