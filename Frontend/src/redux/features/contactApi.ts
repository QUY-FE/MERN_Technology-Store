import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Contact, CreateContactDto, UpdateContactDto } from "#/types";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["contacts"],
  endpoints: (build) => ({
    createContact: build.mutation<Contact, CreateContactDto>({
      query: (newContact) => ({
        url: "/contacts/create",
        method: "POST",
        body: newContact,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "contacts" }],
    }),
    getAllContacts: build.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "contacts" as const, id: _id })),
              { type: "contacts" as const, id: "LIST" },
            ]
          : [{ type: "contacts" as const, id: "LIST" }],
    }),
    getOneContact: build.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: "contacts", id }],
    }),
    updateContact: build.mutation<Contact, { id: string; data: UpdateContactDto }>({
      query: ({ id, data }) => ({
        url: `/contacts/edit/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "contacts", id: arg.id }],
    }),
    deleteContact: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/contacts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "contacts", id }],
    }),
  }),
});


export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useGetOneContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;

export default contactApi;