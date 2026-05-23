import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";
import {
  IContact,
  IContactFormData,
  IGetContactsResponse,
} from "@/types/landing/landing";

export interface ContactResponse {
  status: boolean;
  message: string;
}

const BASE_URL = `/landing/contact`;

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<ContactResponse, IContactFormData>({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CONTACT],
    }),
    getContacts: builder.query<IContact[], void>({
      query: () => ({ url: `${BASE_URL}/query` }), // ✅ object, not plain string
      transformResponse: (res: IGetContactsResponse) => res.data,
      providesTags: [QUERY_TAGS.CONTACT],
    }),
  }),
});

export const { useSubmitContactMutation, useGetContactsQuery } = contactApi; // ✅ plural
