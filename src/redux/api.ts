import { QUERY_TAGS } from '@/utils/status';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, body: data, params }: { url: string; method: string; body?: any; params?: any }) => {
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
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  }),
  tagTypes: [QUERY_TAGS.APP, QUERY_TAGS.CONTACT],
  endpoints: (builder) => ({}),
  refetchOnReconnect: true,
});
