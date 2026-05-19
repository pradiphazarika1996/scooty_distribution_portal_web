import type {
  StudentProfile,
  StudentProfileUpdate,
} from "@/types/students/profile";
import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";

const BASE_URL = "/student/profile";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<StudentProfile, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.STUDENT_PROFILE],
    }),

    updateProfile: builder.mutation<StudentProfile, StudentProfileUpdate>({
      query: (body) => ({
        url: BASE_URL,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [QUERY_TAGS.STUDENT_PROFILE],
    }),

    uploadAvatar: builder.mutation<{ avatar_url: string }, FormData>({
      query: (formData) => ({
        url: `${BASE_URL}/avatar`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [QUERY_TAGS.STUDENT_PROFILE],
    }),

    removeAvatar: builder.mutation<void, void>({
      query: () => ({
        url: `${BASE_URL}/avatar`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.STUDENT_PROFILE],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
} = studentApi;
