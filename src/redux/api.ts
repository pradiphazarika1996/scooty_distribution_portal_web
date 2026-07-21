import { QUERY_TAGS } from "@/utils/status";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

axios.defaults.withCredentials = true;

export type AxiosBaseQueryArgs = {
  url: string;
  method?: string;
  body?: any;
  params?: any;
};

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<AxiosBaseQueryArgs> => // ✅ explicit return type
  async ({ url, method = "GET", body: data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
      });
      return { data: result.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  }),
  tagTypes: [
    QUERY_TAGS.APP,
    QUERY_TAGS.CONTACT,
    QUERY_TAGS.SCHOLARSHIP_APPLICATION,
    QUERY_TAGS.SCHOLARSHIP_ELIGIBILITY,
    QUERY_TAGS.SCHOLARSHIP_DOCUMENTS,
    QUERY_TAGS.DASHBOARD,
    QUERY_TAGS.MY_APPLICATION,
    QUERY_TAGS.PROFILE,
    QUERY_TAGS.APPLICATIONS,
    QUERY_TAGS.MASTERS,
    QUERY_TAGS.DISTRICTS,
    QUERY_TAGS.CONSTITUENCIES,
    QUERY_TAGS.PANCHAYATS,
    QUERY_TAGS.VILLAGES,
    QUERY_TAGS.ADMIN,
    QUERY_TAGS.STUDENT_PROFILE,
    QUERY_TAGS.DASHBOARD_STAT_CARDS,
    QUERY_TAGS.DONUT,
    QUERY_TAGS.DASHBOARD_RECENT_APPLICATIONS,
    QUERY_TAGS.DASHBOARD_DISTRICT_CHART,
    QUERY_TAGS.USERS,
    QUERY_TAGS.DASHBOARD_TREND,
  ],
  endpoints: () => ({}),
  refetchOnReconnect: true,
});
