'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
