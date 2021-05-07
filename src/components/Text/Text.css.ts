import { style, styleVariants } from '@vanilla-extract/css';
import capsize from 'capsize';

const fontMetrics = {
  majorMono: {
    capHeight: 696,
    ascent: 900,
    descent: -100,
    lineGap: 0,
    unitsPerEm: 1000,
  },
  slabo13px: {
    capHeight: 540,
    ascent: 720,
    descent: -240,
    lineGap: 0,
    unitsPerEm: 780,
  },
};

const getStyles = (options: { fontSize: number; lineGap: number }) =>
  capsize({
    fontMetrics: fontMetrics.majorMono,
    ...options,
  });

export const reset = style({
  margin: 0,
});

export const variants = styleVariants({
  small: {
    ...getStyles({ fontSize: 16, lineGap: 16 }),
  },
  large: {
    ...getStyles({ fontSize: 38, lineGap: 16 }),
  },
  title: {
    ...getStyles({ fontSize: 23, lineGap: 16 }),
    '@media': {
      'only screen and (min-width: 520px)': {
        ...getStyles({ fontSize: 38, lineGap: 16 }),
      },
    },
  },
});
