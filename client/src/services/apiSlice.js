import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Products, Orders, Dashboard"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (props) =>
        `/products?page=${props.page}${props.type ? `&type=${props.type}` : ""}${
          props.typeChild ? `&typeChild=${props.typeChild}` : ""
        }${props.limit ? `&limit=${props.limit}` : ""}`,
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
