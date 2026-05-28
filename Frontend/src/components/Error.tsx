import Link from "next/link";

export default function Error() {
  return (
    <section className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold pt-20">404 Not Found</h1>
        <p className="py-10 text-sm text-black/70">
          Trang bạn tìm kiếm không thể tìm thấy, vui lòng quay về trang chủ
        </p>
        <Link href={"/"} className="cst_btn-secondary-icon">
          Quay về trang chủ
        </Link>
      </div>
    </section>
  );
}
