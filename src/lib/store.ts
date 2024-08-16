import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/lib/features/chat/chatSlice';
import codeReducer from '@/lib/features/code/codeSlice';
import { api } from '@/lib/features/api/apiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
      code: codeReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
