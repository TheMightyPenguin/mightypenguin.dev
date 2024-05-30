'use client';
import Stack from '@/components/Stack/Stack';
import { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <article>
      <Stack space="24px">{children}</Stack>
    </article>
  );
}
