"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { Save, FileText, ArrowLeft } from "lucide-react";
import {
  useGetOneContactQuery,
  useUpdateContactMutation,
  UpdateContactDto,
} from "#/redux/features/contactApi";

const statusOptions = ["Đang xử lý", "Hoàn thành", "Đã hủy"];

export default function EditContactPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: contact, isLoading } = useGetOneContactQuery(id);
  const [updateContact] = useUpdateContactMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateContactDto>();

  // Khởi tạo và đổ dữ liệu cũ vào form sau khi fetch thành công
  useEffect(() => {
    if (contact) {
      setValue("username", contact.username);
      setValue("number", contact.number);
      setValue("description", contact.description);
      setValue("status", contact.status || "Đang xử lý");
    }
  }, [contact, setValue]);

  const onSubmit = async (data: UpdateContactDto) => {
    try {
      // Chỉ gửi lên server những trường được phép sửa (ở đây là status)
      await updateContact({ id, data: { status: data.status } }).unwrap();
      toast.success("Cập nhật trạng thái liên hệ thành công");
      router.push("/admin/contacts");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại, vui lòng thử lại");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Đang tải chi tiết dữ liệu liên hệ...
        </p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex flex-col items-center justify-center">
        <FileText size={48} className="text-gray-300 mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          Không tìm thấy bản ghi liên hệ
        </p>
        <Link
          href="/admin/contacts"
          className="mt-4 text-primary hover:underline text-sm flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Xử lý yêu cầu liên hệ</h1>
            <p className="text-sm text-gray-500 mt-1">
              ID bản ghi:{" "}
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {contact._id}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box Trạng Thái (Cho phép chỉnh sửa) */}
            <div className="md:col-span-2 p-5 rounded-xl border border-blue-100 bg-blue-50/30">
              <label className="block font-semibold text-sm text-gray-800 mb-2">
                Trạng thái xử lý <span className="text-red-500">*</span>
              </label>
              <select
                {...register("status", { required: true })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white font-medium cursor-pointer"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Thông tin khách hàng (Chỉ đọc) */}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Tên khách hàng
              </label>
              <input
                {...register("username")}
                type="text"
                readOnly
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none transition-all text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1.5">
                Số điện thoại liên hệ
              </label>
              <input
                {...register("number")}
                type="text"
                readOnly
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none transition-all text-sm font-mono cursor-not-allowed"
              />
            </div>
          </div>

          {/* Lời nhắn (Chỉ đọc) */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1.5">
              Nội dung chi tiết lời nhắn
            </label>
            <textarea
              {...register("description")}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 outline-none transition-all text-sm resize-none h-48 leading-relaxed cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link href="/admin/contacts" className="cst_btn">
              Hủy bỏ
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cst_btn-primary-icon flex items-center gap-2"
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