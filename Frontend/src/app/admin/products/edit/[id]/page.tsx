"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import { Save, UploadCloud, X, ImageIcon } from "lucide-react";

import {
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "#/redux/features/productApi";
import getImageUrl from "#/utils/getImageUrl";
import { useUploadProductImageMutation } from "#/redux/features/uploadApi";
import type { ProductForm } from "#/types";

const categories = [
  { title: "Điện thoại", value: "Phone" },
  { title: "Laptop", value: "Laptop" },
  { title: "Tai nghe", value: "Headphone" },
  { title: "Máy ảnh", value: "Camera" },
  { title: "Gaming", value: "Gaming" },
  { title: "Máy tính bàn", value: "Computer" },
  { title: "Đồ Decor", value: "Decor" },
];

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: products = [], isLoading } = useGetAllProductQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ProductForm>();

  const product = products.find((p) => p._id === id);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("quantity", product.quantity);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviews]);

  const onSubmit = async (data: ProductForm) => {
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

    const editProduct = {
      title: data.title,
      price: Number(data.price),
      quantity: Number(data.quantity),
      category: data.category,
      description: data.description,
      gallery: uploadedUrls,
    };

    try {
      await updateProduct({ id, data: editProduct }).unwrap();
      toast.success("Cập nhật sản phẩm thành công");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArr = Array.from(files);
      setGalleryFiles(fileArr);

      const previews = fileArr.map((file) => URL.createObjectURL(file));
      setGalleryPreviews(previews);
    } else {
      setGalleryFiles([]);
      setGalleryPreviews([]);
    }
  };

  const removeNewImage = (indexToRemove: number) => {
    setGalleryFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setGalleryPreviews((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Đang tải thông tin sản phẩm...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex flex-col items-center justify-center">
        <ImageIcon size={48} className="text-gray-300 mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          Không tìm thấy sản phẩm
        </p>
        <Link
          href="/admin/products"
          className="mt-4 text-primary hover:underline text-sm"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sửa sản phẩm</h1>
            <p className="text-sm text-gray-500 mt-1">
              ID:{" "}
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {product._id}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Thông tin cơ bản
            </h2>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
              />
              {errors.title && (
                <span className="text-xs text-red-500 mt-1">
                  Trường này là bắt buộc
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">
                  Giá bán (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">
                  Số lượng kho
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1.5">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Media & Mô tả
            </h2>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block font-medium text-sm text-gray-700 mb-3">
                Ảnh đang sử dụng
              </label>
              <div className="flex gap-3 flex-wrap">
                {Array.isArray(product.gallery) &&
                product.gallery.length > 0 ? (
                  product.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border ${galleryPreviews.length > 0 ? "opacity-50 grayscale" : "border-gray-300"}`}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt="Current gallery"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    Sản phẩm này chưa có ảnh
                  </span>
                )}
              </div>
              {galleryPreviews.length > 0 && (
                <p className="text-xs text-orange-600 mt-3 font-medium">
                  * Hệ thống sẽ xóa các ảnh này và thay thế bằng ảnh mới bạn vừa
                  chọn bên dưới.
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Tải lên ảnh mới (Ghi đè)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-8 hover:bg-gray-50 transition-colors relative">
                <div className="text-center">
                  <UploadCloud
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none hover:text-primary/80">
                      <span>Chọn ảnh mới</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    Nếu không chọn, hệ thống sẽ giữ nguyên ảnh cũ
                  </p>
                </div>
              </div>

              {/* Preview Ảnh Mới */}
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                  {galleryPreviews.map((url, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-primary aspect-square shadow-sm"
                    >
                      <Image
                        src={url}
                        alt={`New Preview ${index}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-[10px] text-center py-1 font-medium">
                        Mới
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mô tả */}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Mô tả chi tiết
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-y h-40"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href={"/admin/products"} className="cst_btn ">
              Huỷ
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cst_btn-primary-icon"
            >
              <Save size={18} />
              {isSubmitting ? "Đang cập nhật..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
