import { baseApi } from "../../baseApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
