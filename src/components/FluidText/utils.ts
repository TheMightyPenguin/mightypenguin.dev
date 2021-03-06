import capsize from 'capsize';

import { clamp } from '@/utils/math';

const vollkornFontMetrics = {
  capHeight: 676,
  ascent: 952,
  descent: -441,
  lineGap: 0,
  unitsPerEm: 1000,
};

export type GetFontStylesOptions = {
  screenWidth: number;
  minFontSize: number;
  maxFontSize: number;
  targetPercentage: number;
};

/**
 *
 * @param param0
 * @see  https://css-tricks.com/simplified-fluid-typography/
 */
export const getFontStyles = ({
  screenWidth,
  minFontSize,
  maxFontSize,
  targetPercentage,
}: GetFontStylesOptions) => {
  const fontSize = clamp(
    screenWidth * targetPercentage,
    minFontSize,
    maxFontSize,
  );

  const capsizeStyles = capsize({
    fontMetrics: vollkornFontMetrics,
    fontSize,
    lineGap: 16,
  });

  return {
    ...capsizeStyles,
  };
};
