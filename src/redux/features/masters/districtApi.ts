import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/admin/masters/districts`;

export const districtApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDistrict: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.DISTRICTS],
    }),
    updateDistrict: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.DISTRICTS],
    }),
    getDistricts: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.DISTRICTS],
    }),
    deleteDistrict: builder.mutation<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.DISTRICTS],
    }),
  }),
});

export const {
  useAddDistrictMutation,
  useUpdateDistrictMutation,
  useGetDistrictsQuery,
  useDeleteDistrictMutation,
} = districtApi;
