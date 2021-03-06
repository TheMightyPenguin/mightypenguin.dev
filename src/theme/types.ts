import theme from './theme';

type ValueOf<T> = T[keyof T];

export type Theme = typeof theme;

export type Spaces = ValueOf<Theme['spaces']>;

export type HorizontalAlignment = 'full' | 'left' | 'center' | 'right';
