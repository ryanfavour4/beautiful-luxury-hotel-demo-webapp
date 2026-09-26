import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserService,
  postForgotPasswordService,
  postLoginService,
  postLogoutService,
  postRegisterService,
  postResendOtpService,
  postResetPasswordService,
  getVerifyEmail,
  postResendVerification,
  postVerifyResetCode,
  putEditProfileService,
  postUploadFiles,
  postKycService,
  postChangePasswordService,
  // getGoogleRegisterService
} from "../services/auth.service";
import toast from "react-hot-toast";
import {
  IUseRegisterRes,
  IUseLoginRes,
  T_ApiResponse,
  IUseGetUserRes,
  UpdateProfileResponse,
} from "./types";
import { encryptData } from "@/utils/crypt";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: postLoginService,
    onSuccess: (res: T_ApiResponse<IUseLoginRes>) => {
      const user = res.data.user;
      const token = res.data.user.token;
      const authData = { token, user };
      localStorage.setItem("auth", encryptData(authData));
      setAuth(authData);
      toast.success("Login successful!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
      setAuth({ token: "", user: null });
      // return error?.response?.user
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: postRegisterService,
    onSuccess: (res: T_ApiResponse<IUseRegisterRes>) => {
      toast.success(`${res.data.message}!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: postResendOtpService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<any>) => {
      toast.success(`Verification code sent!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useResendVerification = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postResendVerification,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<{ message: string }>) => {
      toast.success(`Verification code resent!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.status == 409) {
        navigate("/login");
      }
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useVerifyEmail = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const query = useQuery<T_ApiResponse<{ message: string }>>({
    queryKey: ["getVerifyEmail", token],
    queryFn: () => getVerifyEmail({ token }),
    enabled: !!token,
  });

  useEffect(() => {
    if (query.isSuccess) {
      toast.success("Email verification successful! You can now log in.");
      navigate("/login", { replace: true });
    }
  }, [query.isSuccess, query.data, navigate]);

  if (query.isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = query.error;
    const errorMessage =
      error.response.data.message ||
      error?.message ||
      "Verification failed. The link may be expired or invalid.";
    toast.error(errorMessage);
    if (error.response.status == 400) navigate("/login");
  }

  return { ...query, data: query.data?.data };
};

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: postVerifyResetCode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<{ token: string }>) => {
      toast.success(`Code Verified successfully!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: postForgotPasswordService,
    onSuccess: (res: T_ApiResponse<{ status: number; message: string }>) => {
      toast.success(`Verification code sent! ${res.data.message}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: postResetPasswordService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<any>) => {
      toast.success(`Password reset successful!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: postChangePasswordService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<any>) => {
      toast.success(`Password changed successful!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useGetUser = () => {
  const { setAuth, auth } = useAuthStore();
  const token = auth?.token;

  const query = useQuery<T_ApiResponse<IUseGetUserRes>>({
    queryKey: ["getUserService"],
    queryFn: getUserService,
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && token) {
      const user = query.data.data.user;
      const authData = { user, token };
      localStorage.setItem("auth", encryptData(authData));
      setAuth(authData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess, query.data, token]);

  return { ...query, data: query.data?.data };
};

export const useLogout = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogoutService,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_res) => {
      toast("Logout Success");
      localStorage.clear();
      setAuth(null);
      navigate("/login", { replace: true });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast("Logout Success");
      localStorage.clear();
      setAuth(null);
      navigate("/login", { replace: true });
      const errorMessage =
        error?.response?.data?.message || error.message || "Something went wrong";
      toast(errorMessage);
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  // 1. Get the setAuth function and current auth state
  const { setAuth, auth } = useAuthStore();

  return useMutation({
    mutationFn: putEditProfileService,
    onSuccess: (res: T_ApiResponse<UpdateProfileResponse>) => {
      toast.success(`Profile Updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ["getUserService"] });

      if (res.data) {
        const updatedAuth = {
          token: auth?.token ?? null,
          user: {
            ...auth?.user,
            ...res.data.user,
          },
        };
        localStorage.setItem("auth", encryptData(updatedAuth));
        setAuth(updatedAuth);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const usePostUploadImages = () => {
  return useMutation({
    mutationFn: postUploadFiles,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    onSuccess: (_res: T_ApiResponse<any>) => {
      toast(`Images uploaded Successfully`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useKycSubmit = () => {
  return useMutation({
    mutationFn: postKycService,
    onSuccess: (res: T_ApiResponse<UpdateProfileResponse>) => {
      toast.success(`${res.data.message}!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};
