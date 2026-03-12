import { baseApi } from "../../baseApi/baseApi";


export const artworkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Submit Artwork
    createArtwork: builder.mutation({
      query: (formData) => ({
        url: "/shop",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Portfolio"], // refresh artworks if needed
    }),

    // 2️⃣ Get Shop Data
    getShop: builder.query({
      query: () => "/shop",
      providesTags: ["Shop"],
    }),

    // 3️⃣ Get Customers
    getCustomers: builder.query({
      query: () => "/customers",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useCreateArtworkMutation,
  useGetShopQuery,
  useGetCustomersQuery,
} = artworkApi;