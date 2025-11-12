"use client";
import React from "react";

const TermsAndPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-700 leading-relaxed mt-[60px]">
      <h1 className="text-3xl font-bold text-red-400 mb-6 text-center">
        Điều khoản sử dụng & Chính sách bảo mật
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          1. Giới thiệu
        </h2>
        <p>
          Chào mừng bạn đến với <strong>Qnshop.vn</strong> — nền tảng học tập
          trực tuyến dành cho mọi người yêu thích tri thức. Khi truy cập và sử
          dụng trang web này, bạn đồng ý tuân thủ các điều khoản sử dụng được
          nêu dưới đây. Nếu bạn không đồng ý, vui lòng ngừng truy cập dịch vụ
          của chúng tôi.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          2. Tài khoản người dùng
        </h2>
        <p>
          Bạn cần cung cấp thông tin chính xác, đầy đủ khi đăng ký tài khoản và
          chịu trách nhiệm bảo mật toàn bộ hoạt động trong tài khoản của mình.
          Nếu phát hiện hành vi sử dụng trái phép, hãy thông báo ngay cho đội
          ngũ hỗ trợ của <strong>Qnshop.vn</strong>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          3. Quyền và trách nhiệm của người dùng
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Không sao chép, chỉnh sửa hoặc phân phối nội dung học tập nếu không
            có sự đồng ý.
          </li>
          <li>
            Không sử dụng website vào mục đích vi phạm pháp luật hoặc gây ảnh
            hưởng xấu đến cộng đồng.
          </li>
          <li>
            Tôn trọng giảng viên, học viên khác và tuân thủ quy tắc ứng xử trên
            nền tảng.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          4. Quyền và trách nhiệm của <strong>Qnshop.vn</strong>
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Có quyền thay đổi, tạm ngưng hoặc ngừng cung cấp dịch vụ để cải
            thiện chất lượng.
          </li>
          <li>
            Không chịu trách nhiệm với thiệt hại do sự cố kỹ thuật hoặc hành vi
            từ phía người dùng.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          5. Sở hữu trí tuệ
        </h2>
        <p>
          Tất cả nội dung, hình ảnh, tài liệu học tập, mã nguồn và thiết kế giao
          diện thuộc quyền sở hữu của <strong>Qnshop.vn</strong> Mọi hành vi sử
          dụng trái phép đều bị nghiêm cấm.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          6. Chính sách bảo mật
        </h2>
        <p className="mb-3">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng. Dưới đây là
          tóm tắt chính sách bảo mật của chúng tôi:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Thu thập thông tin:</strong> Thông tin được thu thập nhằm hỗ
            trợ quá trình học tập, gửi thông báo, và cải thiện trải nghiệm người
            dùng.
          </li>
          <li>
            <strong>Sử dụng thông tin:</strong> Dữ liệu chỉ được dùng cho mục
            đích nội bộ, không chia sẻ với bên thứ ba nếu không có sự đồng ý.
          </li>
          <li>
            <strong>Bảo mật:</strong> Chúng tôi áp dụng các biện pháp kỹ thuật
            (SSL, tường lửa, xác thực hai lớp...) để bảo vệ dữ liệu.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          7. Quyền của người dùng
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
          <li>Ngừng nhận email thông báo bất kỳ lúc nào.</li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">8. Liên hệ</h2>
        <p>
          Mọi thắc mắc về điều khoản và chính sách, vui lòng liên hệ qua email:
          CSKH@Qnshop.vn
        </p>
      </section>
    </div>
  );
};
export default TermsAndPolicy;