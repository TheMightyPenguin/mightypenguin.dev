import { createStyleObject } from '@capsizecss/core';
import majorMono from '@capsizecss/metrics/majorMonoDisplay';
import slabo13px from '@capsizecss/metrics/slabo13px';
import { style, styleVariants } from '@vanilla-extract/css';

const fontMetrics = {
  majorMono,
  slabo13px,
};

const getStyles = (options: { fontSize: number; lineGap: number }) =>
  createStyleObject({
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

export const inherit = style({
  fontFamily: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
});
