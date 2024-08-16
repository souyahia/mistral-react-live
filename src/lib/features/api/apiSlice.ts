import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AssistantResponse, AssistantSend } from '@/lib/features/api/api';
import { pushMessage } from '@/lib/features/chat/chatSlice';
import { ChatRole } from '@/lib/features/chat/message';

let count = 2;

export const api = createApi({
  reducerPath: 'assistantApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mistral-react-live.vercel.app/api/' }),
  endpoints: (builder) => ({
    send: builder.query<AssistantResponse, AssistantSend>({
      // query: (body) => ({ url: 'send', method: 'POST', body }),
      queryFn: async (body, { dispatch }) => {
        count += 1;
        dispatch(
          pushMessage({
            text: body.message,
            timestamp: Date.now(),
            isError: false,
            role: ChatRole.USER,
          }),
        );
        if (count % 3 === 2) {
          throw new Error('This is a fake error thrown every 3 messages.');
        }
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        return {
          data: {
            timestamp: Date.now(),
            message: 'This is a fake response from the assistant.',
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            pushMessage({
              role: ChatRole.ASSISTANT,
              text: data.message,
              timestamp: Date.now(),
              isError: false,
            }),
          );
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
