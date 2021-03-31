import React, { Children, cloneElement, isValidElement } from 'react';

import Box, { Props as BoxProps } from '@/components/Box/Box';
import { HorizontalAlignment, Theme } from '@/theme/types';

type Props = {
  space: keyof Theme['spaces'];
  xAlign?: HorizontalAlignment;
};

const horizontalAlignmentToFlex: Record<
  HorizontalAlignment,
  BoxProps['alignItems']
> = {
  full: undefined,
  left: 'flexStart',
  center: 'center',
  right: 'flexEnd',
};

const Stack: React.FC<Props> = ({ children, space, xAlign }) => {
  return (
    <Box
      alignItems={horizontalAlignmentToFlex[xAlign!]}
      display="flex"
      flexDirection="column"
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return null;
        }
        return (
          <Box paddingTop={index === 0 ? undefined : space}>
            {cloneElement(child, child.props, child.props.children)}
          </Box>
        );
      })}
    </Box>
  );
};

export default Stack;
