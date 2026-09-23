import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { News, CreateNewsDto, UpdateNewsDto } from "#/types";

const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["news"],
  endpoints: (build) => ({
    createNews: build.mutation<News, CreateNewsDto>({
      query: (newPost) => ({
        url: "/news/create",
        method: "POST",
        body: newPost,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "news" }],
    }),
    getAllNews: build.query<News[], void>({
      query: () => "/news",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "news" as const,
                id: _id,
              })),
              { type: "news" as const, id: "LIST" },
            ]
          : [{ type: "news" as const, id: "LIST" }],
    }),
    getOneNews: build.query<News, string>({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: "news", id }],
    }),
    updateNews: build.mutation<
      News,
      { id: string; data: UpdateNewsDto }
    >({
      query: ({ id, data }) => ({
        url: `/news/edit/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "news", id: arg.id },
      ],
    }),
    deletedNews: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/news/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "news", id }],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useGetAllNewsQuery,
  useGetOneNewsQuery,
  useDeletedNewsMutation,
  useUpdateNewsMutation,
} = newsApi;

export default newsApi;
