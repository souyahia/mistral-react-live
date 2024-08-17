import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AssistantResponse, AssistantSend } from '@/lib/features/api/api';
import { pushMessage } from '@/lib/features/chat/chatSlice';
import { ChatMessage, ChatRole } from '@/lib/features/chat/message';
import { pushCodeVersion } from '@/lib/features/code/codeSlice';

export const api = createApi({
  reducerPath: 'assistantApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mistral-react-live.vercel.app/api/' }),
  endpoints: (builder) => ({
    send: builder.query<AssistantResponse, AssistantSend>({
      query: (args) => ({
        url: 'send',
        method: 'POST',
        body: { message: args.message, code: args.code },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(
          pushMessage({
            text: args.message,
            timestamp: Date.now(),
            isError: false,
            role: ChatRole.USER,
            code:
              args.currentId !== null && args.code
                ? { id: args.currentId, code: args.code }
                : undefined,
            isEditedVersion: args.edited,
          }),
        );
        try {
          const { data } = await queryFulfilled;
          const message: ChatMessage = {
            role: ChatRole.ASSISTANT,
            text: data.message,
            timestamp: Date.now(),
            isError: false,
          };
          if (data.code) {
            message.code = { id: args.nextId, code: data.code };
            dispatch(pushCodeVersion(data.code));
          }
          dispatch(pushMessage(message));
        } catch (err) {
          dispatch(
            pushMessage({
              role: ChatRole.ASSISTANT,
              text: 'Oops! An unexpected error occured. Please try again.',
              timestamp: Date.now(),
              isError: true,
            }),
          );
        }
      },
    }),
  }),
});

export const { useLazySendQuery } = api;
