import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://sazukhadem-bac-kend.vercel.app/api/v1",
  }),
  tagTypes: ["Portfolio", "Users", "Shop", "Customers"],
  endpoints: () => ({}),
});
