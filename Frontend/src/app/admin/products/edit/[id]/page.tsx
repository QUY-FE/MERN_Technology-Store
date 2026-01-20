"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGetAllProductQuery, useUpdateProductMutation } from "#/redux/features/productApi";
import { toast } from "react-toastify";
import Image from "next/image";

interface FormData {
  title: string;
  gallery: FileList;
  newPrice: number;
  oldPrice: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
}

import { useState } from "react";

export default function Page() {
  const { id } = useParams<{id: string}>();
  const {data: products = [] } = useGetAllProductQuery();
  const router = useRouter();
  const [updateProduct] = useUpdateProductMutation();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const product = products.find((p) => p._id === id);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryFileNames, setGalleryFileNames] = useState<string[]>([]);

  // đổ dữ liệu cũ vào form
  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("newPrice", product.newPrice);
      setValue("oldPrice", product.oldPrice);
      setValue("category", product.category);
      setValue("quantity", product.quantity);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const onSubmit = async (data: FormData) => {
    

    // Gallery mới nếu có, nếu không thì giữ gallery cũ
    const galleryValue =
      galleryFileNames.length > 0
        ? galleryFileNames
        : product?.gallery || [];

    const editProduct = {
      title: data.title,
      newPrice: data.newPrice,
      oldPrice: data.oldPrice,
      quantity: data.quantity,
      category: data.category,
      description: data.description,
      gallery: galleryValue,
    };
    try {
      await updateProduct({ id, data: { ...editProduct } }).unwrap();
      console.log(editProduct);
      toast.success("Cập nhật sản phẩm thành công");
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  // Xử lý chọn nhiều ảnh gallery
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArr = Array.from(files);
      setGalleryFiles(fileArr);
      setGalleryFileNames(fileArr.map(f => f.name));
    } else {
      setGalleryFiles([]);
      setGalleryFileNames([]);
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Sửa sản phẩm :</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tiêu đề */}
        <div>
          <label className="font-semibold text-sm">Tiêu đề :</label>
          <div className="border-b-2 border-colorBorder">
            <input {...register("title")} type="text" className="cst_input" />
          </div>
        </div>

        

        {/* Gallery ảnh */}
        <div>
          <label className="font-semibold text-sm">Gallery hiện tại:</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {Array.isArray(product.gallery) && product.gallery.length > 0 ? (
              product.gallery.map((img, idx) => (
                <Image
                  key={idx}
                  src={`/${img}`}
                  alt="gallery"
                  width={60}
                  height={60}
                  className="object-cover rounded border"
                />
              ))
            ) : (
              <span className="text-xs text-gray-400">Không có</span>
            )}
          </div>
          <label className="font-semibold text-sm">Gallery mới (chọn nhiều ảnh):</label>
          <div className="border-b-2 border-colorBorder">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="cst_input"
            />
            {galleryFileNames.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">{galleryFileNames.join(', ')}</div>
            )}
          </div>
        </div>

        {/* Giá mới */}
        <div>
          <label className="font-semibold text-sm">Giá mới</label>
          <div className="border-b-2 border-colorBorder">
            <input
              {...register("newPrice")}
              type="number"
              className="cst_input"
            />
          </div>
        </div>

        {/* Giá cũ */}
        <div>
          <label className="font-semibold text-sm">Giá cũ</label>
          <div className="border-b-2 border-colorBorder">
            <input
              {...register("oldPrice")}
              type="number"
              className="cst_input"
            />
          </div>
        </div>

        {/* số lượng */}
        <div>
          <label className="font-semibold text-sm">Số lượng:</label>
          <div className="border-b-2 border-colorBorder">
            <input
              {...register("quantity")}
              type="number"
              placeholder="vd: 10"
              className="cst_input"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-sm">Danh mục</label>
          <select {...register("category")} className="cst_input">
            <option value="phone">phone</option>
            <option value="laptop">laptop</option>
            <option value="headphone">headphone</option>
            <option value="camera">camera</option>
            <option value="gaming">gaming</option>
            <option value="computer">computer</option>
            <option value="toys">toys</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-sm">Mô tả :</label>
          <textarea
            {...register("description")}
            className="w-full border p-3 rounded-md h-32 resize-none"
          ></textarea>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="cst_btn-primary px-4 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Cập nhật sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
