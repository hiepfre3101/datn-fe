import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories } from '../interfaces/category';
import { IResponse } from '../interfaces/base';

const category = createApi({
   reducerPath: 'category',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      credentials: 'include'
   }),
   tagTypes: ['category'],
   endpoints: (builder) => ({
      getAllCate: builder.query<IResponse<ICategories[]>, void>({
         query: () => ({
            url: '/categories',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['category']
      }),
      getAllCateById: builder.query({
         query: (id) => ({
            url: '/categories/' + id,
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['category']
      })
   })
});

export const { useGetAllCateByIdQuery, useGetAllCateQuery } = category;
export default category;
