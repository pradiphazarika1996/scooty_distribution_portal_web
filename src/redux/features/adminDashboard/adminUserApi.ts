import { apiSlice } from "@/redux/api";
import { QUERY_TAGS } from "@/utils/status";

const BASE_URL = `/admin/users`;

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.USERS],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.USERS],
    }),
    getUser: builder.query<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: QUERY_TAGS.USERS, id }],
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: [QUERY_TAGS.USERS],
    }),
    deleteUser: builder.mutation<any, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.USERS],
    }),
  }),
  overrideExisting: false,
});

export const {
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
} = userApi;
