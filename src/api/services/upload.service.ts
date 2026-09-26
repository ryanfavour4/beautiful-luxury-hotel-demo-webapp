import axiosInstance from "@/config/axios"

export const getImageFromServer = async (id: string|undefined) => {
    const response = await axiosInstance.get(`/upload/files/${id}`)
    return response
}