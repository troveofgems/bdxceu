import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({
        url: `/products`,
      }),
    }),
    fetchProductsForAdmin: builder.query({
      query: () => ({
        url: `/admin/products`,
      }),
    }),
    fetchProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/admin/products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, updates }) => ({
        url: `/admin/products/${productId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/admin/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductsForAdminQuery,
  useFetchProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;

export default productApiSlice.reducer;
