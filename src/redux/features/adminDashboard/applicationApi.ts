import { ApplicationDetailApiResponse } from "@/components/applications/Application.types";
import type {
  ApplicationActionApiResponse,
  ApplicationDecisionPayload,
  ApplicationDocumentsApiResponse,
  GetApplicationsApiResponse,
  GetApplicationsQueryParams,
  GetFilterOptionsApiResponse,
} from "@/types/dashboard/application";
import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../../api";

const BASE_URL = "/admin/application";

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ── Applications list (table) ─────────────────────────
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

    // ── Filter dropdown options ───────────────────────────
    getFilterOptions: builder.query<GetFilterOptionsApiResponse, void>({
      query: () => ({
        url: `${BASE_URL}/filter-options`, // → /admin/application/filter-options
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.APPLICATIONS],
    }),

    // ── Single application detail (View Details page) ────
    getApplicationById: builder.query<ApplicationDetailApiResponse, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: QUERY_TAGS.APPLICATIONS, id }],
    }),

    // ── Single document preview URL — fetched on demand when
    //    Preview is clicked, so the signed URL is always fresh
    //    rather than relying on one generated minutes earlier in
    //    the batch list response.
    //    Fixed: was "/documents/${id}/url" — didn't match the
    //    backend route, which is registered as "/document/:id/url".
    getDocumentUrl: builder.query<{ status: boolean; url: string }, number>({
      query: (id) => ({
        url: `${BASE_URL}/document/${id}/url`,
        method: "GET",
      }),
      // keepUnusedDataFor: 0,
    }),

    // ── Documents for an application (View Details page) ──
    // Points at the dedicated admin DocumentController's
    // getApplicationDocuments handler, which returns {success, data}.
    getApplicationDocuments: builder.query<
      ApplicationDocumentsApiResponse,
      number
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/documents`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: QUERY_TAGS.APPLICATIONS, id }],
    }),

    // ── Approve application ────────────────────────────────
    // Invalidates 3 tags so everything stays in sync automatically:
    //   • this application's detail cache → status badge updates here
    //   • the applications list cache     → table shows new status
    //   • dashboard stat cards cache      → approved count updates
    approveApplication: builder.mutation<
      ApplicationActionApiResponse,
      ApplicationDecisionPayload
    >({
      query: ({ id, remarks }) => ({
        url: `${BASE_URL}/${id}/approve`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: QUERY_TAGS.APPLICATIONS, id },
        QUERY_TAGS.APPLICATIONS,
        QUERY_TAGS.DASHBOARD_STAT_CARDS,
      ],
    }),
    rejectApplication: builder.mutation<
      ApplicationActionApiResponse,
      ApplicationDecisionPayload
    >({
      query: ({ id, remarks }) => ({
        url: `${BASE_URL}/${id}/reject`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: QUERY_TAGS.APPLICATIONS, id },
        QUERY_TAGS.APPLICATIONS,
        QUERY_TAGS.DASHBOARD_STAT_CARDS,
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useGetFilterOptionsQuery,
  useGetApplicationByIdQuery,
  useApproveApplicationMutation,
  useRejectApplicationMutation,
  useGetApplicationDocumentsQuery,
  useGetDocumentUrlQuery,
  useLazyGetDocumentUrlQuery, // ← added: lets Preview fetch on click instead of on mount
} = applicationApi;
