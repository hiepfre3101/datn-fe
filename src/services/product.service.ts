import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IQueryParam, IResponseHasPaginate } from '../interfaces/base';
import { IProduct, IProductExpanded, InputProduct } from '../interfaces/product';
// import { RootState } from '../store';
import { paramTransformer } from '../utils/transformParams';

const productApi = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api',
      credentials: 'include',
      prepareHeaders(headers) { //apiRedux
         // const { getState } = apiRedux;
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         // const { authApi } = getState() as RootState;
         // need accessToken
         return headers;
      }
   }),
   reducerPath: 'products',
   tagTypes: ['product'],
   endpoints: (builder) => ({
      getAllWithoutExpand: builder.query<IResponseHasPaginate<IProduct>, Partial<Omit<IQueryParam, 'expand'>>>({
         query: (params) => {
            return {
               url: '/products',
               params: params
            };
         }
      }),
      getAllExpand: builder.query<
         IResponseHasPaginate<IProductExpanded>,
         Partial<IQueryParam> & Pick<IQueryParam, 'expand'>
      >({
         query: (params) => {
            return {
               url: '/products',
               params: paramTransformer(params)
            };
         }
      }),
      addProduct: builder.mutation<IProduct, InputProduct>({
         query: (body) => {
            return {
               url: '/products',
               method: 'post',
               body: body
            };
         }
      })
   })
});

export const { useGetAllWithoutExpandQuery, useGetAllExpandQuery, useAddProductMutation } = productApi;

export default productApi;
