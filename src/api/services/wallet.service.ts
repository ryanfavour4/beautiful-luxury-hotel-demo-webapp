import axiosInstance from "@/config/axios";

export type TPostTransferWalletAssetServicePayload = {
  user_id: string;
  amount: string | number;
  source: string;
  destination: string;
};

export const postTransferWalletAssetService = async (
  credentials: TPostTransferWalletAssetServicePayload,
) => {
  const response = await axiosInstance.post("/wallet/transfer", credentials);
  return response;
};
