import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  _id: string;
  title: string;
  img: string;
  newPrice: number;
  oldPrice: number;
  countStar: number;
  totalBuy: number;
  category: string;
  description: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateProductDto = {
  title: string;
  img: string;
  newPrice: number;
  oldPrice: number;
  quantity: number;
  countStar: number;
  totalBuy: number;
  salePercent: number;
  category: string;
  description: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (build) => ({
    createProduct: build.mutation<Product, CreateProductDto>({
      query: (newProduct) => ({
        url: "/products/create-product",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "products" }],
    }),
    getAllProduct: build.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "products" as const, id: _id })),
              { type: "products" as const, id: "LIST" },
            ]
          : [{ type: "products" as const, id: "LIST" }],
    }),
    getOneProduct: build.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),
    updateProduct: build.mutation<Product, { id: string; data: UpdateProductDto }>({
      query: ({ id, data }) => ({
        url: `/products/edit/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "products", id: arg.id }],
    }),
    deletedProduct: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "products", id }],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeletedProductMutation,
  useGetAllProductQuery,
  useGetOneProductQuery,
  useUpdateProductMutation,
} = productApi;

export default productApi;