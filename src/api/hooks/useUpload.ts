import { useQuery } from "@tanstack/react-query";
import { getImageFromServer } from "../services/upload.service";
import { T_ApiResponse, UploadFileResponse } from "./types";

export const useGetPhotoById = (photoId: string | undefined) => {
    const query = useQuery<T_ApiResponse<UploadFileResponse>>({
        queryKey: ["getPhotoById", photoId],
        queryFn: () => getImageFromServer(photoId),
        enabled: !!photoId,
        retry: 1,
    });
    return { ...query, data: query.data?.data };
};