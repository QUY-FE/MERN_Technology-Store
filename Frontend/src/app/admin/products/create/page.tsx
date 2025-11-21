"use client";

import { useCreateProductMutation } from "#/redux/features/productApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  img: FileList;
  newPrice: number;
  oldPrice: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
}

export default function Page() {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState('');
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const newProduct= {
      ...data,
      img: imageFileName,
    }
    try {
      await createProduct(newProduct).unwrap();
      toast.success("Thêm sản phẩm thành công");
      console.log(imgFile)
      reset();
      setImageFileName('');
      setImgFile(null);
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Thêm sản phẩm không thành công")
    }
  };

 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // Dùng ?. để an toàn hơn
  if (file) {
    setImgFile(file);
    setImageFileName(file.name);
  }
};

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Tạo sản phẩm :</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tiêu đề */}
        <div>
          <label className="font-semibold text-sm">Tiêu đề :</label>
          <div className="border-b-2 border-colorBorder">
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Nhập tiêu đề sản phẩm"
              className="cst_input"
            />
          </div>
        </div>

        

        {/* Giá mới */}
        <div>
          <label className="font-semibold text-sm">Giá mới</label>
          <div className="border-b-2 border-colorBorder">
            <input
              {...register("newPrice", { required: true })}
              type="number"
              placeholder="vd: 1000000"
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
              placeholder="vd: 1200000"
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
          <label className="font-semibold text-sm">Danh mục :</label>
          <div className="border-b-2 border-colorBorder">
            <select
              {...register("category", { required: true })}
              className="cst_input"
            >
              <option value="">-- Chọn loại mặt hàng --</option>
              <option value="phone">phone</option>
              <option value="laptop">laptop</option>
              <option value="headphone">headphone</option>
              <option value="camera">camera</option>
              <option value="gaming">gaming</option>
              <option value="computer">computer</option>
              <option value="toys">toys</option>
            </select>
          </div>
        </div>

        {/* Ảnh */}
        <div>
          <label className="font-semibold text-sm">URL ảnh :</label>
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="cst_input" />
          </div>
        </div>


        {/* Description */}
        <div>
          <label className="font-semibold text-sm">Mô tả :</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Nhập mô tả sản phẩm..."
            className="w-full border p-3 rounded-md resize-none h-32"
          ></textarea>
        </div>

        {/* Button */}
        <div className="flex items-center justify-end gap-4 ">
          <Link href={"/admin/products"} className="cst_btn px-4 py-2">
            Quay lại
          </Link>

          <button
            type="submit"
            className="cst_btn-primary px-4 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý" : "Tạo sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
