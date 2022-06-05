import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Products, Orders, Dashboard"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, type, typeChild, limit }) =>
        `/products?page=${page}${type ? `&type=${type}` : ""}${
          typeChild ? `&typeChild=${typeChild}` : ""
        }${limit ? `&limit=${limit}` : ""}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["Orders"],
    }),
    getDashboard: builder.query({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useGetDashboardQuery,
} = apiSlice;
