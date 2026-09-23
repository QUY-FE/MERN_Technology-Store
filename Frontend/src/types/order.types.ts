export interface OrderItem {
  productId: string;
  title?: string;
  price?: number;
  quantity?: number;
}

export interface Order {
  _id: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  coupon?: string;
  payment?: string;
  items?: OrderItem[];
  status?: string;
  productPay?: { product: string; name: string; quantity: number }[];
  totalPrice?: number;
  saveInfo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateOrderDto = {
  username: string;
  email: string;
  phone: string;
  address: string;
  status?: string;
  payment: string;
  productPay: { product: string; name: string; quantity: number }[];
  totalPrice: number;
  coupon?: string;
  saveInfo?: boolean;
};

export interface AdminOrderItem {
  product: any;
  name?: string;
  quantity: number;
}

export interface AdminOrder {
  _id: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  productPay?: AdminOrderItem[];
}
