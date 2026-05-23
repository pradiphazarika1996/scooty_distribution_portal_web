import type {
  DistrictChartApiResponse,
  ExamSplitApiResponse,
  RecentApplicationsApiResponse,
  StatCardApiResponse,
} from "@/types/dashboard/dashboard";
import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../../api";

const BASE_URL = "/admin/dashboard";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatCards: builder.query<StatCardApiResponse, void>({
      query: () => ({
        url: `${BASE_URL}/stat-cards`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.DASHBOARD_STAT_CARDS],
    }),

    getExamSplit: builder.query<ExamSplitApiResponse, void>({
      query: () => ({
        url: `${BASE_URL}/exam-split`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.DONUT],
    }),
    getRecentApplications: builder.query<RecentApplicationsApiResponse, void>({
      query: () => ({ url: `${BASE_URL}/recent-applications`, method: "GET" }),
      providesTags: [QUERY_TAGS.DASHBOARD_RECENT_APPLICATIONS],
    }),
    getDistrictChart: builder.query<DistrictChartApiResponse, void>({
      query: () => ({ url: `${BASE_URL}/district-chart`, method: "GET" }),
      providesTags: [QUERY_TAGS.DASHBOARD_DISTRICT_CHART],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStatCardsQuery,
  useGetExamSplitQuery,
  useGetRecentApplicationsQuery,
  useGetDistrictChartQuery,
} = dashboardApi;
