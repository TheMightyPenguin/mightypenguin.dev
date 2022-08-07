import { PropsWithChildren } from 'react';

import { Box } from '@/components/Box/Box';

type Props = PropsWithChildren<unknown>;

export function Columns({ children }: Props) {
  return <Box>{children}</Box>;
}

export function Column() {
  return <Box></Box>;
}
