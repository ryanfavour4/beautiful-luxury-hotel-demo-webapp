import axiosInstance from "@/config/axios";

type TPostSubmitContactFormServicePayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type TPostSubmitIssuesServicePayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;

  bookingId?: string;
  userId?: string;
};

export const postSubmitContactFormService = async (
  payload: TPostSubmitContactFormServicePayload,
) => {
  const response = await axiosInstance.post("/support/contact", payload);
  return response.data;
};

export const postSubmitIssuesService = async (payload: TPostSubmitIssuesServicePayload) => {
  const response = await axiosInstance.post("/support/issue", payload);
  return response.data;
};
