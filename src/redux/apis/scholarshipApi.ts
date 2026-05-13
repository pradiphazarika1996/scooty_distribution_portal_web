import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";

const BASE_URL = "/student/scholarship";

export const scholarshipApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEligibility: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/eligibility`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.SCHOLARSHIP_ELIGIBILITY],
    }),
    getApplication: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/application`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.SCHOLARSHIP_APPLICATION],
    }),
    createDraft: builder.mutation<any, { examId: number }>({
      query: (body) => ({
        url: `${BASE_URL}/application/create-draft`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        QUERY_TAGS.SCHOLARSHIP_APPLICATION,
        QUERY_TAGS.SCHOLARSHIP_ELIGIBILITY,
      ],
    }),
    saveApplicationStep: builder.mutation<any, { step: number; data: any }>({
      query: (body) => ({
        url: `${BASE_URL}/application/save-step`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [QUERY_TAGS.SCHOLARSHIP_APPLICATION],
    }),
    submitApplication: builder.mutation<any, void>({
      query: () => ({
        url: `${BASE_URL}/application/submit`,
        method: "POST",
      }),
      invalidatesTags: [
        QUERY_TAGS.SCHOLARSHIP_APPLICATION,
        QUERY_TAGS.SCHOLARSHIP_ELIGIBILITY,
      ],
    }),
  }),
});

export const {
  useGetEligibilityQuery,
  useGetApplicationQuery,
  useCreateDraftMutation,
  useSaveApplicationStepMutation,
  useSubmitApplicationMutation,
} = scholarshipApi;
