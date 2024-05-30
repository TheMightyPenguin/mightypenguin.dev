'use client';
import { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}
