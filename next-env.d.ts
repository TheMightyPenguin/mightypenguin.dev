/// <reference types="next" />
/// <reference types="next/types/global" />

import { Theme as CustomTheme } from './src/theme/types';

declare module 'treat/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
