import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ChatMessage, ChatRole } from '@/lib/features/chat/message';

export interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [
    {
      timestamp: Date.now(),
      isError: false,
      role: ChatRole.ASSISTANT,
      text: "Hello! I am your React assistant powered by Mistral. We can work together incrementally to create reusable React UI components. Let's start by describing what your UI component should look like!",
    },
  ],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

export const { pushMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
