export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface CheckoutForm {
  username: string;
  email: string;
  phone: string;
  address: string;
  payment: string;
  coupon?: string;
  saveInfo?: boolean;
}

export interface ProductForm {
  title: string;
  gallery?: string[];
  price: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
}

export interface NewsForm {
  title: string;
  slug: string;
  thumbnail?: string;
  content: string;
  author: string;
  status: string;
}

export interface ContactForm {
  username: string;
  number: string;
  description: string;
  status: string;
}

export interface AdminUserForm {
  username: string;
  email: string;
  password: string;
}

export interface OrderFormData {
  username: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  payment: string;
  productPay: { product: string; name: string; quantity: number }[];
  totalPrice: number;
  coupon?: string;
}
