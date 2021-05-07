import React from 'react';

import * as styles from './Text.css';

type Props = {
  size?: keyof typeof styles.variants;
} & React.ComponentProps<'p'>;

const Text: React.FC<Props> = ({ size = 'small', children, ...otherProps }) => {
  return (
    <p {...otherProps} className={`${styles.variants[size]} ${styles.reset}`}>
      {children}
    </p>
  );
};

export default Text;
