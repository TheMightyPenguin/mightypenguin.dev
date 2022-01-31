import { PropsWithChildren } from 'react';

import { Box } from '@/components/Box/Box';

import * as styles from './Columns.css';

type Props = PropsWithChildren<{}>;

export function Columns({ children }: Props) {
  return <Box>{children}</Box>;
}

export function Column() {
  return <Box></Box>;
}
