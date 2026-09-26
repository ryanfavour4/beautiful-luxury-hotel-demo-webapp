import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { T_ApiResponse } from "./types";
import { postSubmitContactFormService, postSubmitIssuesService } from "../services/contact.service";

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: postSubmitContactFormService,
    onSuccess: (res: T_ApiResponse<{ message: string }>) => {
      const message = res?.data?.message || "Message sent successfully";
      toast.success(message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useSubmitIssues = () => {
  return useMutation({
    mutationFn: postSubmitIssuesService,
    onSuccess: (res: T_ApiResponse<{ message: string }>) => {
      const message = res?.data?.message || "Message sent successfully";
      toast.success(message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};
