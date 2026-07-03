import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (newOrder) => ({
        url: "/create-order",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getOrderByEmail: builder.query<Order[], string>({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: (result, error, email) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Orders" as const, id: _id })),
              { type: "Orders" as const, id: `EMAIL_${email}` },
            ]
          : [{ type: "Orders" as const, id: `EMAIL_${email}` }],
    }),
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Orders" as const, id: _id })),
              { type: "Orders" as const, id: "LIST" },
            ]
          : [{ type: "Orders" as const, id: "LIST" }],
    }),
    updateOrder: builder.mutation<Order, { id: string; updatedOrder: Partial<CreateOrderDto> }>({
      query: ({ id, updatedOrder }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedOrder,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Orders", id }],
    }),
    deleteOrder: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;