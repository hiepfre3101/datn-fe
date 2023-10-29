import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IQueryParam, IResponseHasPaginate } from '../interfaces/base';
import { IShipmentFull, InputShipment } from '../interfaces/shipment';

const shipmentApi = createApi({
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
   tagTypes: ['shipment'],
   endpoints: (builder) => ({
      getAllShipmentExpand: builder.query<IResponseHasPaginate<IShipmentFull>, Partial<Omit<IQueryParam, 'expand'>>>({
         query: (params) => {
            return {
               url: '/shipments',
               params: params
            };
         },
         providesTags: ['shipment']
      }),
      addShipment: builder.mutation<IShipmentFull, InputShipment>({
         query: (body) => {
            return {
               url: '/shipments',
               method: 'post',
               body: body
            };
         },
         invalidatesTags: ['shipment']
      })
   })
});

export const { useGetAllShipmentExpandQuery, useAddShipmentMutation } = shipmentApi;
export default shipmentApi;
