import React from 'react'
import { useStyles } from 'react-treat'
import { style } from 'treat/lib/types';

import * as styleRefs from './Text.treat';

type Props = {
  size?: 'small' | 'large'
} & React.ComponentProps<'p'>

const Text: React.FC<Props> = ({size = 'small', children, ...otherProps}) => {
  const styles = useStyles(styleRefs);
  return <p {...otherProps} className={styles.variants[size]}>{children}</p>;
}

export default Text;