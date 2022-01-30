import React, { createContext, useContext } from 'react';

import { Box, Props as BoxProps } from '@/components/Box/Box';

import * as styles from './Text.css';

type Props = {
  size?: keyof typeof styles.variants;
  color?: BoxProps['color'];
  fontFamily?: BoxProps['fontFamily'];
  letterSpacing?: BoxProps['letterSpacing'];
} & React.ComponentPropsWithRef<'p'>;

const InTextContext = createContext<boolean>(false);

export const Text: React.FC<Props> = (props) => {
  const {
    size = 'small',
    children,
    color = 'darkText',
    fontFamily = 'system',
    letterSpacing = 'normal',
    ...otherProps
  } = props;
  const isNestedText = useContext(InTextContext);

  return (
    <InTextContext.Provider value={true}>
      <Box
        // @ts-ignore
        as={isNestedText ? 'span' : 'p'}
        display={isNestedText ? 'inline' : undefined}
        {...otherProps}
        className={
          isNestedText
            ? styles.inherit
            : `${styles.variants[size]} ${styles.reset}`
        }
        letterSpacing={letterSpacing}
        fontFamily={fontFamily}
        color={color}
      >
        {children}
      </Box>
    </InTextContext.Provider>
  );
};

export default Text;
