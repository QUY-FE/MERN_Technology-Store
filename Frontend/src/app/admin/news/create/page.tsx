"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { Save, UploadCloud, X } from "lucide-react";
import { CreateNewsDto, useCreateNewsMutation } from "#/redux/features/newsApi";
import { useUploadNewsImageMutation } from "#/redux/features/uploadApi";



export default function CreateNewsPage() {
  const router = useRouter();
  const [createNews] = useCreateNewsMutation();
  const [uploadNewsImage] = useUploadNewsImageMutation();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm<CreateNewsDto>({
    defaultValues: { status: "Hiện", content: "" },
  });

  const titleVal = watch("title");
  
  useEffect(() => {
    if (titleVal) {
      const generateSlug = titleVal.toLowerCase().trim()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/([^0-9a-z-\s])/g, "")
        .replace(/(\s+)/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", generateSlug, { shouldValidate: true });
    }
  }, [titleVal, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreateNewsDto) => {
    if (!thumbnailFile) {
      return toast.error("Vui lòng chọn ảnh đại diện cho bài viết");
    }

    try {
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

      
      await createNews(newNews).unwrap();
      toast.success("Tạo bài viết thành công!");
      router.push("/admin/news");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Có lỗi xảy ra khi lưu bài viết");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Tạo bài viết mới</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
              <input
                {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">Trạng thái xuất bản</label>
              <select
                {...register("status")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="Hiện">Xuất bản ngay</option>
                <option value="Ẩn">Lưu nháp</option>
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">Ảnh đại diện <span className="text-red-500">*</span></label>
              {!thumbnailPreview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 font-semibold">Nhấn để tải ảnh lên</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              ) : (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={thumbnailPreview} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => { setThumbnailFile(null); setThumbnailPreview(""); }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SỬ DỤNG TEXTAREA THUẦN */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1.5">Nội dung bài viết <span className="text-red-500">*</span></label>
            <textarea
              {...register("content", { required: "Nội dung không được để trống" })}
              className={`w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-y leading-relaxed ${errors.content ? 'border-red-400' : ''}`}
              placeholder="Nhập nội dung bài viết. Hệ thống sẽ tự động ngắt đoạn khi bạn gõ dấu chấm (.)..."
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href="/admin/news" className="cst_btn">Hủy bỏ</Link>
            <button type="submit" disabled={isSubmitting} className="cst_btn-primary-icon">
              <Save size={18} />
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}