import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/admin/masters/panchayats`;

export const BlockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPanchayat: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.PANCHAYATS],
    }),
    updatePanchayat: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.PANCHAYATS],
    }),
    getPanchayats: builder.query<any, any>({
      query: (params) => ({
        url: `${BASE_URL}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.PANCHAYATS],
    }),
    deletePanchayat: builder.mutation<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.PANCHAYATS],
    }),
  }),
});

export const {
  useAddPanchayatMutation,
  useUpdatePanchayatMutation,
  useGetPanchayatsQuery,
  useDeletePanchayatMutation,
} = BlockApi;
