// src/services/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface UpdateProductDto {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

interface PaginationParams {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], PaginationParams>({
      query: ({ offset = 0, limit = 10, title, categoryId }) => {
        let url = `/products?offset=${offset}&limit=${limit}`;
        if (title) url += `&title=${encodeURIComponent(title)}`;
        if (categoryId) url += `&categoryId=${categoryId}`;
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/slug/${slug}`,
    }),

    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),

    createProduct: builder.mutation<Product, CreateProductDto>({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<Product, { id: number; data: UpdateProductDto }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),

    deleteProduct: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;