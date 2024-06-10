// services/cloudinaryService.ts
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";

export const uploadImageToCloudinary = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
  cancelSource: CancelTokenSource
) => {
  return axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    formData,
    {
      onUploadProgress,
      cancelToken: cancelSource.token,
    }
  );
};
