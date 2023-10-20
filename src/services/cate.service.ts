import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories } from '../interfaces/category';

const category = createApi({
   reducerPath: 'category',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      credentials: 'include'
   }),
   tagTypes: ['category'],
   endpoints: (builder) => ({
      getAllCate: builder.query<{ data: ICategories[] }, void>({
         query: () => ({
            url: '/categories',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['category']
      }),
      getOneCateById: builder.query({
         query: (id) => ({
            url: '/categories/' + id,
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['category']
      }),
      removeCategoryById: builder.mutation({
         query: (id) => ({
            url: '/categories/' + id,
            method: 'DELETE'
         }),
         invalidatesTags: ['category'],
      }),
      addCategory: builder.mutation({
         query: (item) => ({
            url: '/categories/',
            method: 'POST',
            body: item,
         }),
         invalidatesTags: ['category'],
      }),
      updateCategory: builder.mutation({
         query: ({ id, item }) => ({
            url: '/categories/' + id,
            method: 'PATCH',
            body: item,
         }),
         invalidatesTags: ['category'],
      })
   })
});

export const { useGetOneCateByIdQuery, useGetAllCateQuery, useAddCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryByIdMutation } = category;
export default category;
