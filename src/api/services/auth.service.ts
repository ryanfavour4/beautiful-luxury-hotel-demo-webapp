import axiosInstance from "@/config/axios";
import { TPostLoginServicePayload, TPostRegisterServicePayload } from "./types";
import { UploadFormData } from "../hooks/types";
import { getRedirectPath } from "@/utils/redirects";

export const postLoginService = async (credentials: TPostLoginServicePayload) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response;
};

export const postRegisterService = async (credentials: TPostRegisterServicePayload) => {
  const response = await axiosInstance.post("/auth/signup/", credentials);
  return response;
};

export const signInWithGoogleService = async ({ referredBy }: { referredBy?: string }) => {
  const baseURL = import.meta.env.VITE_API_BASEURL;
  const redirect = encodeURIComponent(getRedirectPath());

  if (referredBy) {
    window.location.href = `${baseURL}/auth/google?referredBy=${referredBy}`;
  }
  if (redirect) {
    window.location.href = `${baseURL}/auth/google?redirect=${redirect}`;
    console.log("REDIRECTED TO", `${baseURL}/auth/google?redirect=${redirect}`);
  } else {
    window.location.href = `${baseURL}/auth/google`;
  }

  return "";
};

export const getVerifyEmail = async (credentials: { token: string }) => {
  const urlPath = "/auth/verify-email";
  const response = await axiosInstance.get(urlPath, {
    params: credentials,
  });
  return response;
};

export const postResendOtpService = async (credentials: { email: string }) => {
  const response = await axiosInstance.post("/users/resend-otp", credentials);
  return response;
};

export const postResendVerification = async (credentials: { email: string | null }) => {
  const response = await axiosInstance.post("/auth/resend-verification", credentials);
  return response;
};

export const postForgotPasswordService = async (credentials: { email: string }) => {
  const response = await axiosInstance.post("/auth/forgot-password", credentials);
  return response;
};

export const postVerifyResetCode = async (credentials: { email: string; code: string }) => {
  const response = await axiosInstance.post("/auth/verify-reset-code", credentials);
  return response;
};

export const postResetPasswordService = async (credentials: {
  email: string | null;
  code: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/reset-password", credentials);
  return response;
};

export const postChangePasswordService = async (credentials: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post("/auth/change-password", credentials);
  return response;
};

export const getUserService = async () => {
  const response = await axiosInstance.get(`/auth/me`);
  return response;
};

export const postLogoutService = async () => {
  const response = await axiosInstance.post("/", {});
  return response;
};

export const postUploadFiles = async (payload: UploadFormData) => {
  const formData = new FormData();
  formData.append("type", payload.type);
  formData.append("files", payload.files);
  const response = await axiosInstance.post("/upload/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const putEditProfileService = async (credentials: {
  fullName?: string;
  country?: string;
  phone?: string;
  avatarUploadId?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  postalCode?: string;
}) => {
  const response = await axiosInstance.put("/auth/edit-profile", credentials);
  return response;
};
export const postKycService = async (credentials: {
  fullName: string;
  nationality: string;
  documentNumber: string;
  documentType: string;
  documentPhoto: string | null;
  selfiePhoto: string | null;
}) => {
  const response = await axiosInstance.post("/auth/kyc", credentials);
  return response;
};
