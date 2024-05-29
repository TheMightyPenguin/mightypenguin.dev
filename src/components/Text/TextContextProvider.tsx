'use client';
import { ReactNode, createContext } from 'react';

export const TextContext = createContext<boolean>(false);

export function TextContextProvider({ children }: { children: ReactNode }) {
  return <TextContext.Provider value={true}>{children}</TextContext.Provider>;
}
