"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { Save, UploadCloud, X } from "lucide-react";
import {
  CreateNewsDto,
  useGetOneNewsQuery,
  useUpdateNewsMutation,
} from "#/redux/features/newsApi";
import getImageUrl from "#/utils/getImageUrl";
import { useUploadNewsImageMutation } from "#/redux/features/uploadApi";

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: news, isLoading } = useGetOneNewsQuery(id);
  const [updateNews] = useUpdateNewsMutation();
const [uploadNewsImage] = useUploadNewsImageMutation();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CreateNewsDto>();

  useEffect(() => {
    if (news) {
      setValue("title", news.title);
      setValue("status", news.status);
      setValue("content", news.content);
      if (news.thumbnail) {
        setThumbnailPreview(getImageUrl(news.thumbnail));
      }
    }
  }, [news, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeNewImage = () => {
    setThumbnailFile(null);
    setThumbnailPreview(news?.thumbnail ? getImageUrl(news.thumbnail) : "");
  };

  const onSubmit = async (data: CreateNewsDto) => {
    let finalThumbnailUrl = news?.thumbnail;

    try {
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("images", thumbnailFile);

        const uploadData = await uploadNewsImage(formData).unwrap();

        if (!uploadData.success) {
          throw new Error(uploadData.message || "Lỗi upload ảnh");
        }

        const finalThumbnailUrl = uploadData.data.urls[0];
        const newNews = {
          ...data,
          thumbnail: finalThumbnailUrl,
        };
      }

      const editData = {
        ...data,
        thumbnail: finalThumbnailUrl,
      };

      await updateNews({ id, data: editData }).unwrap();
      toast.success("Cập nhật bài viết thành công!");
      router.push("/admin/news");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Cập nhật bài viết thất bại");
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Đang tải dữ liệu bài viết...
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
          Sửa bài viết
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Trạng thái xuất bản
              </label>
              <select
                {...register("status")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Ảnh đại diện (Ghi đè nếu đổi)
              </label>
              <div className="flex gap-4 items-center">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  {thumbnailPreview ? (
                    <>
                      <Image
                        src={thumbnailPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      {thumbnailFile && (
                        <button
                          type="button"
                          onClick={removeNewImage}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      Chưa có ảnh
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 text-sm font-medium transition">
                    <UploadCloud size={18} className="mr-2" /> Chọn ảnh thay thế
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SỬ DỤNG TEXTAREA THUẦN */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1.5">
              Nội dung bài viết <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("content", {
                required: "Nội dung không được để trống",
              })}
              className={`w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-y leading-relaxed ${errors.content ? "border-red-400" : ""}`}
              placeholder="Nhập nội dung bài viết. Hệ thống sẽ tự động ngắt đoạn khi bạn gõ dấu chấm (.)..."
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href="/admin/news" className="cst_btn">
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cst_btn-primary-icon"
            >
              <Save size={18} />
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
