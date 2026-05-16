import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/admin/masters/constituencies`;

export const constituencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addConstituency: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),
    updateConstituency: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),
    getConstituencies: builder.query<any, any>({
      query: (params) => ({
        url: `${BASE_URL}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),
    deleteConstituency: builder.mutation<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),
  }),
});

export const {
  useAddConstituencyMutation,
  useUpdateConstituencyMutation,
  useGetConstituenciesQuery,
  useDeleteConstituencyMutation,
} = constituencyApi;
