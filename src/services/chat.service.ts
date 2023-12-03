/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../interfaces/base';
import { dbUrl } from '../constants/dbUrl';

const chat = createApi({
   reducerPath: 'chat',
   baseQuery: fetchBaseQuery({
      baseUrl: dbUrl + '/api',
      credentials: 'include'
   }),
   tagTypes: ['chat'],
   endpoints: (builder) => ({
      getAllChat: builder.query<IResponse<any>, void>({
         query: () => ({
            url: '/chat',
            credentials: 'include'
         }),
         providesTags: ['chat']
      }),
      getOneChat: builder.query<IResponse<any>, string>({
        query: (item) => ({
           url: '/chat/'+item,
        }),
        providesTags: ['chat']
     }),
    sendMessage: builder.mutation<IResponse<any>, object>({
      query: (item) => ({
         url: '/chat',
         method: 'PATCH',
         body:item
      }),
      invalidatesTags:['chat']
   }),
   updateIsRead: builder.mutation<IResponse<any>, string>({
      query: (item) => ({
         url: '/chat/'+item,
         method: 'PATCH',
         body:item
      }),
      invalidatesTags:['chat']
   }),
   getOneChatUser: builder.query<IResponse<any>, string>({
      query: (item) => ({
         url: '/chat-user/'+item,
      }),
      providesTags: ['chat']
   }),
   })
});

export const { useGetAllChatQuery,useUpdateIsReadMutation,useGetOneChatUserQuery,useGetOneChatQuery,useSendMessageMutation} = chat;
export default chat;
