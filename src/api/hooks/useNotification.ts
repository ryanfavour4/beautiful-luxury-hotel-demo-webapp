import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { T_ApiResponse, NotificationResponse } from "./types";
import { getAllUserNotificationService } from "../services/notification.service";

export const useGetAllUserNotification = ({ user_id }: { user_id: string }) => {
  const query = useQuery<T_ApiResponse<NotificationResponse[]>>({
    queryKey: ["getAllUserNotificationService", user_id],
    queryFn: () => getAllUserNotificationService({ user_id }),
    enabled: !!user_id,
  });

  if (query.isSuccess) {
    // do something probably
    console.log(query.data.data);
  }

  if (query.isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMessage = (query.error as any)?.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
  }

  return { ...query, data: query.data?.data };
};
