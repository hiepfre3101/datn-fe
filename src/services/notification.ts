import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../interfaces/base';
import { INotification } from '../interfaces/notification';
const notification = createApi({
   reducerPath: 'notification',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      credentials: 'include'
   }),
   tagTypes: ['notification'],
   endpoints: (builder) => ({
      getClientNotification: builder.query<IResponse<INotification[]>, string | undefined>({
         query: (id) => ({
            url: '/notification-client/' + id
         }),
         providesTags: ['notification']
      }),
      getAdminNotification: builder.query({
         query: () => ({
            url: '/notification-admin'
         }),
         providesTags: ['notification']
      }),
      updateNotification: builder.mutation<unknown, { id: string; isRead: boolean }>({
         query: ({ id, ...body }) => ({
            url: '/notification/' + id,
            method: 'PATCH',
            body: body
         }),
         invalidatesTags: ['notification']
      }),
      deleteNotification: builder.mutation<unknown, string>({
         query: (id) => ({
            url: '/notification/' + id,
            method: 'DELETE'
         }),
         invalidatesTags: ['notification']
      })
   })
});

export const {
   useGetClientNotificationQuery,
   useGetAdminNotificationQuery,
   useUpdateNotificationMutation,
   useDeleteNotificationMutation
} = notification;
export default notification;
