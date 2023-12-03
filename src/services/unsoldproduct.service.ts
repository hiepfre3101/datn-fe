import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../interfaces/base';
import { IunsoldProduct } from '../interfaces/unsoldproduct';
import { dbUrl } from '../constants/dbUrl';

const unsoldproduct = createApi({
   reducerPath: 'unsoldproduct',
   baseQuery: fetchBaseQuery({
      baseUrl: dbUrl + '/api',
      credentials: 'include'
   }),
   tagTypes: ['unsoldproduct'],
   endpoints: (builder) => ({
      getAllunsoldproduct: builder.query<IResponse<IunsoldProduct[]>, void>({
         query: () => ({
            url: '/unsoldProducts',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['unsoldproduct']
      }),
      getOneunsoldproductById: builder.query<IResponse<IunsoldProduct>,string>({
         query: (id) => ({
            url: '/unsoldProducts/' + id,
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['unsoldproduct']
      }),
    //   removeOriginById: builder.mutation({
    //      query: (id) => ({
    //         url: '/unsoldproduct/' + id,
    //         method: 'DELETE'
    //      }),
    //      invalidatesTags: ['unsoldproduct'],
    //   }),
    //   addOrigin: builder.mutation({
    //      query: (item) => ({
    //         url: '/unsoldproduct/',
    //         method: 'POST',
    //         body: item,
    //      }),
    //      invalidatesTags: ['unsoldproduct'],
    //   }),
    //   updateOrigin: builder.mutation<IResponse<IunsoldProduct>,{id:string}>({
    //      query: ({ id, ...body }) => ({
    //         url: '/unsoldproduct/' + id,
    //         method: 'PATCH',
    //         body: body,
    //      }),
    //      invalidatesTags: ['unsoldproduct'],
    //   })
   })
});

export const { useGetAllunsoldproductQuery, useGetOneunsoldproductByIdQuery } = unsoldproduct;
export default unsoldproduct;
