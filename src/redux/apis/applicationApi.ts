import type {
  MeritAwardApplication,
  SubmitApplicationPayload,
} from "@/types/students/application";
import { QUERY_TAGS } from "@/utils/status";
import { apiSlice } from "../api";

const BASE_URL = "/student";

export const meritAwardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplication: builder.query<{ application: MeritAwardApplication }, void>(
      {
        query: () => ({
          url: `${BASE_URL}`,
          method: "GET",
        }),
        providesTags: [QUERY_TAGS.APPLICATIONS],
      },
    ),
    submitApplication: builder.mutation<
      { message: string; application: MeritAwardApplication },
      SubmitApplicationPayload
    >({
      query: (body) => ({
        url: `${BASE_URL}/submit`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [QUERY_TAGS.APPLICATIONS],
    }),
  }),
});

export const { useGetApplicationQuery, useSubmitApplicationMutation } =
  meritAwardApi;
