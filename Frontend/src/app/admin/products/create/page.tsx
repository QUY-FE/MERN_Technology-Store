"use client";

import { useCreateProductMutation } from "#/redux/features/productApi";
import { Save, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "#/redux/features/uploadApi";

interface FormData {
  title: string;
  price: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
}

const categories = [
  { title: "Điện thoại", value: "Phone" },
  { title: "Laptop", value: "Laptop" },
  { title: "Tai nghe", value: "Headphone" },
  { title: "Máy ảnh", value: "Camera" },
  { title: "Gaming", value: "Gaming" },
  { title: "Máy tính bàn", value: "Computer" },
  { title: "Đồ Decor", value: "Decor" },
]; 

export default function CreateProductPage() {
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  
  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviews]);

  const onSubmit = async (data: FormData) => {
    try {
      let uploadedUrls: string[] = [];

      if (galleryFiles.length > 0) {
        const formData = new FormData();
        
        galleryFiles.forEach((file) => {
          formData.append("images", file);
        });
        const uploadResult = await uploadProductImage(formData).unwrap();

        if (uploadResult.success) {
          uploadedUrls = uploadResult.data.urls;
        } else {
          throw new Error(uploadResult.message || "Lỗi upload ảnh");
        }
      }

      const newProduct = {
        ...data,
        gallery: uploadedUrls,
      };

      await createProduct(newProduct).unwrap();
      
      toast.success("Thêm sản phẩm thành công");
      reset();
      setGalleryFiles([]);
      setGalleryPreviews([]);
      router.push("/admin/products");
      
    } catch (error) {
      console.error(error);
      toast.error("Thêm sản phẩm không thành công");
    }
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArr = Array.from(files);
      
      if (galleryFiles.length + fileArr.length > 5) {
          toast.warning("Chỉ được phép chọn tối đa 5 ảnh");
          return;
      }

      setGalleryFiles((prev) => [...prev, ...fileArr]);

      const previews = fileArr.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setGalleryFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setGalleryPreviews((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h1>
            <p className="text-sm text-gray-500 mt-1">Điền đầy đủ thông tin bên dưới để tạo sản phẩm</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">Thông tin cơ bản</h2>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Nhập tên sản phẩm..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
              />
              {errors.title && <span className="text-xs text-red-500 mt-1">*Chưa nhập tên sản phẩm</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">Giá bán (VNĐ) <span className="text-red-500">*</span></label>
                <input
                  {...register("price", { required: true, valueAsNumber: true })}
                  type="number"
                  placeholder="VD: 15000000"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
                {errors.price && <span className="text-xs text-red-500 mt-1">*Chưa nhập giá bán</span>}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">Số lượng kho</label>
                <input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  placeholder="VD: 50"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
                {errors.quantity && <span className="text-xs text-red-500 mt-1">*Chưa nhập số lượng kho</span>}
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">Danh mục <span className="text-red-500">*</span></label>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                >
                  <option value="">-- Chọn loại sản phẩm --</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>{category.title}</option>
                  ))}
                </select>
                {errors.category && <span className="text-xs text-red-500 mt-1">*Chưa chọn danh mục</span>}
              </div>
              
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">Media & Mô tả</h2>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">Thư viện ảnh (Gallery)</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-8 hover:bg-gray-50 transition-colors relative">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none hover:text-primary/80">
                      <span>Tải ảnh lên</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryChange}
                        className="sr-only"
                      />
                      
                    </label>
                    <p className="pl-1">hoặc kéo thả vào đây</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">PNG, JPG tối đa 5MB (Tối đa 5 ảnh)</p>
                </div>
              </div>

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                  {galleryPreviews.map((url, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                      <Image src={url} alt={`Preview ${index}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Nhập bài viết mô tả sản phẩm..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-y h-40"
              ></textarea>
              {errors.description && <span className="text-xs text-red-500 mt-1">*Chưa nhập mô tả sản phẩm</span>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href={"/admin/products"} className="cst_btn">Hủy</Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cst_btn-primary-icon disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isSubmitting ? "Đang xử lý..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}