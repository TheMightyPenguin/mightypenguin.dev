import { keyframes, style } from '@vanilla-extract/css';

export const pathLength = 827;

const animation = keyframes({
  '0%': { strokeDashoffset: 0 },
  '50%': { strokeDashoffset: -pathLength },
  '100%': { strokeDashoffset: 0 },
});

export const path = style({
  strokeDashoffset: -pathLength,
  transition: 'stroke-dashoffset 200ms ease',
  animation: `${animation} 6s infinite`,
});
