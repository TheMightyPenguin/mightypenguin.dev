import { style } from '@vanilla-extract/css';

const IMAGE_SIZE = 42;
const CONTAINER_PADDING = 2;

function toPx(value: number) {
  return `${value}px`;
}

export const gameIcon = style({
  width: toPx(IMAGE_SIZE),
  height: toPx(IMAGE_SIZE),
});

export const imageContainer = style({
  width: toPx(IMAGE_SIZE + CONTAINER_PADDING),
  height: toPx(IMAGE_SIZE + CONTAINER_PADDING),
  borderRadius: '',
});

export const gameIconContainer = style({});
