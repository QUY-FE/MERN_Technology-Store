import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    // GET /api/reviews/
    getAllReviews: builder.query<Review[], void>({
      query: () => `/reviews`,
      providesTags: ["Reviews"],
    }),

    // GET /api/reviews/:productId
    getReviewsByProduct: builder.query<Review[], string>({
      query: (productId) => `/reviews/${productId}`,
      providesTags: ["Reviews"],
    }),

    // POST /api/reviews/create-review
    createReview: builder.mutation<Review, Partial<Review>>({
      query: (body) => ({
        url: "/reviews/create-review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // PUT /api/reviews/edit/:id
    updateReview: builder.mutation<Review, { id: string; data: Partial<Review> }>({
      query: ({ id, data }) => ({
        url: `/reviews/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // DELETE /api/reviews/delete/:id
    deleteReview: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/reviews/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewsByProductQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
export default reviewApi;