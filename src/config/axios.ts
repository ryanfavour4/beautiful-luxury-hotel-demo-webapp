import { decryptData } from "@/utils/crypt";
import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const getToken = (): string | null => {
  return decryptData(localStorage.getItem("auth") || "null")?.token;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


axiosInstance.interceptors.response.use(
  (response) => {
    // Success response — you can check status here
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code (4xx, 5xx)
      console.log("Error Status:", error.response.status);
      toast.error(error.response?.data?.message || "Invalid request");

      // Example: handle 401
      if (error.response.status === 401) {
        console.warn("Token expired or unauthorized");
        window.location.replace("/login");
      }

      // Example: handle 500
      if (error.response.status === 500) {
        console.error("Server error");
      }
    } else {
      // No response (network error, timeout, CORS issue)
      toast.error(error.response?.data?.message || "Network error / no response");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;