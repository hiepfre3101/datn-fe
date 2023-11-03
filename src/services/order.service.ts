import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IOrder } from '../interfaces/order';
const orderApi = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      prepareHeaders: (headers) => {
         headers.set('Access-Control-Allow-Origin', '*');
         headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE');
         headers.set('Access-Control-Allow-Headers', 'Content-Type');
         return headers;
      },
      credentials: 'include'
   }),
   
   reducerPath: 'orders',
   endpoints: (builder) => ({
 addOrder: builder.mutation<IOrder,object>({
         query: (body) => {

            return {
               url: '/orders',
               method: 'post',
               body: body
            };
         },
      }),
   })
});

export const {
useAddOrderMutation
} = orderApi;

export default orderApi;
