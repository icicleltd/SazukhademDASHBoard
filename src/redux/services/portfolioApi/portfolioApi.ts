import { baseApi } from "../../baseApi/baseApi";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewPortfolio: builder.mutation({
      query: (portfolioData) => ({
        url: "/portfolio/create",
        method: "POST",
        body: portfolioData,
      }),
      invalidatesTags: ["Portfolio"],
    }),
    getAllPortfolio: builder.query({
      query: () => ({
        url: "/portfolio/get-all-work",
        method: "GET",
      }),
      providesTags: ["Portfolio"],
    }),
    updateSinglePortfolio: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `/portfolio/update/${id}`,
        method: "PATCH",
        body: updatedData,
        // Important: Don't set Content-Type header manually for FormData
        // The browser will set it automatically with the correct boundary
      }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});

export const {
  useAddNewPortfolioMutation,
  useGetAllPortfolioQuery,
  useUpdateSinglePortfolioMutation,
} = portfolioApi;
