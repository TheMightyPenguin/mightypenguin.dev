import { style } from '@vanilla-extract/css';

const IMAGE_SIZE = 42;
const CONTAINER_PADDING = 2;

function toPx(value: number) {
  return `${value}px`;
}

export const gameIcon = style({
  width: toPx(IMAGE_SIZE),
  height: toPx(IMAGE_SIZE),
  display: 'block',
});

export const imageContainer = style({
  width: toPx(IMAGE_SIZE + CONTAINER_PADDING),
  height: toPx(IMAGE_SIZE + CONTAINER_PADDING),
});

export const gameIconContainer = style({
  marginRight: '8px',
  borderRadius: '2px',
  overflow: 'hidden',
});

export const container = style({
  padding: '8px',
  borderRadius: '10px',
});
