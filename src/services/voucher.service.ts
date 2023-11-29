import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const vouchers = createApi({
   reducerPath: 'vouchers',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      credentials: 'include'
   }),
   tagTypes: ['vouchers'],
   endpoints: (builder) => ({
      checkVoucher: builder.mutation({
         query: (item) => ({
            url: '/vouchers/',
            method: 'PUT',
            body: item
         }),
      }),
     getVoucherUseful: builder.mutation({
        query: (item) => ({
           url: '/vouchers-user',
           method: 'POST',
           body: item
        }),
     }),
   })
});

export const {  useCheckVoucherMutation,useGetVoucherUsefulMutation } = vouchers;
export default vouchers;
