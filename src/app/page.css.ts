import { style } from '@vanilla-extract/css';

export const backgroundCanvas = style({
  position: 'fixed',
  inset: 0,
  filter: 'blur(10px)',
});

export const mainContent = style({
  position: 'relative',
  padding: '32px',
});
