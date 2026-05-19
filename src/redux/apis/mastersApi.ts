import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/student/master`;

export const mastersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Districts
    getDistricts: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/districts`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.DISTRICTS],
    }),
    getDistrict: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/districts/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.DISTRICTS],
    }),

    // Constituencies
    getConstituencies: builder.query<any, { district_id?: number }>({
      query: (params) => ({
        url: `${BASE_URL}/constituencies`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),
    getConstituency: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/constituencies/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.CONSTITUENCIES],
    }),

    // Panchayats
    getPanchayats: builder.query<any, { constituency_id?: number }>({
      query: (params) => ({
        url: `${BASE_URL}/panchayats`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.PANCHAYATS],
    }),
    getPanchayat: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/panchayats/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.PANCHAYATS],
    }),

    getVillages: builder.query<any, { constituency_id?: number }>({
      query: (params) => ({
        url: `${BASE_URL}/villages`,
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.VILLAGES],
    }),
    getVillage: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/villages/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.VILLAGES],
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useGetConstituenciesQuery,
  useGetPanchayatsQuery,
  useGetVillagesQuery,
  useGetDistrictQuery,
  useGetConstituencyQuery,
  useGetPanchayatQuery,
  useGetVillageQuery,
} = mastersApi;
