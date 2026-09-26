import axiosInstance from "@/config/axios";

export const getAllUserNotificationService = async ({ user_id }: { user_id: string }) => {
  const response = await axiosInstance.get(`/notifications/user/${user_id}`);
  return response;
};
