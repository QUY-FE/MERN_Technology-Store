export interface Review {
  _id?: string;
  productId: string;
  username: string;
  email: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewForm {
  rating: number;
  comment: string;
}

export interface OrderProduct {
  product: string;
  name: string;
  quantity: number;
  _id: string;
}
