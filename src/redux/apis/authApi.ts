import { QUERY_TAGS } from "../../utils/status";
import { apiSlice } from "../api";

const BASE_URL = `/auth/student`;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOtpSend: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/login/send-otp`,
        method: "POST",
        body: payload,
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    loginOtpVerify: builder.mutation<any, { otp: string; token: string }>({
      query: (payload) => ({
        url: `${BASE_URL}/login/verify-otp`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    registerOtpSend: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/register/send-otp`,
        method: "POST",
        body: payload,
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    registerOtpVerify: builder.mutation<any, { otp: string; token: string }>({
      query: (payload) => ({
        url: `${BASE_URL}/register/verify-otp`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/account`,
        method: "GET",
      }),
      providesTags: [],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/register`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
  }),
});

export const {
  useLoginOtpSendMutation,
  useLoginOtpVerifyMutation,
  useRegisterOtpSendMutation,
  useRegisterOtpVerifyMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi;
