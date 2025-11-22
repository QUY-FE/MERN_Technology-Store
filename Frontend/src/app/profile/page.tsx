"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "#/context/authContext";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">
          Đang tải thông tin người dùng...
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen w-full flex items-center justify-center  py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative overflow-hidden">
        {/* Banner gradient */}
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-red-500 to-orange-400 rounded-t-xl" />

        {/* Avatar */}
        <div className="relative flex flex-col items-center mt-16">
          <Image
            src={user.photoURL || "/men_avatar.jpg"}
            alt="Avatar user"
            width={110}
            height={110}
            className="rounded-full border-4 border-white shadow-md"
          />
          <h1 className="text-xl font-semibold mt-4 text-gray-800">
            {user.username || "Người dùng mới"}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Info section */}
        <div className="mt-8 space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">ID tài khoản:</span>
            <span className="text-gray-800 truncate max-w-[180px]">
              {user.id}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Trạng thái:</span>
            <span className="text-green-600 font-medium">Đang hoạt động</span>
          </div>
        </div>

        
      </div>
    </section>
  );
}
