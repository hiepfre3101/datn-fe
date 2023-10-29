import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IQueryParam, IResponseHasPaginate } from '../interfaces/base';
import { IShipmentFull } from '../interfaces/shipment';

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
      })
   })
});

export const { useGetAllShipmentExpandQuery } = shipmentApi;
export default shipmentApi;
