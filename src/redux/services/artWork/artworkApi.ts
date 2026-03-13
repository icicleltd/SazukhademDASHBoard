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
      query: () => "/shop?limit=60",
      providesTags: ["Shop"],
    }),

    // 3️⃣ Get Customers
    getCustomers: builder.query({
      query: () => "/shop/customer",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useCreateArtworkMutation,
  useGetShopQuery,
  useGetCustomersQuery,
} = artworkApi;