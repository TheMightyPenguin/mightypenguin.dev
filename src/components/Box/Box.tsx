import React from 'react';
import { useStyles } from 'react-treat';

import { Theme } from '../../theme/types';
import * as styleRefs from './Box.treat';

type Props = {
  as?: React.ElementType;
  paddingTop?: keyof Theme['spaces'];
};

const Box: React.FC<Props> = ({
  as: Component = 'div',
  paddingTop = 'none',
  ...rest
}: Props) => {
  const styles = useStyles(styleRefs);
  const computedPadding = styles.padding.top[paddingTop];

  return (
    <Component
      style={{ color: 'black' }}
      className={[computedPadding, styles.reset].join(' ')}
      {...rest}
    />
  );
};

export default Box;
