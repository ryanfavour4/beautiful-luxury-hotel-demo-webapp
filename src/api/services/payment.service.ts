import axiosInstance from "@/config/axios";

export const getVerifyPayment = async ({ reference }: { reference: string | null }) => {
  const response = await axiosInstance.get(`/payments/verify?reference=${reference}`);

  return response.data;
};

export const postinitializeyPayment = async ({
  method,
  roomBookingId,
  metadata,
}: {
  method: string;
  roomBookingId: string;
  metadata: unknown;
}) => {
  const response = await axiosInstance.post("/payments/initialize", {
    method,
    roomBookingId,
    metadata,
  });

  return response;
};

export const getMyPaymentsService = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await axiosInstance.get(`/payments?page=${page}&limit=${limit}`);
  return response;
};
