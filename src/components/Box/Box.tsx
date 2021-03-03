import React from 'react';
import { useStyles } from 'react-treat';

import { Theme } from '../../theme/types';
import * as styleRefs from './Box.treat';

type Props = {
  as?: React.ElementType;
  padding: Theme['space'];
};

const Box: React.FC<Props> = ({ as: Component = 'div' }: Props) => {
  const styles = useStyles(styleRefs);
  return <Component className={`${styles.reset}`} />;
};

export default Box;
