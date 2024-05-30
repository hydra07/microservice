'use client';
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store";
import setup from "@/services/SetupInterceptors";

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store;
  }

  useEffect(() => {
    if (storeRef.current) {
      setup(storeRef.current);
    }
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
}

/*
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/lib/store'
import setup from '@/services/SetupInterceptors'

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const storeRef = useRef(store)
  setup(storeRef.current)

  return <Provider store={storeRef.current}>{children}</Provider>
}
*/
