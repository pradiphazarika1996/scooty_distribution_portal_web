import { QUERY_TAGS } from "../../utils/status";
import { apiSlice } from "../api";

const BASE_URL = `/auth/admin`;

export const adminAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOtpSend: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/login/send-otp`,
        method: "POST",
        body: payload,
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.ADMIN],
    }),
    loginOtpVerify: builder.mutation<any, void>({
      query: (payload) => ({
        url: `${BASE_URL}/login/verify-otp`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.ADMIN],
    }),
    registerOtpSend: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/register/send-otp`,
        method: "POST",
        body: payload,
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.ADMIN],
    }),
    registerOtpVerify: builder.mutation<any, void>({
      query: (payload) => ({
        url: `${BASE_URL}/register/verify-otp`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.ADMIN],
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/account`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.ADMIN],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.ADMIN],
    }),
  }),
});

export const {
  useLoginOtpSendMutation,
  useLoginOtpVerifyMutation,
  useRegisterOtpSendMutation,
  useRegisterOtpVerifyMutation,
  useGetUserQuery,
  useLogoutMutation,
} = adminAuthApi;
