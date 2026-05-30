import { ApplicationDetailApiResponse } from "@/components/applications/Application.types";
import type {
  GetApplicationsApiResponse,
  GetApplicationsQueryParams,
  GetFilterOptionsApiResponse,
} from "@/types/dashboard/application";
import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../../api";

const BASE_URL = "/admin/application";

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<
      GetApplicationsApiResponse,
      GetApplicationsQueryParams
    >({
      query: (params) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      providesTags: [QUERY_TAGS.APPLICATIONS],
    }),

    getFilterOptions: builder.query<GetFilterOptionsApiResponse, void>({
      query: () => ({
        url: `${BASE_URL}/filter-options`, // ✅ /admin/applications/filter-options
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.APPLICATIONS],
    }),
    // ── Add to existing applicationApi.ts ─────────────────────

    getApplicationById: builder.query<ApplicationDetailApiResponse, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: QUERY_TAGS.APPLICATIONS, id }],
    }),

    // Export: add useGetApplicationByIdQuery to existing exports
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useGetFilterOptionsQuery,
  useGetApplicationByIdQuery,
} = applicationApi;
