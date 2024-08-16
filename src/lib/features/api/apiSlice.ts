import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AssistantResponse, AssistantSend } from '@/lib/features/api/api';
import { pushMessage } from '@/lib/features/chat/chatSlice';
import { ChatMessage, ChatRole } from '@/lib/features/chat/message';
import { pushCodeVersion } from '@/lib/features/code/codeSlice';

let count = 0;

const fakeApiMessages: AssistantResponse[] = [
  {
    message: 'Hello! This is a fake API response. My name is donovan yes yes yes!',
    code:
      'const Component = () => {\n' +
      '    return <button>Hello World!</button>;\n' +
      '}\n' +
      '\n' +
      'render(<Component />);',
  },
  {
    message: 'Ooooh okay so you want to update your component? Here is an updated version :',
    code:
      'const Component = () => {\n' +
      "    return <button style={{ backgroundColor: 'red' }}>Hello World 2 V2!</button>;\n" +
      '}\n' +
      '\n' +
      'render(<Component />);',
  },
  {
    message: 'This is another updated version :',
    code:
      'const Component = () => {\n' +
      "    return <button style={{ backgroundColor: 'white' }}>Third World Country!!</button>;\n" +
      '}\n' +
      '\n' +
      'render(<Component />);',
  },
  {
    message: 'Last version before loop :',
    code:
      'const Component = () => {\n' +
      '    return (\n' +
      '      <div>\n' +
      "        <button style={{ backgroundColor: 'red' }}>LAAAAST DOUBLE</button>\n" +
      "        <button style={{ backgroundColor: 'white' }}>LAAAAST VERSION</button>\n" +
      '      </div>\n' +
      '    );\n' +
      '}\n' +
      '\n' +
      'render(<Component />);',
  },
];

export const api = createApi({
  reducerPath: 'assistantApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mistral-react-live.vercel.app/api/' }),
  endpoints: (builder) => ({
    send: builder.query<AssistantResponse, AssistantSend>({
      // query: (body) => ({ url: 'send', method: 'POST', body }),
      queryFn: async (args, { dispatch }) => {
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
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        const msg = fakeApiMessages[count % 4];
        count += 1;
        return {
          data: msg,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
