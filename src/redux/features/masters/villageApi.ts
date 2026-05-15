import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/admin/masters/villages`;

export const clusterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVillage: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.VILLAGES],
    }),
    updateVillage: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.VILLAGES],
    }),
    getVillages: builder.query<any, any>({
      query: (params) => ({
        url: `${BASE_URL}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.VILLAGES],
    }),
    deleteVillage: builder.mutation<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.VILLAGES],
    }),
  }),
});

export const {
  useAddVillageMutation,
  useUpdateVillageMutation,
  useGetVillagesQuery,
  useDeleteVillageMutation,
} = clusterApi;
