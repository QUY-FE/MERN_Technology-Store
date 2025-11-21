export const registerValidation = {
  username: {
    required: { value: true, message: "Vui lòng nhập tên người dùng" },
    minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
  },
  email: {
    required: { value: true, message: "Vui lòng nhập email" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },
  password: {
    required: { value: true, message: "Vui lòng nhập mật khẩu" },
    minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
  },
};

export const loginValidation = {
    email: {
    required: { value: true, message: "Vui lòng nhập email" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },
  password: {
    required: { value: true, message: "Vui lòng nhập mật khẩu" },
  },
}

export const checkoutValidation = {
  username: {
    required: { value: true, message: "Vui lòng nhập tên người dùng" },
    minLength: { value: 6, message: "Tên phải có ít nhất 6 ký tự" },
  },
  address: {
    required: { value: true, message: "Vui lòng nhập địa chỉ" },
  },
  phone: {
    required: { value: true, message: "Vui lòng nhập số điện thoại" },
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: "Số điện thoại không hợp lệ",
    },
    minLength: { value: 10, message: "Tên phải có ít nhất 10 ký tự" },
  },
   email: {
    required: { value: true, message: "Vui lòng nhập email" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },
}

export const adminValidation = {
  username: {
    required: { value: true, message: "Vui lòng nhập tên người dùng" },
  },
  password: {
    required: { value: true, message: "Vui lòng nhập mật khẩu" },
  },
}