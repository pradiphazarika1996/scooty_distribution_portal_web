import type { MeritAwardApplication } from "@/types/students/application";
import { apiSlice } from "../api";

const BASE_URL = "/admin";

interface GetAllStudentsResponse {
  status: boolean;
  count: number;
  students: MeritAwardApplication[];
}

type StatusFilter = "submitted" | "draft" | undefined;

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query<GetAllStudentsResponse, StatusFilter>({
      query: (status) => ({
        url: status
          ? `${BASE_URL}/students?status=${status}`
          : `${BASE_URL}/students`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllStudentsQuery } = adminApi;
