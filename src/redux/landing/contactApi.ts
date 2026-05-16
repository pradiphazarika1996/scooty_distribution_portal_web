import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";

export interface ContactFormData {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  recaptchaToken: string;
}

export interface ContactResponse {
  status: boolean;
  message: string;
}

const BASE_URL = `/landing/contact`;

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<ContactResponse, ContactFormData>({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CONTACT],
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;