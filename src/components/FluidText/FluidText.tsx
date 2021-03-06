import React from 'react';
import { useStyles } from 'react-treat';

import { useWindowSize } from '@/hooks/useWindowSize';
import theme from '@/theme/theme';
import { Theme } from '@/theme/types';

import * as styleRefs from './FluidText.treat';
import { getFontStyles } from './utils';

type Props = {
  minSize: keyof Theme['fontSizes'];
  maxSize: keyof Theme['fontSizes'];
  targetPercentage: number;
  lineGap?: number;
};

const FluidText: React.FC<Props> = ({
  children,
  minSize,
  maxSize,
  lineGap = 16,
  targetPercentage,
}) => {
  const styles = useStyles(styleRefs);
  const windowSize = useWindowSize();
  const fontStyles = getFontStyles({
    screenWidth: windowSize?.width || 0,
    minFontSize: theme.fontSizes[minSize],
    maxFontSize: theme.fontSizes[maxSize],
    targetPercentage,
    lineGap,
  });

  return (
    <p className={styles.text} style={fontStyles}>
      <div style={fontStyles['::before']} />
      {children}
      <div style={fontStyles['::after']} />
    </p>
  );
};

export default FluidText;
