import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from 'react';

import Box, { Props as BoxProps } from '@/components/Box/Box';
import { HorizontalAlignment } from '@/theme/types';

type Props = PropsWithChildren<{
  space: React.ComponentProps<typeof Box>['paddingTop'];
  xAlign?: HorizontalAlignment;
}>;

const horizontalAlignmentToFlex: Record<
  HorizontalAlignment,
  BoxProps['alignItems']
> = {
  full: undefined,
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  spaced: undefined,
};

export const Stack: React.FC<Props> = ({ children, space, xAlign }) => {
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
