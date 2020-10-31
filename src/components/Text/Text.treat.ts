import { styleMap, style } from 'treat';

import capsize from 'capsize';

const fontMetrics = {
  capHeight: 540,
  ascent: 720,
  descent: -240,
  lineGap: 0,
  unitsPerEm: 780
};

const getStyles = (options: { fontSize: number, lineGap: number }) => capsize({
  fontMetrics,
  ...options
});

export const reset = style({
  margin: 0
});

export const variants = styleMap({
  small: {
    ...getStyles({ fontSize: 16, lineGap: 16 })
  },
  large: {
    ...getStyles({ fontSize: 38, lineGap: 16 })
  }
});
