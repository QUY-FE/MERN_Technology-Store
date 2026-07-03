import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Định nghĩa kiểu dữ liệu trả về từ Backend sau khi upload thành công
export interface UploadResponse {
  success: boolean;
  message?: string;
  data: {
    urls: string[];
  };
}

const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    uploadProductImage: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/uploads/product/images",
        method: "POST",
        body: formData,
      }),
    }),
    
    uploadNewsImage: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/uploads/news/images",
        method: "POST",
        body: formData, 
      }),
    }),
    
    uploadBannerImage: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/uploads/banner/images",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadProductImageMutation,
  useUploadNewsImageMutation,
  useUploadBannerImageMutation,
} = uploadApi;

export default uploadApi;