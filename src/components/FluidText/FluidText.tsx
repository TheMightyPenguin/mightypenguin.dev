'use client';
import React, { PropsWithChildren } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';
import theme from '@/theme/theme';
import { Theme } from '@/theme/types';

import * as styles from './FluidText.css';
import { getFontStyles } from './utils';

type Props = {
  minSize: keyof Theme['fontSizes'];
  maxSize: keyof Theme['fontSizes'];
  targetPercentage: number;
  lineGap?: number;
};

const FluidText: React.FC<PropsWithChildren<Props>> = ({
  children,
  minSize,
  maxSize,
  lineGap = 16,
  targetPercentage,
}) => {
  const windowSize = useWindowSize();
  const fontStyles = getFontStyles({
    screenWidth: windowSize?.width || 0,
    minFontSize: theme.fontSizes[minSize],
    maxFontSize: theme.fontSizes[maxSize],
    targetPercentage,
    lineGap,
  });

  if (typeof windowSize === 'undefined') {
    return null;
  }

  return (
    <p className={styles.text} style={fontStyles}>
      <span style={fontStyles['::before']} />
      {children}
      <span style={fontStyles['::after']} />
    </p>
  );
};

export default FluidText;
