import capsize from 'capsize';
import { style, styleMap } from 'treat';

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

export const variants = styleMap({
  small: {
    ...getStyles({ fontSize: 16, lineGap: 16 }),
  },
  large: {
    ...getStyles({ fontSize: 38, lineGap: 16 }),
  },
});
