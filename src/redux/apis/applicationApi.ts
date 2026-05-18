import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";

const BASE_URL = "/student/application";

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
        url: `${BASE_URL}`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.SCHOLARSHIP_APPLICATION],
    }),
    createDraft: builder.mutation<any, { examId: number }>({
      query: (body) => ({
        url: `${BASE_URL}/create-draft`,
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
        url: `${BASE_URL}/save-step`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [QUERY_TAGS.SCHOLARSHIP_APPLICATION],
    }),
    submitApplication: builder.mutation<any, void>({
      query: () => ({
        url: `${BASE_URL}/submit`,
        method: "POST",
      }),
      invalidatesTags: [
        QUERY_TAGS.SCHOLARSHIP_APPLICATION,
        QUERY_TAGS.SCHOLARSHIP_ELIGIBILITY,
      ],
    }),
    getDocuments: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/documents`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.SCHOLARSHIP_DOCUMENTS],
    }),
    uploadDocument: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `${BASE_URL}/documents`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [QUERY_TAGS.SCHOLARSHIP_DOCUMENTS],
    }),
    deleteDocument: builder.mutation<any, { docType: number }>({
      query: ({ docType }) => ({
        url: `${BASE_URL}/documents/${docType}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.SCHOLARSHIP_DOCUMENTS],
    }),
  }),
});

export const {
  useGetEligibilityQuery,
  useGetApplicationQuery,
  useCreateDraftMutation,
  useSaveApplicationStepMutation,
  useSubmitApplicationMutation,
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} = scholarshipApi;
